using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tashkil.Application.Interfaces;

namespace Tashkil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchemaController : ControllerBase
    {
        private readonly ISchemaService schemaService;
        public SchemaController(ISchemaService schemaService)
        {
            this.schemaService = schemaService;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetDatabases()
        {
            try
            {
                var databases = await schemaService.GetDatabasesAsync();
                return Ok(databases);
            }
            catch (Exception)
            {
                    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
            
        }
        [HttpGet("{databaseName}/tables")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetTables(string databaseName)
        {
            if (string.IsNullOrWhiteSpace(databaseName))
                return BadRequest("Database name is required.");

            try
            {
                var tables = await schemaService.GetTablesAsync(databaseName);
                return Ok(tables);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }

        }
    }
}
