using Microservices.Ecommerce.Application;
using Microservices.Ecommerce.Application.Interfaces;
using Microservices.Ecommerce.Infrastructure.Identity;
using Microservices.Ecommerce.Infrastructure.Persistence;
using Microservices.Ecommerce.Infrastructure.Shared;
using Microservices.Ecommerce.WebApi.Extensions;
using Microservices.Ecommerce.WebApi.Middlewares;
using Microservices.Ecommerce.WebApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Microservices.Ecommerce.WebApi
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        public IConfiguration _config { get; }
        public Startup(
            IConfiguration configuration,
            IWebHostEnvironment env
            )
        {
            _env = env;
            _config = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEnvironmentVariablesExtension();
            services.AddApplicationLayer();
            services.AddNpgSqlIdentityInfrastructure(_config,_env);
            services.AddNpgSqlPersistenceInfrastructure(_config,_env.IsProduction());
            services.AddSharedInfrastructure(_config);
            services.AddSwaggerExtension();
            services.AddControllers();
            services.AddApiVersioningExtension();
            services.AddHealthChecks();
            services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSwaggerExtension();
            app.UseMiddleware<AntiXssMiddleware>();
            app.UseErrorHandlingMiddleware();
            app.UseHealthChecks("/health");

            app.UseEndpoints(endpoints =>
             {
                 endpoints.MapControllers();
             });
        }
    }
}
