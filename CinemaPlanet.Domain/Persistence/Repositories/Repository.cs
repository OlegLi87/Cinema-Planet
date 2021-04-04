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
        protected DbContext context;
        public Repository(DbContext context)
        {
            this.context = context;
        }

        public virtual T GetById(int id)
        {
            T entity = context.Set<T>().Find(id);
            return entity;
        }

        public virtual List<T> Get(Expression<Func<T, bool>> predicate = null)
        {
            if (predicate == null) return context.Set<T>().ToList();
            return context.Set<T>().Where(predicate).ToList();
        }

        public virtual void Add(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public virtual void AddRange(ICollection<T> entities)
        {
            context.Set<T>().AddRange(entities);
        }

        public virtual void Remove(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public virtual void RemoveRange(ICollection<T> entities)
        {
            context.Set<T>().RemoveRange(entities);
        }
    }
}

