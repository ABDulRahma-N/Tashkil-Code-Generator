using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tashkil.Application.DTOs
{
    public class ColumnsDto
    {
        public string ColumnName { get; set; }
        public string SqlDataType { get; set; }
        public bool IsNullable { get; set; }
        public bool IsPrimaryKey { get; set; }
        public bool IsForeignKey { get; set; }
    }
}
