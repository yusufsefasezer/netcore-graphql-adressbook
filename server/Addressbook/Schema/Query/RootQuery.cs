using GraphQL;
using GraphQL.Types;

namespace Addressbook.Schema.Query
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery(Data.Context.AppDbContext appDbContext)
        {
            Name = nameof(RootQuery);
            Description = "Root Query";

            Field<ListGraphType<Type.ContactType>>(name: "contacts")
                .Description("Get all contacts")
                .Resolve(context => appDbContext.Contacts
                .Where(p => p.IsDeleted == false)
                .OrderBy(p => p.FirstName)
                .ToList());

            Field<Type.ContactType>("contact")
                .Description("Get contact by contactId")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .Resolve(context =>
                {
                    var id = context.GetArgument<int>("id");
                    var foundContact = appDbContext.Contacts.FirstOrDefault(p => p.Id == id & p.IsDeleted == false);

                    if (foundContact == null)
                    {
                        context.Errors.Add(new ExecutionError("Contact not found."));
                        return null;
                    }

                    return foundContact;
                });

            Field<Type.AddressType>("address")
                .Description("Get address by addressId")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .Resolve(context =>
                {
                    var id = context.GetArgument<int>("id");
                    var foundAddress = appDbContext.Addresses.FirstOrDefault(p => p.Id == id & p.IsDeleted == false);

                    if (foundAddress == null)
                    {
                        context.Errors.Add(new ExecutionError("Address not found."));
                        return null;
                    }

                    return foundAddress;
                });
        }
    }
}
