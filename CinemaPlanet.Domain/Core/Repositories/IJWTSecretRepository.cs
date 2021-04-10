using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Core.Repositories
{
    public interface IJWTSecretRepository : IRepository<JWTSecret>
    {
        string GetSecret(string name);
    }
}
