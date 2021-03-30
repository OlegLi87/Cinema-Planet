using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Core.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User GetByCredentials(string username, string password = null);
    }
}
