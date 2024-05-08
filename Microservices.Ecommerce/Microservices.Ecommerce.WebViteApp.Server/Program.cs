using Microservices.Ecommerce.Application;
using Microservices.Ecommerce.Application.Interfaces;
using Microservices.Ecommerce.Infrastructure.Identity;
using Microservices.Ecommerce.Infrastructure.Persistence;
using Microservices.Ecommerce.Infrastructure.Shared;
using Microservices.Ecommerce.WebViteApp.Server.Extensions;
using Microservices.Ecommerce.WebViteApp.Server.Initializer;
using Microservices.Ecommerce.WebViteApp.Server.Services;

var builder = WebApplication.CreateBuilder(args);
var _env = builder.Environment;
var _config = builder.Configuration;
var _services = builder.Services;
// Add services to the container.

_services.AddEnvironmentVariablesExtension();
_services.AddApplicationLayer();
_services.AddNpgSqlIdentityInfrastructure(_config, _env);
_services.AddIdentityLayer();
_services.AddNpgSqlPersistenceInfrastructure(_env.IsProduction());
_services.AddSharedInfrastructure(_config);
_services.AddSwaggerExtension();
_services.AddControllers().AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);
_services.AddApiVersioningExtension();
_services.AddHealthChecks();
_services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
_services.AddEndpointsApiExplorer();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var initializer = new ApplicationInitializer(scope.ServiceProvider);
    await initializer.InitializeAsync();
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerExtension();
    app.UseDeveloperExceptionPage();
    app.UseErrorHandlingMiddleware();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
    app.UseErrorHandlingMiddleware();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseHealthChecks("/health");
app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
