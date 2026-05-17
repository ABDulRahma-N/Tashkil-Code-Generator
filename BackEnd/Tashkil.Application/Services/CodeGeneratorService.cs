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
        public Task<string> GenerateEntityAsync(string TableName, List<ColumnsDto> columns)
        {
            string Tablename = NameHelper.Singularize(TableName);
            string EntityBody = 
$@"public class {Tablename}
{{
// Properties will be inserted here 
}}";
            string EntityRowTemplate = @"   public {PropertyType} {PropertyName} { get; set; }";
            StringBuilder propertiesBuilder = new StringBuilder();
            foreach (var column in columns)
            {
                string propertyType = TypeMapper.ToCSharpType(column.DataType, column.IsNullable);
                string propertyName = NameHelper.ToPascalCase(column.ColumnName);
                string isNullableSuffix = column.IsNullable && !propertyType.EndsWith("?") ? "?" : "";
                string propertyRow = EntityRowTemplate.Replace("{PropertyType}", propertyType)
                                                        .Replace("{PropertyName}", propertyName);
                propertiesBuilder.AppendLine(propertyRow);
            }
            string finalEntity = EntityBody.Replace("// Properties will be inserted here", propertiesBuilder.ToString());
            return Task.FromResult(finalEntity);
        }
    }
}
