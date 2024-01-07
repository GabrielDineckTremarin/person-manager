using MongoRepository;

namespace ContactOrganizer.Models
{
    public class UserDTO : Entity
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Phone { get; set; }
    }


    public class GenderTypes
    {
        public const string Male = "Male";
        public const string Female = "Female";
        public const string Other = "Other";

    }


}
