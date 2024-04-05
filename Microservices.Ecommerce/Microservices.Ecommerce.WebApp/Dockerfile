#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 9091
ENV ASPNETCORE_URLS=http://+:9091
ENV ASPNETCORE_ENVIRONMENT=Production

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Microservices.Ecommerce/Microservices.Ecommerce.WebApp/Microservices.Ecommerce.WebApp.csproj", "Microservices.Ecommerce/Microservices.Ecommerce.WebApp/"]
RUN dotnet restore "./Microservices.Ecommerce/Microservices.Ecommerce.WebApp/Microservices.Ecommerce.WebApp.csproj"
COPY . .
WORKDIR "/src/Microservices.Ecommerce/Microservices.Ecommerce.WebApp"
RUN dotnet build "./Microservices.Ecommerce.WebApp.csproj" -c $BUILD_CONFIGURATION -o /app/build

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Microservices.Ecommerce.WebApp.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Microservices.Ecommerce.WebApp.dll"]