using Microservices.Ecommerce.Application;
using Microservices.Ecommerce.Application.Interfaces;
using Microservices.Ecommerce.Infrastructure.Identity;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microservices.Ecommerce.Infrastructure.Persistence;
using Microservices.Ecommerce.Infrastructure.Persistence.Contexts;
using Microservices.Ecommerce.Infrastructure.Shared;
using Microservices.Ecommerce.WebViteApp.Server.Extensions;
using Microservices.Ecommerce.WebViteApp.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
var _env = builder.Environment;
var _config = builder.Configuration;
var _services = builder.Services;
// Add services to the container.

_services.AddEnvironmentVariablesExtension();
_services.AddApplicationLayer();
_services.AddNpgSqlIdentityInfrastructure(_config, _env);
_services.AddNpgSqlPersistenceInfrastructure(_config, _env.IsProduction());
_services.AddSharedInfrastructure(_config);
_services.AddControllers();
_services.AddApiVersioningExtension();
_services.AddHealthChecks();
_services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
_services.AddEndpointsApiExplorer();
_services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
   //Read Configuration from appSettings
    var config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .Build();
    //Initialize Logger
    Log.Logger = new LoggerConfiguration()
        .ReadFrom.Configuration(config)
        .CreateLogger();
    try
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        dbContext.Database.Migrate();
        var identityDbContext = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
        identityDbContext.Database.Migrate();

        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        await Microservices.Ecommerce.Infrastructure.Identity.Seeds.DefaultRoles.SeedAsync(userManager, roleManager);
        await Microservices.Ecommerce.Infrastructure.Identity.Seeds.DefaultSuperAdmin.SeedAsync(userManager, roleManager);
        await Microservices.Ecommerce.Infrastructure.Identity.Seeds.DefaultBasicUser.SeedAsync(userManager, roleManager);
        Log.Information("Finished Seeding Default Data");
        Log.Information("Application Starting");
    }
    catch (Exception ex)
    {
        Log.Warning(ex, "An error occurred seeding the DB");
    }
    finally
    {
        Log.CloseAndFlush();
    }
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
