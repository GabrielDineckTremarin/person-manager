using ContactOrganizer.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using PersonManager.Services.Interfaces;

namespace ContactOrganizer.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly MongoContext _mongoContext;
        private readonly IMongoCollection<DtoContact> _contactCollection;


        public List<DtoContact> GetAllContacts()
        {
            return _contactCollection.Find(new BsonDocument()).ToList();
        }

        public ContactRepository()
        {
            _mongoContext = new MongoContext();
            _contactCollection = _mongoContext.GetCollection<DtoContact>("DtoContact");
        }

        public DtoContact GetContactById(string contactId)
        {
            var filter = Builders<DtoContact>.Filter.Eq("_id", ObjectId.Parse(contactId));
            var contact = _contactCollection.Find(filter).FirstOrDefault();
            return contact;
        }

        public void CreateContact(DtoContact contact)
        {
            _contactCollection.InsertOne(contact);
        }

        public void UpdateContact(DtoContact contact)
        {
            var filter = Builders<DtoContact>.Filter.Eq("_id", new ObjectId(contact.Id));
            var update = Builders<DtoContact>.Update
                .Set(x => x.Phones, contact.Phones)
                .Set(x => x.Emails, contact.Emails)
                .Set(x => x.SocialMedia, contact.SocialMedia);

            _contactCollection.UpdateOne(filter, update);



        }
        public void DeleteContact(string contactId)
        {
            var filter = Builders<DtoContact>.Filter.Eq("_id", ObjectId.Parse(contactId));
            _contactCollection.DeleteOne(filter);
        }
    }
}
