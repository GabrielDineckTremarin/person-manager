using MongoRepository;

namespace ContactOrganizer.Models
{
    public class DtoContact : Entity
    {

        public List<string> Phones { get; set; }
        public List<string> Emails { get; set; }
        public List<ContactSocialMedia>? SocialMedia{ get; set; } = new List<ContactSocialMedia>();

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
