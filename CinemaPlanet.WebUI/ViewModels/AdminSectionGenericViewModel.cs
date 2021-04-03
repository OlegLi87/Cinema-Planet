using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CinemaPlanet.WebUI.ViewModels
{
    public class AdminSectionGenericViewModel<T>
    {
        public IEnumerable<T> Entities { get; set; }
        public T Entity { get; set; }
        public string[] Genres { get; set; }
    }
}