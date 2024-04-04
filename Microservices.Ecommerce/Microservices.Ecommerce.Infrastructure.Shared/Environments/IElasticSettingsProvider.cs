namespace Microservices.Ecommerce.Infrastructure.Shared.Environments
{
    public interface IElasticSettingsProvider
    {
        string GetCloudId();
        string GetApiKey();
    }
}
