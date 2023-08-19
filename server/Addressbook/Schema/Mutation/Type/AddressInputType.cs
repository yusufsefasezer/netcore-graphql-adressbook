using GraphQL.Types;

namespace Addressbook.Schema.Mutation.Type
{
    public class AddressInputType : InputObjectGraphType<Data.Models.Address>
    {

        public AddressInputType()
        {
            Name = nameof(AddressInputType);
            Description = "Address Input Type";

            Field(p => p.Name);
            Field(p => p.Country);
            Field(p => p.City);
            Field(p => p.PostalCode);
            Field(p => p.AddressLine);
        }

    }
}
