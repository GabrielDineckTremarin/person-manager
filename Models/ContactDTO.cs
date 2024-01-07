using MongoRepository;

namespace ContactOrganizer.Models
{
    public class ContactDTO : Entity
    {

        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public List<ContactSocialMedia> SocialMedia{ get; set; }
        public int GroupId { get; set; }
        public string UserId { get; set; }
    }


    public class ContactSocialMedia
    {
        public string MediaName { get; set; }
        public string Username { get; set;  }
    }

    public class SocialMedia
    {
        public const string X = "X";
        public const string Facebook = "Facebook";
        public const string Intagram = "Instagram";
        public const string Snapchat = "Snapchat";
       
    }


}
