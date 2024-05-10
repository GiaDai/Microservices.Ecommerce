using System;

namespace Microservices.Ecommerce.Infrastructure.Shared.Environments
{
    public interface ICloudinarySettingsProvider
    {
        string GetConnectionString();
    }
}
