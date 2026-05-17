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
    public class CodeGeneratorService : ICodeGeneratorService
    {
        private readonly IEntityGeneratorService _entityGeneratorService;
        public CodeGeneratorService(IEntityGeneratorService entityGeneratorService)
        {
            _entityGeneratorService = entityGeneratorService;
        }
        public string GenerateEntityAsync(string TableName, List<ColumnsDto> columns)
        {
            return _entityGeneratorService.GenerateEntityAsync(TableName, columns);
        }

        public string GenerateRepositoryInterfaceAsync(string tablename)
        {
            string Tablename = NameHelper.Singularize(tablename);
            string body = 
                @$"public interface I{Tablename}Repository
                {{ 
                    Task<{Tablename}> GetByIdAsync(int Id);
                    Task<List<{Tablename}>> GetAllAsync();
                    Task<int> CreateAsync({Tablename} {Tablename.ToLower()});
                    Task<bool> UpdateAsync({Tablename} {Tablename.ToLower()});
                    Task<bool> DeleteAsync(int Id);
                }}";
            return body;

        }
    }
}
