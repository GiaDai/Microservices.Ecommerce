using HotChocolate.Types;
using Microservices.Ecommerce.GraphQL.GraphQL.Queries.Types;

namespace Microservices.Ecommerce.GraphQL.GraphQL.Queries
{
    public class QueryType : ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor.Field(f => f.GetProducts(default!))
                .Name("getProducts")
                .Type<ListType<ProductType>>()
                .Description("Danh sách sản phẩm");

            descriptor.Field(f => f.GetProductsPagination(default!, default!, default!))
                .Name("getProductsPagination")
                .Type<ListType<ProductType>>()
                .Argument("pageSize", a => a.Type<IntType>())
                .Argument("pageNumber", a => a.Type<IntType>())
                .Description("Danh sách sản phẩm phân trang");
        }
    }
}
