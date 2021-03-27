using System;
using System.Collections.Generic;

namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class Client
    {
        public Client()
        {
            Orders = new HashSet<Order>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
