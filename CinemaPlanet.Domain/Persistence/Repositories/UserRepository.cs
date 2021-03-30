using CinemaPlanet.Domain.Core.DomainModels;
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
    class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }

        public User GetByCredentials(string username, string password = null)
        {
            Expression<Func<User, bool>> predicate;

            if (!String.IsNullOrEmpty(password))
                predicate = u => u.UserName == username && u.Password == password;
            else predicate = u => u.UserName == username;

            return context.Set<User>().Include(u => u.Role).FirstOrDefault(predicate);
        }

        public override void Add(User user)
        {
            user.RoleId = 1; // Regular user by default.
            context.Set<User>().Add(user);
        }
    }
}
