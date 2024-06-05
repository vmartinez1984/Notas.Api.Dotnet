using MongoDB.Driver;
using Nota.Api.Entities;

namespace Nota.Api.Persistence
{
    public class EstadoRepositorio
    {
        private readonly IMongoCollection<EstadoEntity> _collection;
        public EstadoRepositorio(IConfiguration configurations)
        {
            var mongoClient = new MongoClient(
                configurations.GetConnectionString("mongoDb")
            );
            var mongoDbName = configurations.GetSection("mongoDbName").Value;
            var mongoDatabase = mongoClient.GetDatabase(mongoDbName);
            _collection = mongoDatabase.GetCollection<EstadoEntity>("Estados");
        }

        internal async Task<List<EstadoEntity>> ObtenerTodosAsync()
        {
            List<EstadoEntity> notas;

            notas = (await _collection.FindAsync(_ => true)).ToList();

            return notas;
        }       
    }
}