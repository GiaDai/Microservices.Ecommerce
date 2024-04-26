﻿//using AppAny.HotChocolate.FluentValidation;
using Microservices.Ecommerce.GraphQL.GraphQL.Mutations;
using Microservices.Ecommerce.GraphQL.GraphQL.Queries;
using Microservices.Ecommerce.GraphQL.GraphQL.Subcriptions;
using Microservices.Ecommerce.Infrastructure.Shared.Environments;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

namespace Microservices.Ecommerce.GraphQL.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddSwaggerExtension(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.IncludeXmlComments(@"Microservices.Ecommerce.GraphQL.xml");
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Clean Architecture - Microservices.Ecommerce.GraphQL",
                    Description = "This Api will be responsible for overall data distribution and authorization.",
                    Contact = new OpenApiContact
                    {
                        Name = "codewithmukesh",
                        Email = "hello@codewithmukesh.com",
                        Url = new Uri("https://codewithmukesh.com/contact"),
                    }
                });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    Description = "Input your Bearer token in this format - Bearer {your token here} to access this API",
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer",
                            },
                            Scheme = "Bearer",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        }, new List<string>()
                    },
                });
            });
        }
        public static void AddApiVersioningExtension(this IServiceCollection services)
        {
            services.AddApiVersioning(config =>
            {
                // Specify the default API Version as 1.0
                config.DefaultApiVersion = new ApiVersion(1, 0);
                // If the client hasn't specified the API version in the request, use the default API version number 
                config.AssumeDefaultVersionWhenUnspecified = true;
                // Advertise the API versions supported for the particular endpoint
                config.ReportApiVersions = true;
            });
        }

        public static void AddEnvironmentVariablesExtension(this IServiceCollection services)
        {
            services.AddTransient<IDatabaseSettingsProvider, DatabaseSettingsProvider>();
            services.AddTransient<IRedisSettingsProvider, RedisSettingsProvider>();
            services.AddTransient<IElasticSettingsProvider, ElasticSettingsProvider>();
        }

        public static void AddGraphQLExtension(this IServiceCollection services, IWebHostEnvironment _env)
        {
            services.AddGraphQLServer()
                .AddQueryType<Query>()
                .AddMutationType<Mutation>()
                .AddSubscriptionType<Subscription>();

            services.AddInMemorySubscriptions();
        }
    }
}
