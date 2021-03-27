﻿namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class Order
    {
        public int Id { get; set; }
        public SeatType SeatType { get; set; }
        public byte SeatNumber { get; set; }
        public int MovieSessionId { get; set; }
        public MovieSession MovieSession { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}
