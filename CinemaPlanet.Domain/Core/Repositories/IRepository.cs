using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Core.Repositories
{
    public interface IRepository<T> where T : class
    {
        T GetById(int id);
        List<T> Get(Expression<Func<T, bool>> predicate = null);
        void Add(T entity);
        void AddRange(ICollection<T> entities);
        void Remove(T entity);
        void RemoveRange(ICollection<T> entities);

    }
}
