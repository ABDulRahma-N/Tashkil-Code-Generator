using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Application.DTOs;
using Tashkil.Application.Helpers;
using Tashkil.Application.Interfaces;

namespace Tashkil.Application.Services
{
    public class RepositoryGeneratorService : IRepositoryGeneratorService
    {
        public string GenerateRepositoryImplementation(string tablename, List<ColumnsDto> columns)
        {
            throw new NotImplementedException();
        }

        public string GenerateRepositoryInterface(string tablename)
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
