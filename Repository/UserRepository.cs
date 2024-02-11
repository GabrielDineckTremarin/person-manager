using ContactOrganizer.Models;
using ContactOrganizer.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ContactOrganizer.Repository
{
    public class UserRepository :IUserRepository
    {
        private readonly MongoContext _mongoContext;
        private readonly IMongoCollection<DtoUser> _userCollection;

        public UserRepository()
        {
            _mongoContext = new MongoContext();
            _userCollection = _mongoContext.GetCollection<DtoUser>("DtoUser");
        }

        public List<DtoUser> GetAllUsers()
        {
            return _userCollection.Find(new BsonDocument()).ToList();
        }

        public DtoUser GetUserById(string userId)
        {
            var filter = Builders<DtoUser>.Filter.Eq("_id", ObjectId.Parse(userId));
            var user = _userCollection.Find(filter).FirstOrDefault();
            return user;
        }

        public void CreateUser(DtoUser user)
        {
            _userCollection.InsertOne(user);
        }

        public void UpdateUser(DtoUser user)
        {
            var filter = Builders<DtoUser>.Filter.Eq("_id", user.Id);
            var update = Builders<DtoUser>.Update
                .Set(x => x.Name, user.Name)
                .Set(x => x.LastName, user.LastName)
                .Set(x => x.FullName, user.FullName)
                .Set(x => x.Birthday, user.Birthday)
                .Set(x => x.Password, user.Password)
                .Set(x => x.Email, user.Email);

            _userCollection.UpdateOne(filter, update);


        }
        public void DeleteUser(string userId)
        {
            var filter = Builders<DtoUser>.Filter.Eq("_id", ObjectId.Parse(userId));
            _userCollection.DeleteOne(filter);
        }
    }
}
