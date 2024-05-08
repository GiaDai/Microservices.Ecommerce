using Microservices.Ecommerce.Application.Interfaces.Repositories;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Domain.Entities;
using Microservices.Ecommerce.Infrastructure.Persistence.Contexts;
using Microservices.Ecommerce.Infrastructure.Persistence.Repository;
using Microservices.Ecommerce.Infrastructure.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Microservices.Ecommerce.Infrastructure.Persistence.Repositories
{
    public class ProductRepositoryAsync : GenericRepositoryAsync<Product>, IProductRepositoryAsync
    {
        private readonly DbSet<Product> _products;

        public ProductRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
            _products = dbContext.Set<Product>();
        }

        public async Task<PagedList<Product>> GetProductPagedListAsync(int _start, int _end, string _order, string _sort, List<string>? _filter = null)
        {
            var productsQuery = _products.AsQueryable();
            if (_filter != null && _filter.Count > 0)
            {
                productsQuery = MethodExtensions.ApplyFilters(productsQuery, _filter);
            }
            return await PagedList<Product>.ToPagedList(productsQuery.OrderByDynamic(_sort, _order).AsNoTracking(), _start, _end);
        }

        public Task<bool> IsUniqueBarcodeAsync(string barcode)
        {
            return _products
                .AllAsync(p => p.Barcode != barcode);
        }
    }
}
