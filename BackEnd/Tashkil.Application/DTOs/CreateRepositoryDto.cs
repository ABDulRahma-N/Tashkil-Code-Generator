using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tashkil.Application.DTOs
{
    public class CreateRepositoryDto
    {
        public string TableName { get; set; }
        public List<ColumnsDto> Columns { get; set; }
    }
}
