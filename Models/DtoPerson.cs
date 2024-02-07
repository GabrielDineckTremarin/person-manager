using MongoRepository;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ContactOrganizer.Models
{
    public class DtoPerson : Entity
    {
        public string? Name { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? FullName { get; set; } = string.Empty;
        public DateTime Birthday { get; set; }

        public int? Age { get; set; } = 0;

        public String? ContactId { get; set; } = string.Empty
        public List<String>? AddressesIds { get; set; } = new List<String>();
    }


}
