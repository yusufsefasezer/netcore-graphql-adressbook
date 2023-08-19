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

            Field<ListGraphType<Type.ContactType>>(
                name: "contacts",
                description: "Get all contacts",
                resolve: context =>
                {
                    return appDbContext.Contacts.Where(p => p.IsDeleted == false).OrderBy(p => p.FirstName).ToList();
                });

            Field<Type.ContactType>(
                name: "contact",
                description: "Get contact by contactId",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }
                    ),
                resolve: context =>
                {
                    var id = context.GetArgument<int>("id");
                    var foundContact = appDbContext.Contacts.FirstOrDefault(p => p.Id == id & p.IsDeleted == false);

                    if (foundContact == null)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError("Contact not found."));
                        return null;
                    }

                    return foundContact;
                });

            Field<Type.AddressType>(
                name: "address",
                description: "Get address by addressId",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }
                    ),
                resolve: context =>
                {
                    var id = context.GetArgument<int>("id");
                    var foundAddress = appDbContext.Addresses.FirstOrDefault(p => p.Id == id & p.IsDeleted == false);

                    if (foundAddress == null)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError("Address not found."));
                        return null;
                    }

                    return foundAddress;
                });
        }
    }
}
