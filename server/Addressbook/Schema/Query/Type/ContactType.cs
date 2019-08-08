using System;
using System.Collections.Generic;
using System.Linq;
using GraphQL.Types;
using Addressbook.Data.Models;

namespace Addressbook.Schema.Query.Type
{
    public class ContactType : ObjectGraphType<Contact>
    {
        public ContactType(Data.Context.AppDbContext appDbContext)
        {
            Field(p => p.Id);
            Field(p => p.FirstName);
            Field(p => p.LastName);
            Field(p => p.PhoneNumber);
            Field(p => p.Email);
            Field<ContactTypeEnumType>("ContactType");
            Field(p => p.WebAddress);
            Field(p => p.Notes);
            Field<IntGraphType>(
                name: "CountOfAddress",
                resolve: context =>
                {
                    return appDbContext.Addresses.Where(p => p.Contact.Id == context.Source.Id & p.IsDeleted == false).Count();
                });
            Field<ListGraphType<AddressType>>(
                name: "Addresses",
                resolve: context =>
                {
                    return appDbContext.Addresses.Where(p => p.Contact.Id == context.Source.Id & p.IsDeleted == false).ToList();
                });
            Field(p => p.CreateDateTime);
            Field(p => p.UpdateDateTime);
        }
    }
}
