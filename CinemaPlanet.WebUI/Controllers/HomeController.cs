using CinemaPlanet.Domain.Core;
using CinemaPlanet.WebUI.Infastructure;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CinemaPlanet.WebUI.Controllers
{
    public class HomeController : Controller
    {
        IUnitOfWork unitOfWork;
        public HomeController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        // GET: Home
        public ActionResult Index()
        {
            if (!User.Identity.IsAuthenticated) return RedirectToAction("SignIn", "Login");
            if (User.IsInRole("Admin")) return View();

            var ms = unitOfWork.MovieSessions.GetAvailableSessions();
            return View("UserMainPage");
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}