using System.Collections.Generic;

namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class Auditorium
    {
        public Auditorium()
        {
            MovieSessions = new HashSet<MovieSession>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public byte BasicSeatsCapacity { get; set; }
        public byte SilverSeatsCapacity { get; set; }
        public byte GoldSeatsCapacity { get; set; }
        public virtual ICollection<MovieSession> MovieSessions { get; set; }
    }
}
