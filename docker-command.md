dotnet ef dbcontext list
dotnet ef migrations add InitialCreate --context ApplicationDbContext
dotnet ef migrations add InitialCreate --context IdentityContext

dotnet ef migrations add AddColPriceToProduct --context ApplicationDbContext -o ../Microservices.Ecommerce.Infrastructure.Persistence/Migrations

dotnet ef database update --context ApplicationDbContext
dotnet ef database update --context IdentityContext

docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=sql@pa22w0rd" -p 1433:1433 -d --name=sqlserver mcr.microsoft.com/mssql/server:2019-CU13-ubuntu-20.04 

docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=sql@pa22w0rd" -p 1433:1433 -d --name=sqlserver mcr.microsoft.com/mssql/server:2022-preview-ubuntu-22.04 

docker cp AdventureWorksDW2022.bak 18bb604a740b9903de3399ca6869dd6b5238461a8317050a9cc308b2aa3e0bdd:/var/opt/mssql/data/AdventureWorksDW2022.bak
docker cp WideWorldImporters-Full.bak 18bb604a740b9903de3399ca6869dd6b5238461a8317050a9cc308b2aa3e0bdd:/var/opt/mssql/data/WideWorldImporters-Full.bak
docker cp AdventureWorksDW2016.bak 18bb604a740b9903de3399ca6869dd6b5238461a8317050a9cc308b2aa3e0bdd:/var/opt/mssql/data/AdventureWorksDW2016.bak
docker cp AdventureWorksDW2017.bak 18bb604a740b9903de3399ca6869dd6b5238461a8317050a9cc308b2aa3e0bdd:/var/opt/mssql/data/AdventureWorksDW2017.bak
docker cp WideWorldImportersDW-Full.bak 18bb604a740b9903de3399ca6869dd6b5238461a8317050a9cc308b2aa3e0bdd:/var/opt/mssql/data/WideWorldImportersDW-Full.bak

dotnet ef dbcontext scaffold "Server=localhost;Database=AdventureWorksDW2022;User Id=sa;Password=sql@pa22w0rd;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -o Models

Start-Process -Wait -FilePath "Docker Desktop Installer.exe" -ArgumentList "install -accept-license --installation-dir=E:\Docker"