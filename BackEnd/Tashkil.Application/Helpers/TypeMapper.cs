using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tashkil.Application.Helpers
{
    public static class TypeMapper
    {
        private static readonly Dictionary<string, string> _typeMap = new()
    {
        // Integer types
        { "int",            "int"     },
        { "bigint",         "long"    },
        { "smallint",       "short"   },
        { "tinyint",        "byte"    },

        // Decimal types
        { "decimal",        "decimal" },
        { "numeric",        "decimal" },
        { "money",          "decimal" },
        { "smallmoney",     "decimal" },
        { "float",          "double"  },
        { "real",           "float"   },

        // String types
        { "char",           "string"  },
        { "nchar",          "string"  },
        { "varchar",        "string"  },
        { "nvarchar",       "string"  },
        { "text",           "string"  },
        { "ntext",          "string"  },

        // Date types
        { "date",           "DateOnly"   },
        { "time",           "TimeOnly"   },
        { "datetime",       "DateTime"   },
        { "datetime2",      "DateTime"   },
        { "smalldatetime",  "DateTime"   },
        { "datetimeoffset", "DateTimeOffset" },

        // Boolean
        { "bit",            "bool"    },

        // Binary
        { "binary",         "byte[]"  },
        { "varbinary",      "byte[]"  },
        { "image",          "byte[]"  },

        // Other
        { "uniqueidentifier", "Guid"  },
        { "xml",            "string"  },
        { "sql_variant",    "object"  },
    };

        public static string ToCSharpType(string sqlType, bool isNullable)
        {
            var sqlTypeLower = sqlType.ToLower();

            if (!_typeMap.TryGetValue(sqlTypeLower, out var csharpType))
                csharpType = "object";

        
            if (isNullable && csharpType != "byte[]")
                return $"{csharpType}?";

            return csharpType;
        }
    }
}
