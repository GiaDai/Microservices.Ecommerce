using Microservices.Ecommerce.Application;
using Microservices.Ecommerce.Application.Interfaces;
using Microservices.Ecommerce.GraphQL.Extensions;
using Microservices.Ecommerce.GraphQL.Services;
using Microservices.Ecommerce.Infrastructure.Identity;
using Microservices.Ecommerce.Infrastructure.Persistence;
using Microservices.Ecommerce.Infrastructure.Shared;

var builder = WebApplication.CreateBuilder(args);
var _services = builder.Services;
var _config = builder.Configuration;
var _env = builder.Environment;
// Add services to the container.
_services.AddEnvironmentVariablesExtension();
_services.AddApplicationLayer();
_services.AddNpgSqlIdentityInfrastructure(_config, _env);
_services.AddNpgSqlPersistenceInfrastructure(_config, _env.IsProduction());
_services.AddSharedInfrastructure(_config);
_services.AddSwaggerExtension();
_services.AddControllers();
_services.AddApiVersioningExtension();
_services.AddHealthChecks();
_services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
_services.AddGraphQLExtension(_env);

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
app.UseRouting();
app.UseAuthorization();
app.UseAuthorization();
app.UseSwaggerExtension();
app.UseErrorHandlingMiddleware();
app.UseHealthChecks("/health");
app.UseWebSockets();
app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapGraphQL("/graphql");
    endpoints.MapControllers();
});

app.Run();
