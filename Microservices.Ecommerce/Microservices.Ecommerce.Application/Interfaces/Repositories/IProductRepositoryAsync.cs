using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Microservices.Ecommerce.Application.Interfaces.Repositories
{
    public interface IProductRepositoryAsync : IGenericRepositoryAsync<Product>
    {
        Task<bool> IsUniqueBarcodeAsync(string barcode);
        Task<int> DeleteRangeAsync(List<int> ids);
        Task<PagedList<Product>> GetProductPagedListAsync(int _start, int _end, string _order, string _sort, List<string>? _filter = null);
    }
}
