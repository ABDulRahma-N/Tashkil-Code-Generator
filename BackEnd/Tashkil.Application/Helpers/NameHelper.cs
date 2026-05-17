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
            return string.Concat(
                columnName.Split('_')
                          .Select(w => char.ToUpper(w[0]) + w.Substring(1).ToLower())
            );
        }
    }
}
