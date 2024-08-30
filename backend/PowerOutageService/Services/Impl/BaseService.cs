using Microsoft.EntityFrameworkCore;
using PowerOutageService.Services.Contracts;
using PowerOutageService.Enteties.Contracts;

namespace PowerOutageService.Services
{
    public class BaseService<T> : IBaseService<T> where T : class, IEntity
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        public BaseService(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        // Retrieves all entities
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        // Retrieves a single entity by its Guid ID
        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(e => e.Id == id);
        }

        // Creates a new entity
        public async Task<T> CreateAsync(T entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            entity.Id = Guid.NewGuid(); // Ensure new ID is generated
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        // Updates an existing entity identified by its Guid ID
        public async Task<T> UpdateAsync(Guid id, T entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var existingEntity = await GetByIdAsync(id);
            if (existingEntity == null)
            {
                throw new KeyNotFoundException("Entity not found.");
            }

            _context.Entry(existingEntity).CurrentValues.SetValues(entity); // Update only the existing entity's values
            await _context.SaveChangesAsync();
            return existingEntity;
        }

        // Deletes an entity by its Guid ID
        public async Task<bool> DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);

            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}