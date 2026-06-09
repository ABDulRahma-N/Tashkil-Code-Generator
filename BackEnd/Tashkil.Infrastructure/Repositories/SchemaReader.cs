using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Domain.Entities;
using Tashkil.Domain.Interfaces;

namespace Tashkil.Infrastructure.Repositories
{
  
    public class SchemaReader : ISchemaReader
    {
        private readonly string _connectionString;
        public SchemaReader(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Columns>> GetColumnsAsync(string databaseName, string tableName)
        {
            using IDbConnection connection = new SqlConnection(_connectionString);

            var databases = await GetDatabasesAsync();
            if (!databases.Any(d => d.DatabaseName == databaseName))
                throw new Exception("Invalid database name");

            var safeDatabaseName = $"[{databaseName.Replace("]", "")}]";

            string query = $@"SELECT 
    c.name AS [columnName],
    t.name AS [SqlDataType],
    c.is_nullable AS [isNullable],
    CASE WHEN pk.column_id IS NOT NULL THEN 1 ELSE 0 END AS [isPrimaryKey],
    CASE WHEN fk.parent_column_id IS NOT NULL THEN 1 ELSE 0 END AS [isForeignKey]

FROM  {safeDatabaseName}.sys.columns c
JOIN  {safeDatabaseName}.sys.types t ON c.user_type_id = t.user_type_id
JOIN  {safeDatabaseName}.sys.tables tb ON c.object_id = tb.object_id
LEFT JOIN (
    SELECT ic.column_id, ic.object_id
    FROM  {safeDatabaseName}.sys.index_columns ic
    JOIN  {safeDatabaseName}.sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
    WHERE i.is_primary_key = 1
) pk ON c.object_id = pk.object_id AND c.column_id = pk.column_id
LEFT JOIN {safeDatabaseName}.sys.foreign_key_columns fk 
    ON c.object_id = fk.parent_object_id AND c.column_id = fk.parent_column_id

WHERE tb.name = @tableName
";

            var result = await connection.QueryAsync<Columns>(query, new { tableName });
            return result.ToList();
        }

        public async Task<List<Databases>> GetDatabasesAsync()
        {
           using IDbConnection connection = new SqlConnection(_connectionString);
            string query = @"SELECT name AS [databaseName] FROM sys.databases WHERE database_id > 4";
            var result = await connection.QueryAsync<Databases>(query);
            return result.ToList();
        }

        public async Task<List<Tables>> GetTablesAsync(string databaseName)
        {
            using IDbConnection connection = new SqlConnection(_connectionString);
            string query = $@"SELECT TABLE_NAME AS [tableName] FROM {databaseName}.INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";
            var result = await connection.QueryAsync<Tables>(query);
            return result.ToList();
        }

    }
}
