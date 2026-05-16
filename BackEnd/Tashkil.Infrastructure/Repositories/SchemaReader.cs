using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Domain.Entities;
using Tashkil.Domain.Interfaces;

namespace Tashkil.Infrastructure.Repositories
{
  
    public class SchemaReader : ISchemaReader
    {
        private readonly string _connectionString;
        public SchemaReader(string connectionString)
        {
            _connectionString = connectionString;
        }
        public Task<List<Databases>> GetDatabasesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<Tables>> GetTablesAsync(string databaseName)
        {
            throw new NotImplementedException();
        }
    }
}
