using ContactOrganizer.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using PersonManager.Services.Interfaces;

namespace ContactOrganizer.Repository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly MongoContext _mongoContext;
        private readonly IMongoCollection<DtoAddress> _addressCollection;
        public List<DtoAddress> GetAllAddresses()
        {
            return _addressCollection.Find(new BsonDocument()).ToList();
        }

        public AddressRepository()
        {
            _mongoContext = new MongoContext();
            _addressCollection = _mongoContext.GetCollection<DtoAddress>("DtoAddress");
        }

        public DtoAddress GetAddressById(string addressId)
        {
            var filter = Builders<DtoAddress>.Filter.Eq("_id", ObjectId.Parse(addressId));
            var address = _addressCollection.Find(filter).FirstOrDefault();
            return address;
        }

        public void CreateAddress(DtoAddress address)
        {
            _addressCollection.InsertOne(address);
        }

        public void UpdateAddress(DtoAddress address)
        {
            var filter = Builders<DtoAddress>.Filter.Eq("_id", address.Id);
            var update = Builders<DtoAddress>.Update
                .Set(x => x.Street, address.Street)
                .Set(x => x.City, address.City)
                .Set(x => x.State, address.State)
                .Set(x => x.PostalCode, address.PostalCode)
                .Set(x => x.Country, address.Country);


        }

        public void DeleteAddress(string addressId)
        {
            var filter = Builders<DtoAddress>.Filter.Eq("_id", ObjectId.Parse(addressId));
            _addressCollection.DeleteOne(filter);
        }


    }
}
