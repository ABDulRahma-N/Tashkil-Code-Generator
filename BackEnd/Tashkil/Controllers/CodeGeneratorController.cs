using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tashkil.Application.DTOs;
using Tashkil.Application.Interfaces;

namespace Tashkil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodeGeneratorController : ControllerBase
    {
        private readonly ICodeGeneratorService _codeGeneratorService;

        public CodeGeneratorController(ICodeGeneratorService codeGeneratorService)
        {
            _codeGeneratorService = codeGeneratorService;
        }
        [HttpGet]
        [Route("GenerateEntity")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GenerateEntity(string TableName, List<ColumnsDto> columns)
        {
            if (string.IsNullOrEmpty(TableName) || columns == null || !columns.Any())
            {
                return BadRequest("TableName and columns are required.");
            }
            try
            {
                var result = await _codeGeneratorService.GenerateEntityAsync(TableName, columns);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while generating the entity.");
            }
        }
    }
}
