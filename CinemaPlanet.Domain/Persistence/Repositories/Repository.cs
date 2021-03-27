using CinemaPlanet.Domain.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        DbContext context;
        public Repository(DbContext context)
        {
            this.context = context;
        }

        public T GetById(int id)
        {
            T entity = context.Set<T>().Find(id);
            if (entity == null) throw new ArgumentException();
            return entity;
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> predicate = null)
        {
            if (predicate == null) return context.Set<T>();
            return context.Set<T>().Where(predicate);
        }

        public void Add(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public void AddRange(ICollection<T> entities)
        {
            context.Set<T>().AddRange(entities);
        }

        public void Remove(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public void RemoveRange(ICollection<T> entities)
        {
            context.Set<T>().RemoveRange(entities);
        }
    }
}

