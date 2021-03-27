using CinemaPlanet.Domain.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Core
{
    public interface IUnitOfWork : IDisposable
    {
        IAuditoriumRepository Auditoriums { get; }
        IMovieRepository Movies { get; }
        IMovieSessionRepository MovieSessions { get; }
        IClientRepository Clients { get; }
        IOrderRepository Orders { get; }
        void Save();
    }
}
