using Microservices.Ecommerce.Application.Interfaces;
using Microservices.Ecommerce.Application.Interfaces.Repositories;
using Microservices.Ecommerce.Infrastructure.Persistence.Contexts;
using Microservices.Ecommerce.Infrastructure.Persistence.Repositories;
using Microservices.Ecommerce.Infrastructure.Persistence.Repository;
using Microservices.Ecommerce.Infrastructure.Shared.Environments;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;

namespace Microservices.Ecommerce.Infrastructure.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            if (configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase("ApplicationDb"));
            }
            else
            {
                services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlServer(
                   configuration.GetConnectionString("DefaultConnection"),
                   b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
            }
            #region Repositories
            services.AddTransient(typeof(IGenericRepositoryAsync<>), typeof(GenericRepositoryAsync<>));
            services.AddTransient<IProductRepositoryAsync, ProductRepositoryAsync>();
            #endregion
        }

        public static void AddMySqlPersistenceInfrastructure(this IServiceCollection services, IConfiguration configuration, bool isProduction)
        {
            // Build the intermediate service provider
            var sp = services.BuildServiceProvider();
            using (var scope = sp.CreateScope())
            {
                var _dbSetting = scope.ServiceProvider.GetRequiredService<IDatabaseSettingsProvider>();
                string appConnStr = _dbSetting.GetMySQLConnectionString();
                if (!string.IsNullOrWhiteSpace(appConnStr))
                {
                    var serverVersion = new MySqlServerVersion(new Version(5, 7, 35));
                    services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseMySql(
                        appConnStr, serverVersion,
                        b =>
                        {
                            b.SchemaBehavior(MySqlSchemaBehavior.Ignore);
                            b.EnableRetryOnFailure(
                                maxRetryCount: 5,
                                maxRetryDelay: TimeSpan.FromSeconds(30),
                                errorNumbersToAdd: null);
                            b.MigrationsAssembly(isProduction ? typeof(ApplicationDbContext).Assembly.FullName : "Microservices.Ecommerce.WebApi");
                            b.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                        }));
                }
            }
            #region Repositories
            services.AddTransient(typeof(IGenericRepositoryAsync<>), typeof(GenericRepositoryAsync<>));
            services.AddTransient<IProductRepositoryAsync, ProductRepositoryAsync>();
            #endregion
        }

        // Add persistence infrastructure for NpgSql
        public static void AddNpgSqlPersistenceInfrastructure(this IServiceCollection services, bool isProduction)
        {
            // Build the intermediate service provider
            var sp = services.BuildServiceProvider();
            using (var scope = sp.CreateScope())
            {
                var _dbSetting = scope.ServiceProvider.GetRequiredService<IDatabaseSettingsProvider>();
                string appConnStr = _dbSetting.GetPostgresConnectionString();
                Console.WriteLine("Postgres Connection String: " + appConnStr);
                if (!string.IsNullOrWhiteSpace(appConnStr))
                {
                    services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseNpgsql(
                    appConnStr,
                    b =>
                    {
                        b.MigrationsAssembly(isProduction ? typeof(ApplicationDbContext).Assembly.FullName : "Microservices.Ecommerce.WebApi");
                        // b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName);
                        b.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                    }));
                }
            }
            #region Repositories
            services.AddTransient(typeof(IGenericRepositoryAsync<>), typeof(GenericRepositoryAsync<>));
            services.AddTransient<IProductRepositoryAsync, ProductRepositoryAsync>();
            #endregion
        }
    }
}
