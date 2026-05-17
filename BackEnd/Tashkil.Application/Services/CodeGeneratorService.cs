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
        private readonly IRepositoryGeneratorService _repositoryGeneratorService;
        public CodeGeneratorService(IEntityGeneratorService entityGeneratorService, IRepositoryGeneratorService repositoryGeneratorService)
        {
            _entityGeneratorService = entityGeneratorService;
            _repositoryGeneratorService = repositoryGeneratorService;
        }
        public string GenerateEntityAsync(string TableName, List<ColumnsDto> columns)
        {
            return _entityGeneratorService.GenerateEntityAsync(TableName, columns);
        }

        public string GenerateRepositoryImplementation(string tablename, List<ColumnsDto> columns)
        {
           return _repositoryGeneratorService.GenerateRepositoryImplementation(tablename, columns);
        }

        public string GenerateRepositoryInterface(string tablename)
        {
           return _repositoryGeneratorService.GenerateRepositoryInterface(tablename);
        }
    }
}
