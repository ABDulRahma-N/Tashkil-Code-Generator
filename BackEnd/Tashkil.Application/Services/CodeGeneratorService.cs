using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Application.Interfaces;
using Tashkil.Domain.Entities;

namespace Tashkil.Application.Services
{
    public class CodeGeneratorService : ICodeGeneratorService
    {
        public Task<string> GenerateEntityAsync(string TableName, List<Columns> columns)
        {
            throw new NotImplementedException();
        }
    }
}
