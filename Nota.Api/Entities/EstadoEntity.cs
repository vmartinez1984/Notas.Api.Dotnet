﻿using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Nota.Api.Entities
{
    public class EstadoEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        [BsonElement("nombre")]
        public string Nombre { get; set; }
    }
}
