using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CinemaPlanet.WebApi.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int MovieSessionId { get; set; }
        public int UserId { get; set; }
        public int SeatNumber { get; set; }
        public string SeatType { get; set; }
        public string MovieName { get; set; }
        public string AuditoriumName { get; set; }
        public DateTime SessionDate { get; set; }
    }
}