using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Application.DTOs;

namespace Tashkil.Application.Interfaces
{
    public interface IRepositoryGeneratorService
    {
        string GenerateRepositoryInterface(string tablename);
        string GenerateRepositoryImplementation(string tablename, List<ColumnsDto> columns);
    }
}
