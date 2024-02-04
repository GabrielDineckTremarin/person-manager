using MongoDB.Driver;
using PersonManager.Services.Interfaces;
using System;
using ContactOrganizer.Models;
using MongoDB.Bson;


namespace ContactOrganizer.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly MongoContext _mongoContext;
        private readonly IMongoCollection<PersonDTO> _personCollection;

        public PersonRepository()
        {
            _mongoContext = new MongoContext();
            _personCollection = _mongoContext.GetCollection<PersonDTO>("PersonDTO");
        }

        public List<PersonDTO> GetAllPeople()
        {
            return _personCollection.Find(new BsonDocument()).ToList();
        }
        public PersonDTO GetPersonById(string personId)
        {
            var filter = Builders<PersonDTO>.Filter.Eq("_id", ObjectId.Parse(personId));
            var person = _personCollection.Find(filter).FirstOrDefault();
            return person;
        }

        public void CreatePerson(PersonDTO person) {
            _personCollection.InsertOne(person);
        }

        public void UpdatePerson(PersonDTO person)
        {
            var filter = Builders<PersonDTO>.Filter.Eq("_id", person.Id);
            var update = Builders<PersonDTO>.Update
                .Set(p => p.Name, person.Name)
                .Set(p => p.LastName, person.LastName)
                .Set(p => p.FullName, person.FullName)
                .Set(p => p.Birthday, person.Birthday)
                .Set(p => p.Age, person.Age)
                .Set(p => p.ContactsIds, person.ContactsIds)
                .Set(p => p.AddressesIds, person.AddressesIds);
        }

        public void DeletePerson(string personId)
        {
            var filter = Builders<PersonDTO>.Filter.Eq("_id", ObjectId.Parse(personId));
            _personCollection.DeleteOne(filter);
        }
    }
}
