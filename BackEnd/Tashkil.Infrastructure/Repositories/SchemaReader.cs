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
    COLUMN_NAME AS [columnName], 
    DATA_TYPE AS [dataType], 
    CASE WHEN IS_NULLABLE = 'YES' THEN 1 ELSE 0 END AS [isNullable] 
FROM {safeDatabaseName}.INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = @tableName";

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
