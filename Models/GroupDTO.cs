using MongoRepository;

namespace ContactOrganizer.Models
{
    public class GroupDTO : Entity
    {
        public string GroupName { get; set; }
        public string UserId { get; set; }

    }
}
