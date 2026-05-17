using Tashkil.Application.Interfaces;
using Tashkil.Application.Services;
using Tashkil.Domain.Interfaces;
using Tashkil.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddScoped<ISchemaReader>(provider => new SchemaReader(connectionString));
builder.Services.AddScoped<ISchemaService, SchemaService>();

builder.Services.AddScoped<ICodeGeneratorService, CodeGeneratorService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
