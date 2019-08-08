using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Addressbook.data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: true),
                    PhoneNumber = table.Column<string>(maxLength: 20, nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: false),
                    ContactType = table.Column<byte>(nullable: false),
                    WebAddress = table.Column<string>(maxLength: 100, nullable: true),
                    Notes = table.Column<string>(maxLength: 255, nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    CreateDateTime = table.Column<DateTime>(nullable: false),
                    UpdateDateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ContactId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(maxLength: 20, nullable: true),
                    Country = table.Column<string>(maxLength: 30, nullable: true),
                    City = table.Column<string>(maxLength: 30, nullable: true),
                    PostalCode = table.Column<string>(maxLength: 10, nullable: true),
                    AddressLine = table.Column<string>(maxLength: 255, nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false, defaultValue: false),
                    CreateDateTime = table.Column<DateTime>(nullable: false),
                    UpdateDateTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Addresses_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "ContactType", "CreateDateTime", "Email", "FirstName", "LastName", "Notes", "PhoneNumber", "UpdateDateTime", "WebAddress" },
                values: new object[] { 1, (byte)1, new DateTime(2019, 8, 8, 21, 28, 44, 102, DateTimeKind.Local).AddTicks(8728), "yusufsezer@mail.com", "Yusuf", "SEZER", "N/A", "+90 538 693 4533", new DateTime(2019, 8, 8, 21, 28, 44, 103, DateTimeKind.Local).AddTicks(5070), "www.yusufsezer.com" });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "ContactType", "CreateDateTime", "Email", "FirstName", "LastName", "Notes", "PhoneNumber", "UpdateDateTime", "WebAddress" },
                values: new object[] { 2, (byte)0, new DateTime(2019, 8, 8, 21, 28, 44, 103, DateTimeKind.Local).AddTicks(7235), "dashlee0@home.pl", "Davida", "Ashlee", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.", "+62 178 449 0264", new DateTime(2019, 8, 8, 21, 28, 44, 103, DateTimeKind.Local).AddTicks(7238), "globo.com" });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "ContactType", "CreateDateTime", "Email", "FirstName", "LastName", "Notes", "PhoneNumber", "UpdateDateTime", "WebAddress" },
                values: new object[] { 3, (byte)2, new DateTime(2019, 8, 8, 21, 28, 44, 103, DateTimeKind.Local).AddTicks(7266), "tpache0@reddit.com", "Tedra", "Pache", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.", "+48 262 407 5395", new DateTime(2019, 8, 8, 21, 28, 44, 103, DateTimeKind.Local).AddTicks(7267), "abc.net.au" });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "ContactType", "CreateDateTime", "Email", "FirstName", "LastName", "Notes", "PhoneNumber", "UpdateDateTime", "WebAddress" },
                values: new object[] { 4, (byte)3, new DateTime(2019, 8, 8, 21, 28, 44, 103, DateTimeKind.Local).AddTicks(7268), "gtaplin3@gizmodo.com", "Gwenny", "Taplin", "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.", "+86 583 783 5850", new DateTime(2019, 8, 8, 21, 28, 44, 103, DateTimeKind.Local).AddTicks(7269), "japanpost.jp" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "AddressLine", "City", "ContactId", "Country", "CreateDateTime", "Name", "PostalCode", "UpdateDateTime" },
                values: new object[] { 1, "2 Warner Drive", "Portland", 2, "United States", new DateTime(2019, 8, 8, 21, 28, 44, 106, DateTimeKind.Local).AddTicks(4548), "Home", "97240", new DateTime(2019, 8, 8, 21, 28, 44, 106, DateTimeKind.Local).AddTicks(4554) });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "AddressLine", "City", "ContactId", "Country", "CreateDateTime", "Name", "PostalCode", "UpdateDateTime" },
                values: new object[] { 2, "17936 East Plaza", "Bertioga", 2, "Brazil", new DateTime(2019, 8, 8, 21, 28, 44, 106, DateTimeKind.Local).AddTicks(5681), "Office", "11250-000", new DateTime(2019, 8, 8, 21, 28, 44, 106, DateTimeKind.Local).AddTicks(5683) });

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_ContactId",
                table: "Addresses",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_Email",
                table: "Contacts",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Contacts");
        }
    }
}
