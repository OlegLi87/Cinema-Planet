using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CinemaPlanet.WebUI.ViewModels
{
    public struct AdminIndexViewModel
    {
        public int Auditoriums { get; set; }
        public int Movies { get; set; }
        public int Sessions { get; set; }
        public int Orders { get; set; }
        public int Users { get; set; }
    }
}