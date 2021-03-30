using System;
using System.Collections.Generic;

namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class Movie
    {
        public Movie()
        {
            MovieSessions = new HashSet<MovieSession>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime ReleaseDate { get; set; }
        public Genre Genre { get; set; }
        public float BasicSeatPrice { get; set; }
        public float SilverSeatPrice { get; set; }
        public float GoldSeatPrice { get; set; }
        public virtual ICollection<MovieSession> MovieSessions { get; set; }
    }
}
