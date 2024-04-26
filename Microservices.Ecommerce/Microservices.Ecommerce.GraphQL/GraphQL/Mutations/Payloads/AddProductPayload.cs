using Microservices.Ecommerce.Domain.Entities;

namespace Microservices.Ecommerce.GraphQL.GraphQL.Mutations.Payloads
{
    public class AddProductPayload
    {
        public Product Product { get; }
        public AddProductPayload(Product product)
        {
            Product = product;
        }
    }
}
