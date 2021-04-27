using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CinemaPlanet.WebApi.Dtos
{
    public class MovieSessionDto
    {
        public int Id { get; set; }

        public int AuditoriumId { get; set; }

        public string AuditoriumName { get; set; }

        public int MovieId { get; set; }

        public string MovieName { get; set; }

        public DateTime SessionDate { get; set; }

        public int OrdersAmount { get; set; }
    }
}