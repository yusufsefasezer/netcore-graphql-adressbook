using GraphQL.Types;
using Addressbook.Data.Models;

namespace Addressbook.Schema.Query.Type
{
    public class AddressType : ObjectGraphType<Address>
    {
        public AddressType()
        {
            Field(p => p.Id);
            Field(p => p.Name);
            Field(p => p.Country);
            Field(p => p.City);
            Field(p => p.PostalCode);
            Field(p => p.AddressLine);
            Field(p => p.CreateDateTime);
            Field(p => p.UpdateDateTime);
        }
    }
}
