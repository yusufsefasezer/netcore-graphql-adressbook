using GraphQL;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Services.AddDbContext<Addressbook.Data.Context.AppDbContext>(options =>
{
    //options.UseInMemoryDatabase(nameof(Addressbook));
    options.UseSqlServer(builder.Configuration.GetConnectionString(nameof(Addressbook)));
},ServiceLifetime.Singleton);

builder.Services.AddScoped<Addressbook.Schema.AppSchema>();
builder.Services.AddGraphQL(options =>
{
    options.AddSystemTextJson();
    options.AddSchema<Addressbook.Schema.AppSchema>();
    options.AddGraphTypes();
});

var app = builder.Build();

app.UseCors(builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

app.UseGraphQL<Addressbook.Schema.AppSchema>();

app.UseGraphQLPlayground();

app.MapGet("/", () => "Hello World!");

app.Run();
