using ContactOrganizer.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using PersonManager.Services.Interfaces;

namespace ContactOrganizer.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly MongoContext _mongoContext;
        private readonly IMongoCollection<ContactDTO> _contactCollection;


        public List<ContactDTO> GetAllContacts()
        {
            return _contactCollection.Find(new BsonDocument()).ToList();
        }

        public ContactRepository()
        {
            _mongoContext = new MongoContext();
            _contactCollection = _mongoContext.GetCollection<ContactDTO>("ContactDTO");
        }

        public ContactDTO GetContactById(string contactId)
        {
            var filter = Builders<ContactDTO>.Filter.Eq("_id", ObjectId.Parse(contactId));
            var contact = _contactCollection.Find(filter).FirstOrDefault();
            return contact;
        }

        public void CreateContact(ContactDTO contact)
        {
            _contactCollection.InsertOne(contact);
        }

        public void UpdateContact(ContactDTO contact)
        {
            var filter = Builders<ContactDTO>.Filter.Eq("_id", contact.Id);
            var update = Builders<ContactDTO>.Update
                .Set(x => x.Phones, contact.Phones)
                .Set(x => x.Emails, contact.Emails)
                .Set(x => x.SocialMedia, contact.SocialMedia);
 

        }
        public void DeleteContact(string contactId)
        {
            var filter = Builders<ContactDTO>.Filter.Eq("_id", ObjectId.Parse(contactId));
            _contactCollection.DeleteOne(filter);
        }
    }
}
