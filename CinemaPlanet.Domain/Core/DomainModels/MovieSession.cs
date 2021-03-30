using System.Collections.Generic;

namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class MovieSession
    {
        public MovieSession()
        {
            Orders = new HashSet<Order>();
        }
        public int Id { get; set; }
        public int AuditoriumId { get; set; }
        public Auditorium Auditorium { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public int GetAvailableSeatsLeft()
        {
            return Auditorium.GetSeatsCapacity() - Orders.Count;
        }
    }
}
