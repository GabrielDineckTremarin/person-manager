using MongoRepository;

namespace ContactOrganizer.Models
{
    public class UserDTO : Entity
    {
        public string Password { get; set; }
        public string Email { get; set; }
        public string? Name { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? FullName { get; set; } = string.Empty;
        public DateTime Birthday { get; set; } = DateTime.MinValue;
    }

}
