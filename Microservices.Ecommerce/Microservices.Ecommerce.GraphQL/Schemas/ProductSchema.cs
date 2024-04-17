using GraphQL.Types;
using Microservices.Ecommerce.GraphQL.Queries;

namespace Microservices.Ecommerce.GraphQL.Schemas
{
    public class ProductSchema : Schema
    {
        public ProductSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = new AutoRegisteringObjectGraphType<ProductQuery>();
        }
    }
}
