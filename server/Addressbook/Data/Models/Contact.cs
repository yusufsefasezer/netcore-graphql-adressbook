using System;
using System.Collections.Generic;
using Addressbook.Data.Enumerations;

namespace Addressbook.Data.Models
{
    public class Contact : IModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public ContactType ContactType { get; set; }
        public string WebAddress { get; set; }
        public string Notes { get; set; }
        public ICollection<Address> Addresses { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateDateTime { get; set; } = DateTime.Now;
        public DateTime UpdateDateTime { get; set; } = DateTime.Now;
    }
}
