using GraphQL.Types;
using Microservices.Ecommerce.Domain.Entities;

namespace Microservices.Ecommerce.GraphQL.Types
{
    public class ProductType : ObjectGraphType<Product>
    {
        public ProductType()
        {
            Field(x => x.Id);
            Field(x => x.Name);
            Field(x => x.Description);
            Field(x => x.Barcode);
            Field(x => x.Rate);
        }
    }
}
