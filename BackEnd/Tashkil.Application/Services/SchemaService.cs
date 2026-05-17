using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Application.Interfaces;
using Tashkil.Domain.Interfaces;

namespace Tashkil.Application.Services
{
    public class SchemaService:ISchemaService
    {
        private readonly ISchemaReader _schemaReader;
        public SchemaService(ISchemaReader schemaReader)
        {
            _schemaReader = schemaReader;
        }
        public Task<List<Domain.Entities.Databases>> GetDatabasesAsync()
        {
            return _schemaReader.GetDatabasesAsync();
        }
        public Task<List<Domain.Entities.Tables>> GetTablesAsync(string databaseName)
        {
            return _schemaReader.GetTablesAsync(databaseName);
        }
        public Task<List<Domain.Entities.Columns>> GetColumnsAsync(string databaseName, string tableName)
        {
            return _schemaReader.GetColumnsAsync(databaseName, tableName);
        }
    }
}
