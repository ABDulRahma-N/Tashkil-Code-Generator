using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tashkil.Domain.Entities;

namespace Tashkil.Application.Interfaces
{
    public interface ISchemaService
    {
            Task<List<Databases>> GetDatabasesAsync();
            Task<List<Tables>> GetTablesAsync(string databaseName);
            Task<List<Columns>> GetColumnsAsync(string databaseName, string tableName);
    }
}
