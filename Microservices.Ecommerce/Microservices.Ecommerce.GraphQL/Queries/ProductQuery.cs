using GraphQL;
using Microservices.Ecommerce.Application.Interfaces.Repositories;
using Microservices.Ecommerce.Domain.Entities;

namespace Microservices.Ecommerce.GraphQL.Queries
{
    public class ProductQuery 
    {
        public static async Task<IEnumerable<Product>> AllProducts([FromServices] IProductRepositoryAsync productRepository, string? from = null)
            => from == null ? await productRepository.GetAllAsync() : await productRepository.GetPagedReponseAsync(int.Parse(from), 10);
    }
}
