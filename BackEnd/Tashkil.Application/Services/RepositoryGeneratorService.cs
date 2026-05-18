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
        public string CreateMethodSignature(string tablename,bool isAsync,bool isAwait)
        {
            string AsyncSuffix = isAsync ? "Async" : "";
            string AwaitPrefix = isAwait ? "async " : "";

            string Method = $"{AwaitPrefix}Task<int> Create{AsyncSuffix}({tablename} {tablename.ToLower()})";
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
    {CreateMethodSignature(Tablename, true, false)};
    Task<bool> UpdateAsync({Tablename} {Tablename.ToLower()});
    Task<bool> DeleteAsync(int Id);
}}";
            return body;
        }
        public string GenerateRepositoryImplementation(string tablename, List<ColumnsDto> columns)
        {
           return CreateFunaction(tablename, columns);
        }

        public string CreateFunaction(string tablename,List<ColumnsDto> columns)
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

            string MethodSignature = $@"public {CreateMethodSignature(tablename, true, true)} 
{{
        {connection}
        {QuerySection}
        {ParametersSection}
        {QueryExecution}
        {ReturnSection}
}}";
            return MethodSignature;




        }


    }
}
