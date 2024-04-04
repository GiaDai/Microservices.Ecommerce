using StackExchange.Redis.Extensions.Core.Configuration;

namespace Microservices.Ecommerce.Infrastructure.Shared.Environments
{
    public interface IRedisSettingsProvider
    {
        RedisConfiguration GetRedisConfiguration();
    }
}
