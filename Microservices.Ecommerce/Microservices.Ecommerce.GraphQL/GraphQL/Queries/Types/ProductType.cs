using HotChocolate.Types;
using Microservices.Ecommerce.Domain.Entities;

namespace Microservices.Ecommerce.GraphQL.GraphQL.Queries.Types
{
    public class ProductType : ObjectType<Product>
    {
        protected override void Configure(IObjectTypeDescriptor<Product> descriptor)
        {
        }
    }
}
