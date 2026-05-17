using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Application.DTOs;
using Tashkil.Domain.Entities;

namespace Tashkil.Application.Interfaces
{
    public interface ICodeGeneratorService
    {
        Task <string> GenerateEntityAsync(string TableName, List<ColumnsDto> columns);
        string GenerateRepositoryInterfaceAsync(string tablename);
    }
}
