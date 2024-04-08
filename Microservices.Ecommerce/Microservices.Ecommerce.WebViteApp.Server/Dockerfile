#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Microservices.Ecommerce/microservices.ecommerce.webviteapp.client/nuget.config", "Microservices.Ecommerce/microservices.ecommerce.webviteapp.client/"]
COPY ["Microservices.Ecommerce/Microservices.Ecommerce.WebViteApp.Server/Microservices.Ecommerce.WebViteApp.Server.csproj", "Microservices.Ecommerce/Microservices.Ecommerce.WebViteApp.Server/"]
COPY ["Microservices.Ecommerce/Microservices.Ecommerce.Infrastructure.Identity/Microservices.Ecommerce.Infrastructure.Identity.csproj", "Microservices.Ecommerce/Microservices.Ecommerce.Infrastructure.Identity/"]
COPY ["Microservices.Ecommerce/Microservices.Ecommerce.Infrastructure.Shared/Microservices.Ecommerce.Infrastructure.Shared.csproj", "Microservices.Ecommerce/Microservices.Ecommerce.Infrastructure.Shared/"]
COPY ["Microservices.Ecommerce/Microservices.Ecommerce.Application/Microservices.Ecommerce.Application.csproj", "Microservices.Ecommerce/Microservices.Ecommerce.Application/"]
COPY ["Microservices.Ecommerce/Microservices.Ecommerce.Domain/Microservices.Ecommerce.Domain.csproj", "Microservices.Ecommerce/Microservices.Ecommerce.Domain/"]
COPY ["Microservices.Ecommerce/Microservices.Ecommerce.Infrastructure.Persistence/Microservices.Ecommerce.Infrastructure.Persistence.csproj", "Microservices.Ecommerce/Microservices.Ecommerce.Infrastructure.Persistence/"]
COPY ["Microservices.Ecommerce/microservices.ecommerce.webviteapp.client/microservices.ecommerce.webviteapp.client.esproj", "Microservices.Ecommerce/microservices.ecommerce.webviteapp.client/"]
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs
RUN dotnet restore "./Microservices.Ecommerce/Microservices.Ecommerce.WebViteApp.Server/./Microservices.Ecommerce.WebViteApp.Server.csproj"
COPY . .
WORKDIR "/src/Microservices.Ecommerce/Microservices.Ecommerce.WebViteApp.Server"
RUN dotnet build "./Microservices.Ecommerce.WebViteApp.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Microservices.Ecommerce.WebViteApp.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Microservices.Ecommerce.WebViteApp.Server.dll"]