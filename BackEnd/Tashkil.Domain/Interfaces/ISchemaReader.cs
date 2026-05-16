using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Domain.Entities;

namespace Tashkil.Domain.Interfaces
{
    public interface ISchemaReader
    {
        Task<List<Databases>> GetDatabasesAsync();
        Task<List<Tables>> GetTablesAsync(string databaseName);
    }
}
