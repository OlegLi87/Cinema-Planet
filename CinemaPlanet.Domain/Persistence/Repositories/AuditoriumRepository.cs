using CinemaPlanet.Domain.Core.DomainModels;
using CinemaPlanet.Domain.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.Repositories
{
    class AuditoriumRepository : Repository<Auditorium>, IAuditoriumRepository
    {
        public AuditoriumRepository(DbContext context) : base(context)
        {
        }
    }
}
