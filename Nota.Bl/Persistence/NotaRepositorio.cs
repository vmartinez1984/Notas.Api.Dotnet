using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Nota.Bl.Entities;

namespace Nota.Api.Persistence
{
    public class NotaRepositorio
    {
        private readonly IMongoCollection<NotaEntity> _collection;
        public NotaRepositorio(IConfiguration configurations)
        {
            var mongoClient = new MongoClient(
                configurations.GetConnectionString("mongoDb")
            );
            var mongoDbName = configurations.GetSection("mongoDbName").Value;
            var mongoDatabase = mongoClient.GetDatabase(mongoDbName);
            _collection = mongoDatabase.GetCollection<NotaEntity>("Notas");
        }

        public async Task<List<NotaEntity>> ObtenerTodosAsync()
        {
            List<NotaEntity> notas;

            notas = (await _collection.FindAsync(_ => true)).ToList();

            return notas;
        }

        public async Task<string> AgregarAsync(NotaEntity item)
        {
            await _collection.InsertOneAsync(item);

            return item._id.ToString();
        }

        public async Task<NotaEntity> ObtenerPorIdAsync(string id)
        {
            return (await _collection.FindAsync(x => x.Id == id)).FirstOrDefault();
        }

        public async Task ActualizarAsync(NotaEntity notaEntity)
        {
            await _collection.ReplaceOneAsync(x => x.Id == notaEntity.Id, notaEntity);
        }
    }
}
