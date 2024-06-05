using Microsoft.AspNetCore.Mvc;
using Nota.Api.Dtos;
using Nota.Api.Entities;
using Nota.Api.Persistence;

namespace Nota.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotasController : ControllerBase
    {
        private readonly NotaRepositorio _notaRepositorio;

        public NotasController(NotaRepositorio notaRepositorio)
        {
            _notaRepositorio = notaRepositorio;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<NotaDto> notas;

            notas = (await _notaRepositorio.ObtenerTodosAsync()).Select(x => new NotaDto
            {
                Contenido = x.Contenido,
                Estado = x.Estado,
                Id = Guid.Parse(x.Id),
                Nombre = x.Nombre,
                Tags = x.Tags
            }).ToList();

            return Ok(notas);
        }

        [HttpPost]
        public async Task<IActionResult> Post(NotaDto notaDto)
        {
            var id = await _notaRepositorio.AgregarAsync(new NotaEntity
            {
                Contenido = notaDto.Contenido,
                Estado = notaDto.Estado,
                FechaDeRegistro = DateTime.Now,
                Id = notaDto.Id.ToString(),
                Nombre = notaDto.Nombre,
                Tags = notaDto.Tags,
                FechaFin = notaDto.FechaFin,
                FechaInicio = notaDto.FechaInicio,
            });

            return Created("api/notas/" + id, new { id = id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, NotaUpdateDto nota)
        {
            NotaEntity notaEntity;

            notaEntity = await _notaRepositorio.ObtenerPorIdAsync(id.ToString());
            if (notaEntity is null)
            {
                return NotFound(new { Mensaje = "No encontrado" });
            }
            notaEntity.Nombre = nota.Nombre;
            notaEntity.Estado = nota.Estado;
            notaEntity.Tags = nota.Tags;
            notaEntity.Contenido = nota.Contenido;
            notaEntity.FechaFin = nota.FechaFin;
            notaEntity.FechaInicio = nota.FechaInicio;
            await _notaRepositorio.ActualizarAsync(notaEntity);

            return Accepted(new { Mensaje = "Actualizado" });
        }
    }
}
