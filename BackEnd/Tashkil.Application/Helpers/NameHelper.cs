using Humanizer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tashkil.Application.Helpers
{

    public static class NameHelper
    {
        public static string Singularize(string tableName)
        {
            return tableName.Singularize();
        }
        public static string ToPascalCase(string columnName)
        {
            var withUnderscores = string.Concat(
                columnName.Select((c, i) => i > 0 && char.IsUpper(c) ? "_" + c : c.ToString())
            );

            return string.Concat(
                withUnderscores.Split('_')
                               .Where(w => !string.IsNullOrEmpty(w))
                               .Select(w => char.ToUpper(w[0]) + w.Substring(1).ToLower())
            );
        }
    }
}
