using ContactOrganizer.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using PersonManager.Services.Interfaces;

namespace ContactOrganizer.Repository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly MongoContext _mongoContext;
        private readonly IMongoCollection<AddressDTO> _addressCollection;
        public List<AddressDTO> GetAllAddresses()
        {
            return _addressCollection.Find(new BsonDocument()).ToList();
        }

        public AddressRepository()
        {
            _mongoContext = new MongoContext();
            _addressCollection = _mongoContext.GetCollection<AddressDTO>("AddressDTO");
        }

        public AddressDTO GetAddressById(string addressId)
        {
            var filter = Builders<AddressDTO>.Filter.Eq("_id", ObjectId.Parse(addressId));
            var address = _addressCollection.Find(filter).FirstOrDefault();
            return address;
        }

        public void CreateAddress(AddressDTO address)
        {
            _addressCollection.InsertOne(address);
        }

        public void UpdateAddress(AddressDTO address)
        {
            var filter = Builders<AddressDTO>.Filter.Eq("_id", address.Id);
            var update = Builders<AddressDTO>.Update
                .Set(x => x.Street, address.Street)
                .Set(x => x.City, address.City)
                .Set(x => x.State, address.State)
                .Set(x => x.PostalCode, address.PostalCode)
                .Set(x => x.Country, address.Country);


        }

        public void DeleteAddress(string addressId)
        {
            var filter = Builders<AddressDTO>.Filter.Eq("_id", ObjectId.Parse(addressId));
            _addressCollection.DeleteOne(filter);
        }


    }
}
