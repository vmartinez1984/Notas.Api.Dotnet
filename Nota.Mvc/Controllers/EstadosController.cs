using Microsoft.AspNetCore.Mvc;
using Nota.Bl.Persistence;

namespace Nota.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadosController : ControllerBase
    {
        private readonly EstadoRepositorio _repositorio;

        public EstadosController(EstadoRepositorio repositorio)
        {
            _repositorio = repositorio;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerTodos()
        {
            List<string> lista;

            lista = (await _repositorio.ObtenerTodosAsync()).Select(x=>x.Nombre).ToList();

            return Ok(lista);
        }
    }
}
