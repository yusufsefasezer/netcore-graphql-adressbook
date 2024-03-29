﻿using Microsoft.EntityFrameworkCore;

namespace Addressbook.Data.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ContactContextConfiguration());
            modelBuilder.ApplyConfiguration(new AddressContextConfiguration());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Models.Contact> Contacts { get; set; }

        public DbSet<Models.Address> Addresses { get; set; }
    }
}
