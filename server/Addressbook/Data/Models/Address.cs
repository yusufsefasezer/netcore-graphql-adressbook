namespace Addressbook.Data.Models
{
    public class Address : IModel
    {
        public int Id { get; set; }
        public Contact? Contact { get; set; }
        public string? Name { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? AddressLine { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateDateTime { get; set; } = DateTime.Now;
        public DateTime UpdateDateTime { get; set; } = DateTime.Now;
    }
}
