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
    class MovieSessionRepository : Repository<MovieSession>, IMovieSessionRepository
    {
        public MovieSessionRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<MovieSession> GetFilteredSessions(int auditoriumId, int movieId, DateTime date)
        {
            Expression<Func<MovieSession, bool>> byAuditExpression, byMovieExpression, byDateExpression;

            if (auditoriumId == 0)
                byAuditExpression = ms => true;
            else
                byAuditExpression = ms => ms.AuditoriumId == auditoriumId;

            if (movieId == 0)
                byMovieExpression = ms => true;
            else
                byMovieExpression = ms => ms.MovieId == movieId;

            if (date == new DateTime())
                byDateExpression = ms => true;
            else
                byDateExpression = ms => ms.SessionDate == date;

            return context.Set<MovieSession>()
                .Where(byAuditExpression)
                .Where(byMovieExpression)
                .Where(byDateExpression)
                .Include(ms => ms.Auditorium)
                .Include(ms => ms.Movie)
                .Include(ms => ms.Orders);
        }

        public IEnumerable<User> GetAllCustomersForSession(int id)
        {
            return GetById(id).Orders.Select(or => or.User);
        }
    }
}
