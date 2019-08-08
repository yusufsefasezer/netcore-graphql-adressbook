using System;
using Addressbook.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Addressbook.Data.Context
{
    public class AddressContextConfiguration : IEntityTypeConfiguration<Models.Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.Property(p => p.Name)
                .HasMaxLength(20);

            builder.Property(p => p.Country)
                .HasMaxLength(30);

            builder.Property(p => p.City)
                .HasMaxLength(30);

            builder.Property(p => p.PostalCode)
                .HasMaxLength(10);

            builder.Property(p => p.AddressLine)
                .HasMaxLength(255);

            builder.Property(p => p.IsDeleted)
                .HasDefaultValue(false);

            builder.HasData(
                new
                {
                    Id = 1,
                    Name = "Home",
                    Country = "United States",
                    City = "Portland",
                    PostalCode = "97240",
                    AddressLine = "2 Warner Drive",
                    ContactId = 2,
                    CreateDateTime = DateTime.Now,
                    UpdateDateTime = DateTime.Now
                },
                new
                {
                    Id = 2,
                    Name = "Office",
                    Country = "Brazil",
                    City = "Bertioga",
                    PostalCode = "11250-000",
                    AddressLine = "17936 East Plaza",
                    ContactId = 2,
                    CreateDateTime = DateTime.Now,
                    UpdateDateTime = DateTime.Now
                }
                );
        }
    }
}
