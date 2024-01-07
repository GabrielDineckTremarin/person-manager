using MongoDB.Bson;
using MongoDB.Driver;

namespace ContactOrganizer.Repository
{
    public class MongoDbContext
    {


        private readonly IMongoDatabase _database;

        public MongoDbContext()
        {

            try
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .AddJsonFile("appsettings.json")
                    .Build();

                var databaseName = configuration.GetSection("DatabaseName").Value;
                var connectionString = configuration.GetConnectionString("db1");

                var mongoClient = new MongoClient(connectionString);
                _database = mongoClient.GetDatabase(databaseName);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Método para acessar diferentes coleções
        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            //CreateCollectionIfNotExists(collectionName); // Se a collection ñao existir, criar uma

            // var categoriesCollection = mongoContext.GetCollection<BsonDocument>("Category");
            // //var catDes = BsonSerializer.Deserialize<Category>(document);
            return _database.GetCollection<T>(collectionName);

        }


        public void CreateCollectionIfNotExists(string collectionName)
        {
            var filter = new BsonDocument("name", collectionName);
            var collections = _database.ListCollections(new ListCollectionsOptions { Filter = filter });
            if (!collections.Any())
            {
                _database.CreateCollection(collectionName); // Criar a coleção se não existir
            }
        }



    }

}
