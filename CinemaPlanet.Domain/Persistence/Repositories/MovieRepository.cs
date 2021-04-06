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
    class MovieRepository : Repository<Movie>, IMovieRepository
    {
        public MovieRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Movie> GetAvailableMovies()
        {
            return context.Set<MovieSession>()
                 .Include(ms => ms.Movie)
                 .Where(ms => ms.Orders.Count < ms.Auditorium.BasicSeatsCapacity + ms.Auditorium.SilverSeatsCapacity + ms.Auditorium.GoldSeatsCapacity)
                 .Select(ms => ms.Movie)
                 .Distinct();
        }
    }
}
