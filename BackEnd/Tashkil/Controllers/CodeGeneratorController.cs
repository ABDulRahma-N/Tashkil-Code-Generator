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
        [HttpPost("GenerateEntity")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GenerateEntity([FromBody] CreateEntityDto createEntity)
        {
            if (string.IsNullOrEmpty(createEntity.TableName) || createEntity.Columns == null || !createEntity.Columns.Any())
            {
                return BadRequest("TableName and columns are required.");
            }
            try
            {
                var result = _codeGeneratorService.GenerateEntityAsync(createEntity.TableName, createEntity.Columns);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while generating the entity.");
            }
        }
        [HttpPost("GenerateRepositoryInterface/{TableName}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GenerateRepositoryInterface(string TableName)
        {
            if (string.IsNullOrEmpty(TableName))
                return BadRequest("TableName are required.");

            try
            {
                var result = _codeGeneratorService.GenerateRepositoryInterface(TableName);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while generating the entity.");
            }
        }
        [HttpPost("GenerateRepositoryImplementation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GenerateRepositoryImplementation([FromBody] CreateRepositoryDto createRepository)
        {
            if (string.IsNullOrEmpty(createRepository.TableName) || createRepository.Columns == null || !createRepository.Columns.Any())
            {
                return BadRequest("TableName and columns are required.");
            }
            try
            {
                var result = _codeGeneratorService.GenerateRepositoryImplementation(createRepository.TableName, createRepository.Columns);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while generating the entity.");
            }



        }
    }
}
