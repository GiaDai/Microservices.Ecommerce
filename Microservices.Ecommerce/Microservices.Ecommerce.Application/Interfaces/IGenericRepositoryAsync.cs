using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Microservices.Ecommerce.Application.Interfaces
{
    public interface IGenericRepositoryAsync<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<IReadOnlyList<T>> GetPagedReponseAsync(int _start, int _end);
        Task<T> AddAsync(T entity);
        Task<List<T>> AddRangeAsync(List<T> entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task SaveChangesAsync();
    }
}
