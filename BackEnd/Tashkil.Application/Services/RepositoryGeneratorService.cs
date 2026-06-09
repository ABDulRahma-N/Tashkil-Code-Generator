using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Application.DTOs;
using Tashkil.Application.Helpers;
using Tashkil.Application.Interfaces;
using Tashkil.Domain.Entities;

namespace Tashkil.Application.Services
{
    public class RepositoryGeneratorService : IRepositoryGeneratorService
    {
        public string MethodSignature(string MethodName, bool isAsync, bool isAwait)
        {
            string AsyncSuffix = isAsync ? "Async" : "";
            string AwaitPrefix = isAwait ? "async " : "";

            string Method = $"{AwaitPrefix}Task<int> {MethodName}{AsyncSuffix}";
            return Method;
        }
        public string GenerateRepositoryInterface(string tablename)
        {
            string Tablename = NameHelper.Singularize(tablename);
            string body =
@$"public interface I{Tablename}Repository
{{ 
    Task<{Tablename}> GetByIdAsync(int Id);
    Task<List<{Tablename}>> GetAllAsync();
    {MethodSignature("Create", true, false)}({Tablename} {Tablename.ToLower()});
    Task<bool> UpdateAsync({Tablename} {Tablename.ToLower()});
    Task<bool> DeleteAsync(int Id);
}}";


            return body;
        }
        public string GenerateRepositoryImplementation(string tablename, List<ColumnsDto> columns)
        {
            string Tablename = NameHelper.ToPascalCase(tablename);
            string CreateMethod = CreateFunaction(tablename, columns);
            string GetByIdMethod = GetByIdFunction(tablename, columns);
            string GetAllMethod = GetAllFunction(tablename, columns);
            string DeleteMethod = DeleteFunction(tablename, columns);

            string body =
@$"public class {Tablename}Repository : I{Tablename}Repository
{{ 
    private readonly string _connectionString;
    public {Tablename}Repository(string connectionString)
    {{
        _connectionString = connectionString;
    }}

    {CreateMethod}

    {GetByIdMethod}

    {GetAllMethod}

    {DeleteMethod}
}}";
            return body;

        }

        public string CreateFunaction(string tablename, List<ColumnsDto> columns)
        {
            string connection = "using var connection = new SqlConnection(_connectionString);";

            string QueryBuilder = $"INSERT INTO {tablename} (";
            foreach (var column in columns)
            {
                QueryBuilder += $"\n      {column.ColumnName},";
            }
            QueryBuilder = QueryBuilder.TrimEnd(',') + ") OUTPUT INSERTED.ID VALUES (";
            foreach (var column in columns)
            {
                QueryBuilder += $"@{column.ColumnName},";
            }
            QueryBuilder = QueryBuilder.TrimEnd(',') + ")";

            string QuerySection = $"string query = @\"{QueryBuilder}\";";
            Console.WriteLine("QuerySection");
            Console.WriteLine(QuerySection);

            string ParametersSection = "var parameters = new {";
            foreach (var column in columns)
            {
                ParametersSection += $"\n     {column.ColumnName} = {tablename.ToLower()}.{column.ColumnName},";
            }
            ParametersSection = ParametersSection.TrimEnd(',') + "};";
            Console.WriteLine("ParametersSection");
            Console.WriteLine(ParametersSection);


            string QueryExecution = $"var newId = await connection.ExecuteScalarAsync<int>(query, parameters);";
            Console.WriteLine("QueryExecution");
            string ReturnSection = "return newId;";

            string CreateMethodSignature = $@"public {MethodSignature("Create", true, true)}({tablename} {tablename.ToLower()}) 
    {{
            {connection}
            {QuerySection}
            {ParametersSection}
            {QueryExecution}
            {ReturnSection}
    }}";
            return CreateMethodSignature;

        }
        public string GetByIdFunction(string tablename, List<ColumnsDto> columns)
        {
            string connection = "using var connection = new SqlConnection(_connectionString);";
            string PrimaryKeyColumn = columns.FirstOrDefault(x => x.IsPrimaryKey == true)?.ColumnName ?? "Id";

            string QueryBuilder = $"Select ";
            foreach (var column in columns)
            {
                QueryBuilder += $"{column.ColumnName},";
            }
            QueryBuilder = QueryBuilder.TrimEnd(',') + " FROM " + tablename + $" WHERE {PrimaryKeyColumn} = @Id";
            string QuerySection = $"string query = @\"{QueryBuilder}\";";

            Console.WriteLine("QuerySection from get function");
            Console.WriteLine(QuerySection);


            string ParametersSection = $@"var parameters = new {{ {PrimaryKeyColumn} = Id }};";
            Console.WriteLine("ParametersSection from get function");
            Console.WriteLine(ParametersSection);

            string QueryExecutionAndReturn = $"return await connection.QueryFirstOrDefaultAsync<{NameHelper.Singularize(tablename)}>(query, parameters);";
            Console.WriteLine("QueryExecutionAndReturn from get function");
            Console.WriteLine(QueryExecutionAndReturn);

            string GetByIdMethodSignature = $@"public {MethodSignature("GetById", true, true)}(int Id)
    {{
            {connection}
            {QuerySection}
            {ParametersSection}
            {QueryExecutionAndReturn}
    }}";

            return GetByIdMethodSignature;
        }
        public string GetAllFunction(string tablename, List<ColumnsDto> columns)
        {
            string connection = "using var connection = new SqlConnection(_connectionString);";
            string QueryBuilder = $"Select ";
            foreach (var column in columns)
            {
                QueryBuilder += $"{column.ColumnName},";
            }
            QueryBuilder = QueryBuilder.TrimEnd(',') + " FROM " + tablename;
            string QuerySection = $"string query = @\"{QueryBuilder}\";";
            Console.WriteLine("QuerySection from get all function");
            Console.WriteLine(QuerySection);

            string QueryExecutionAndReturn = $"return await connection.QueryAsync<{NameHelper.Singularize(tablename)}>(query)).ToList();";

            Console.WriteLine("QueryExecutionAndReturn from get all function");
            Console.WriteLine(QueryExecutionAndReturn);

            string GetAllMethodSignature = $@"public {MethodSignature("GetAll", true, true)}()
    {{
            {connection}
            {QuerySection}
            {QueryExecutionAndReturn}
    }}";


            return GetAllMethodSignature;
        }
        public string DeleteFunction(string tablename, List<ColumnsDto> columns)
        {
            string connection = "using var connection = new SqlConnection(_connectionString);";
            string PrimaryKeyColumn = columns.FirstOrDefault(x => x.IsPrimaryKey == true)?.ColumnName ?? "Id";

            string QueryBuilder = $"DELETE FROM {tablename} WHERE {PrimaryKeyColumn} = @Id";
            string QuerySection = $"string query = @\"{QueryBuilder}\";";

            Console.WriteLine("QuerySection from delete function");
            Console.WriteLine(QuerySection);

            string ParametersSection = $@"var parameters = new {{ {PrimaryKeyColumn} = Id }};";
            Console.WriteLine("ParametersSection from delete function");

            Console.WriteLine(ParametersSection);

            string QueryExecution = $"var affectedRows = await connection.ExecuteAsync(query, parameters);";
            Console.WriteLine("QueryExecution from delete function");
            Console.WriteLine(QueryExecution);

            string ReturnSection = "return affectedRows > 0;";
            string DeleteMethodSignature = $@"public {MethodSignature("Delete", true, true)}(int Id)
    {{
             {connection}
            {QuerySection}
            {ParametersSection}
            {QueryExecution}
            {ReturnSection}
    }}";
            return DeleteMethodSignature;
        }
    }
}
