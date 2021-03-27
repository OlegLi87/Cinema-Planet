using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.Repositories;
using CinemaPlanet.Domain.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        CinemaPlanetContext context;
        public IAuditoriumRepository Auditoriums { get; private set; }
        public IMovieRepository Movies { get; private set; }
        public IMovieSessionRepository MovieSessions { get; private set; }
        public IClientRepository Clients { get; private set; }
        public IOrderRepository Orders { get; private set; }

        public UnitOfWork(CinemaPlanetContext context)
        {
            this.context = context;
            Auditoriums = new AuditoriumRepository(context);
            Movies = new MovieRepository(context);
            MovieSessions = new MovieSessionRepository(context);
            Clients = new ClientRepository(context);
            Orders = new OrderRepository(context);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
