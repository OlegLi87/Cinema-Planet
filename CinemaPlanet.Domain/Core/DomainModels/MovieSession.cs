using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class MovieSession
    {
        public MovieSession()
        {
            Orders = new HashSet<Order>();
        }
        public int Id { get; set; }

        [Display(Name = "Pick up Auditorium")]
        public int AuditoriumId { get; set; }
        public Auditorium Auditorium { get; set; }

        [Display(Name = "Pick up Movie")]
        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        [Display(Name = "Pick up Date")]
        public DateTime SessionDate { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public int GetAvailableSeatsLeft()
        {
            return Auditorium.GetSeatsCapacity() - Orders.Count;
        }
    }
}
