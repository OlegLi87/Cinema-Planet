using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.Repositories
{
    class JWTSecretRepository : Repository<JWTSecret>, IJWTSecretRepository
    {
        public JWTSecretRepository(DbContext context) : base(context)
        {

        }

        public string GetSecret(string name)
        {
            return context.Set<JWTSecret>().FirstOrDefault(secret => secret.Name == name).Secret;
        }
    }
}
