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
        private readonly IMongoCollection<DtoPerson> _personCollection;

        public PersonRepository()
        {
            _mongoContext = new MongoContext();
            _personCollection = _mongoContext.GetCollection<DtoPerson>("DtoPerson");
        }

        public List<DtoPerson> GetAllPeople()
        {
            return _personCollection.Find(new BsonDocument()).ToList();
        }
        public DtoPerson GetPersonById(string personId)
        {
            var filter = Builders<DtoPerson>.Filter.Eq("_id", ObjectId.Parse(personId));
            var person = _personCollection.Find(filter).FirstOrDefault();
            return person;
        }

        public void CreatePerson(DtoPerson person) {
            _personCollection.InsertOne(person);
        }

        public void UpdatePerson(DtoPerson person)
        {
            var filter = Builders<DtoPerson>.Filter.Eq("_id", new ObjectId(person.Id));

            var update = Builders<DtoPerson>.Update
                .Set(p => p.Name, person.Name)
                .Set(p => p.LastName, person.LastName)
                .Set(p => p.FullName, person.FullName)
                .Set(p => p.Birthday, person.Birthday)
                .Set(p => p.Age, person.Age)
                .Set(p => p.ContactId, person.ContactId)
                .Set(p => p.AddressesIds, person.AddressesIds);

            _personCollection.UpdateOne(filter, update);
        }


        public void DeletePerson(string personId)
        {
            var filter = Builders<DtoPerson>.Filter.Eq("_id", ObjectId.Parse(personId));
            _personCollection.DeleteOne(filter);
        }
    }
}
