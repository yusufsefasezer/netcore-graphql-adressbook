using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;

namespace Addressbook.Schema.Mutation.Type
{
    public class ContactInputType : InputObjectGraphType<Data.Models.Contact>
    {
        public ContactInputType()
        {
            Name = nameof(ContactInputType);
            Description = "Contact Input Type";

            Field(p => p.FirstName);
            Field(p => p.LastName);
            Field(p => p.PhoneNumber);
            Field(p => p.Email);
            Field<Query.Type.ContactTypeEnumType>("ContactType");
            Field(p => p.WebAddress);
            Field(p => p.Notes);
        }
    }
}
