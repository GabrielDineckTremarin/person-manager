namespace ContactOrganizer.Models
{
    public class Response
    {
        public string? Message { get; set; } = String.Empty;
        public object? Data { get; set; }
        public bool? Success { get; set; } = false;
    }


    public class PersonResponse
    {
        public string Id { get; set; }
        public string? Name { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public string? FullName { get; set; } = string.Empty;
        public DateTime Birthday { get; set; }
        public int? Age { get; set; } = 0;
        public DtoContact? Contact{ get; set; }
        public List<DtoAddress>? Addresses { get; set; } = new List<DtoAddress>();
    }
}
