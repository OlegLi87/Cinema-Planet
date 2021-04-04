using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

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
        public virtual Auditorium Auditorium { get; set; }

        [Display(Name = "Pick up Movie")]
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }

        [Display(Name = "Pick up Date")]
        public DateTime SessionDate { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public byte GetOrderedSeatsNumber(SeatType seatType)
        {
            return (byte)Orders.Where(or => or.SeatType == seatType).Count();
        }

        public float GetExpectedRevenue()
        {
            var forBasicSeatsRevenue = Auditorium.BasicSeatsCapacity * Movie.BasicSeatPrice;
            var forSilverSeatsRevenue = Auditorium.SilverSeatsCapacity * Movie.SilverSeatPrice;
            var forGoldSeatsRevenue = Auditorium.GoldSeatsCapacity * Movie.GoldSeatPrice;

            return forBasicSeatsRevenue + forSilverSeatsRevenue + forGoldSeatsRevenue;
        }

        public float GetCurrentRevenue()
        {
            var forBasicSeatsRevenue = GetOrderedSeatsNumber(SeatType.Basic) * Movie.BasicSeatPrice;
            var forSilverSeatsRevenue = GetOrderedSeatsNumber(SeatType.Silver) * Movie.SilverSeatPrice;
            var forGoldSeatsRevenue = GetOrderedSeatsNumber(SeatType.Gold) * Movie.GoldSeatPrice;

            return forBasicSeatsRevenue + forSilverSeatsRevenue + forGoldSeatsRevenue;
        }

        public IEnumerable<User> GetSessionCustomers()
        {
            return Orders.Select(or => or.User);
        }

        public int GetAvailableSeatsLeft()
        {
            return Auditorium.GetSeatsCapacity() - Orders.Count;
        }
    }
}
