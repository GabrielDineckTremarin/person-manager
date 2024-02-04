using MongoRepository;

namespace ContactOrganizer.Models
{
    public class PersonDTO : Entity
    {
        public string? Name { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? FullName { get; set; } = string.Empty;
        public DateTime Birthday { get; set; }
        public int? Age { get; set; } = 0;
        public List<String>? ContactsIds { get; set; } = new List<String>();
        public List<String>? AddressesIds { get; set; } = new List<String>();


    }
}
