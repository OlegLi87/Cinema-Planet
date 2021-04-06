using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CinemaPlanet.WebUI.ViewModels
{
    public class AdminMovieSessionsViewModel
    {
        public IEnumerable<Auditorium> Auditoriums { get; set; }
        public IEnumerable<Movie> Movies { get; set; }
        public MovieSession MovieSession { get; set; }
    }
}