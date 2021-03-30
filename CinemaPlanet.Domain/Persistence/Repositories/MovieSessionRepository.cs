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
    class MovieSessionRepository : Repository<MovieSession>, IMovieSessionRepository
    {
        public MovieSessionRepository(DbContext context) : base(context)
        {
        }

        public List<MovieSession> GetAvailableSessions()
        {
            var mss = context.Set<MovieSession>()
                .Include(ms => ms.Auditorium)
                .Include(ms => ms.Movie)
                .Include(ms => ms.Orders)
                .ToList();

            return mss.Where(ms => ms.GetAvailableSeatsLeft() > 0).ToList();
        }
    }
}
