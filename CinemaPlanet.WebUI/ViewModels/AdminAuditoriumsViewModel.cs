using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CinemaPlanet.WebUI.ViewModels
{
    public class AdminAuditoriumsViewModel
    {
        public IEnumerable<Auditorium> Auditoriums { get; set; }
        public Auditorium Auditorium { get; set; }
    }
}