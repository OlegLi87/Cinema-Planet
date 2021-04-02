using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.DomainModels;
using CinemaPlanet.WebUI.Infastructure;
using CinemaPlanet.WebUI.ViewModels;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaPlanet.WebUI.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        IUnitOfWork unitOfWork;
        public AdminController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        // GET: Admin
        public ViewResult Index()
        {
            var totalAuditoriums = unitOfWork.Auditoriums.Get().Count;
            var totalMovies = unitOfWork.Movies.Get().Count;
            var totalSessions = unitOfWork.MovieSessions.Get().Count;
            var totalOrders = unitOfWork.MovieSessions.Get().Count;
            var totalUsers = unitOfWork.Users.Get().Where(u => u.RoleId != 2).Count(); // Admin role is not counted.

            var overallStatistics = new AdminIndexViewModel
            {
                Auditoriums = totalAuditoriums,
                Movies = totalMovies,
                Sessions = totalSessions,
                Orders = totalOrders,
                Users = totalUsers
            };

            return View(overallStatistics);
        }

        #region Auditoriums section
        // GET: Admin/Auditoriums
        public ViewResult Auditoriums()
        {
            var auditoriums = unitOfWork.Auditoriums.Get();
            var auditViewModel = new AdminAuditoriumsViewModel
            {
                Auditoriums = auditoriums,

                // will be used within creation form.
                // The name of property should be the same as name of SaveAuditorium action parameter for auto binding.
                Auditorium = new Auditorium()
            };
            return View(auditViewModel);
        }

        // GET: Admin/EditAuditorium/id
        public ViewResult EditAuditorium(int id)
        {
            var auditorium = unitOfWork.Auditoriums.GetById(id);
            var auditViewModel = new AdminAuditoriumsViewModel { Auditorium = auditorium };
            return View(auditViewModel);
        }

        // POST: Admin/SaveAuditorium
        [HttpPost]
        [ValidateAntiForgeryToken]
        public RedirectToRouteResult SaveAuditorium(Auditorium auditorium)
        {
            if (auditorium.Id == 0)
                unitOfWork.Auditoriums.Add(auditorium);
            else
            {
                var auditoriumInDb = unitOfWork.Auditoriums.GetById(auditorium.Id);
                auditoriumInDb.Name = auditorium.Name;
                auditoriumInDb.ImageUrl = auditorium.ImageUrl;
                auditoriumInDb.BasicSeatsCapacity = auditorium.BasicSeatsCapacity;
                auditoriumInDb.SilverSeatsCapacity = auditorium.SilverSeatsCapacity;
                auditoriumInDb.GoldSeatsCapacity = auditorium.GoldSeatsCapacity;
            }

            unitOfWork.Save();
            return RedirectToAction("Auditoriums");
        }

        // POST: Admin/DeleteAuditorium
        [HttpPost]
        [ValidateAntiForgeryToken]
        public RedirectToRouteResult DeleteAuditorium(int id)
        {
            var auditorium = unitOfWork.Auditoriums.GetById(id);
            unitOfWork.Auditoriums.Remove(auditorium);
            unitOfWork.Save();
            return RedirectToAction("Auditoriums");
        }
        #endregion

        // GET : Admin/Movies
        public ViewResult Movies()
        {
            return View();
        }

        public ViewResult Sessions()
        {
            return View();
        }

        public ViewResult Orders()
        {
            return View();
        }

        public ViewResult Users()
        {
            return View();
        }
    }
}