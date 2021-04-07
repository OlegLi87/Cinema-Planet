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

        public IEnumerable<Movie> GetAvailableFilteredMovies(Genre? genre, int? releaseYear)
        {
            var availableMovies = context.Set<MovieSession>()
                 .Include(ms => ms.Movie)
                 .Where(ms => ms.Orders.Count < ms.Auditorium.BasicSeatsCapacity + ms.Auditorium.SilverSeatsCapacity + ms.Auditorium.GoldSeatsCapacity)
                 .Select(ms => ms.Movie)
                 .Distinct()
                 .ToList();

            Func<Movie, bool> genrePredicate, yearPredicate;

            if (genre == null)
                genrePredicate = m => true;
            else
                genrePredicate = m => m.Genre == genre;

            if (releaseYear == null)
                yearPredicate = m => true;
            else
                yearPredicate = m => m.ReleaseDate.Year == releaseYear;

            var filteredMovie = availableMovies
                                  .Where(genrePredicate)
                                  .Where(yearPredicate);

            return filteredMovie;
        }
    }
}
