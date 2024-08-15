using Nota.Api.Persistence;
using Nota.Bl.Dtos;

namespace Nota.Bl.BussinesLayer
{
    public class NotaBl
    {
        private readonly NotaRepositorio _notaRepositorio;

        public NotaBl(NotaRepositorio notaRepositorio)
        {
            _notaRepositorio = notaRepositorio;
        }

        public async Task<List<NotaDto>> ObtenerTodos()
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

            return notas;

        }
    }
}
