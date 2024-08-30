using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PowerOutageService.Enteties.Contracts;

namespace PowerOutageService.Services.Contracts
{
    public interface IBaseService<T>
    {
        Task<IEnumerable<T>> GetAllAsync(); // Retrieves all entities of type T
        Task<T> GetByIdAsync(Guid id); // Retrieves a single entity by its Guid ID
        Task<T> CreateAsync(T entity); // Creates a new entity
        Task<T> UpdateAsync(Guid id, T entity); // Updates an existing entity identified by its Guid ID
        Task<bool> DeleteAsync(Guid id); // Deletes an entity by its Guid ID
    }
}