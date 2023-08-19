using GraphQL;
using GraphQL.Types;

namespace Addressbook.Schema.Mutation
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation(Data.Context.AppDbContext appDbContext)
        {
            Name = nameof(RootMutation);
            Description = "Root Mutation";

            Field<Query.Type.ContactType>("addContact")
                .Description("Add new contact")
                .Argument<NonNullGraphType<Type.ContactInputType>>("contact")
                .Resolve(context =>
                {
                    var contact = context.GetArgument<Data.Models.Contact>("contact");

                    try
                    {
                        var foundContact = appDbContext.Contacts.Where(p => p.Email == contact.Email).FirstOrDefault();
                        if (foundContact != null) throw new Exception("This email has been used by another contact.");

                        appDbContext.Contacts.Add(contact);
                        appDbContext.SaveChanges();
                        return contact;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message, ex));
                        return null;
                    }
                });

            Field<Query.Type.ContactType>("updateContact")
                .Description("Update contact specified by contactId")
                .Arguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "contactId" },
                    new QueryArgument<NonNullGraphType<Type.ContactInputType>> { Name = "contact" })
                .Resolve(context =>
                {
                    var contactId = context.GetArgument<int>("contactId");
                    var contact = context.GetArgument<Data.Models.Contact>("contact");

                    try
                    {
                        var foundContact = appDbContext.Contacts.Where(p => p.Id == contactId && p.IsDeleted == false).FirstOrDefault();
                        if (foundContact == null) throw new Exception("Contact not found.");

                        foundContact.FirstName = contact.FirstName;
                        foundContact.LastName = contact.LastName;
                        foundContact.PhoneNumber = contact.PhoneNumber;
                        foundContact.Email = contact.Email;
                        foundContact.ContactType = contact.ContactType;
                        foundContact.WebAddress = contact.WebAddress;
                        foundContact.Notes = contact.Notes;
                        foundContact.UpdateDateTime = DateTime.Now;
                        appDbContext.SaveChanges();
                        return foundContact;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message, ex));
                        return null;
                    }
                });

            Field<BooleanGraphType>("deleteContact")
                .Description("Delete contact specified by contactId")
                .Argument<NonNullGraphType<IntGraphType>>("contactId")
                .Resolve(context =>
                {
                    var contactId = context.GetArgument<int>("contactId");

                    try
                    {
                        var foundContact = appDbContext.Contacts.Where(p => p.Id == contactId && p.IsDeleted == false).FirstOrDefault();
                        if (foundContact == null) throw new Exception("Contact not found.");
                        foundContact.IsDeleted = true;
                        //appDbContext.Contacts.Remove(foundContact);
                        appDbContext.SaveChanges();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message, ex));
                        return false;
                    }
                });

            Field<Query.Type.AddressType>("addAddress")
                .Description("Add new address")
                .Arguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "contactId" },
                    new QueryArgument<NonNullGraphType<Type.AddressInputType>> { Name = "address" })
                .Resolve(context =>
                {
                    var address = context.GetArgument<Data.Models.Address>("address");
                    var contactId = context.GetArgument<int>("contactId");

                    try
                    {

                        var foundContact = appDbContext.Contacts.Where(p => p.Id == contactId & p.IsDeleted == false).FirstOrDefault();
                        address.Contact = foundContact ?? throw new Exception("Contact not found.");
                        appDbContext.Addresses.Add(address);
                        appDbContext.SaveChanges();
                        return address;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message, ex));
                        return null;
                    }
                });

            Field<Query.Type.AddressType>("updateAddress")
                .Description("Update address specified by addressId")
                .Arguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "addressId" },
                    new QueryArgument<NonNullGraphType<Type.AddressInputType>> { Name = "address" })
                .Resolve(context =>
                {
                    var addressId = context.GetArgument<int>("addressId");
                    var address = context.GetArgument<Data.Models.Address>("address");

                    try
                    {
                        var foundAddress = appDbContext.Addresses.Where(p => p.Id == addressId && p.IsDeleted == false).FirstOrDefault();
                        if (foundAddress == null) throw new Exception("Address not found.");

                        foundAddress.Name = address.Name;
                        foundAddress.Country = address.Country;
                        foundAddress.City = address.City;
                        foundAddress.PostalCode = address.PostalCode;
                        foundAddress.AddressLine = address.AddressLine;
                        foundAddress.UpdateDateTime = DateTime.Now;
                        appDbContext.SaveChanges();
                        return foundAddress;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message, ex));
                        return null;
                    }
                });

            Field<BooleanGraphType>("deleteAddress")
                .Description("Delete address specified by addressId")
                .Argument<NonNullGraphType<IntGraphType>>("addressId")
                .Resolve(context =>
                {
                    var addressId = context.GetArgument<int>("addressId");

                    try
                    {
                        var foundAddress = appDbContext.Addresses.Where(p => p.Id == addressId & p.IsDeleted == false).FirstOrDefault();
                        if (foundAddress == null) throw new Exception("Address not found.");
                        foundAddress.IsDeleted = true;
                        //appDbContext.Addresses.Remove(foundAddress);
                        appDbContext.SaveChanges();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message, ex));
                        return false;
                    }
                });
        }
    }
}
