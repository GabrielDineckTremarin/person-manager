using MongoRepository;

namespace ContactOrganizer.Models
{
	public class DtoAddress : Entity
	{
		public string Street { get; set; }
		public string City { get; set; }
		public string State { get; set; }
		public string PostalCode { get; set; }
		public string Country { get; set; }

	}
}
