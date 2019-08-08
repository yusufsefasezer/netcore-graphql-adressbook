using System;
using Addressbook.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Addressbook.Data.Context
{
    public class ContactContextConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.Property(p => p.FirstName)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(p => p.LastName)
                .HasMaxLength(50);

            builder.Property(p => p.PhoneNumber)
                .HasMaxLength(20);

            builder.Property(p => p.Email)
                .HasMaxLength(100)
                .IsRequired();

            builder.HasIndex(p => p.Email)
                .IsUnique();

            builder.Property(p => p.WebAddress)
                .HasMaxLength(100);

            builder.Property(p => p.Notes)
                .HasMaxLength(255);

            builder.HasMany(p => p.Addresses)
                .WithOne(p => p.Contact)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(p => p.IsDeleted)
                .HasDefaultValue(false);

            builder.HasData(
                new Contact
                {
                    Id = 1,
                    FirstName = "Yusuf",
                    LastName = "SEZER",
                    PhoneNumber = "+90 538 693 4533",
                    Email = "yusufsezer@mail.com",
                    ContactType = Enumerations.ContactType.Friends,
                    WebAddress = "www.yusufsezer.com",
                    Notes = "N/A"
                },
                new Contact
                {
                    Id = 2,
                    FirstName = "Davida",
                    LastName = "Ashlee",
                    PhoneNumber = "+62 178 449 0264",
                    Email = "dashlee0@home.pl",
                    ContactType = Enumerations.ContactType.Family,
                    WebAddress = "globo.com",
                    Notes = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus."
                },
                new Contact
                {
                    Id = 3,
                    FirstName = "Tedra",
                    LastName = "Pache",
                    PhoneNumber = "+48 262 407 5395",
                    Email = "tpache0@reddit.com",
                    ContactType = Enumerations.ContactType.Relatives,
                    WebAddress = "abc.net.au",
                    Notes = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus."
                },
                new Contact
                {
                    Id = 4,
                    FirstName = "Gwenny",
                    LastName = "Taplin",
                    PhoneNumber = "+86 583 783 5850",
                    Email = "gtaplin3@gizmodo.com",
                    ContactType = Enumerations.ContactType.Other,
                    WebAddress = "japanpost.jp",
                    Notes = "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."
                }
            );
        }
    }
}
