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
            var totalAuditoriums = unitOfWork.Auditoriums.Get().Count();
            var totalMovies = unitOfWork.Movies.Get().Count();
            var totalSessions = unitOfWork.MovieSessions.Get().Count();
            var totalOrders = unitOfWork.Orders.Get().Count();
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
            var auditViewModel = new AdminSectionGenericViewModel<Auditorium>
            {
                Entities = auditoriums,

                // will be used within creation form.
                // The name of property should be the same as name of SaveAuditorium action parameter for auto binding.
                Entity = new Auditorium()
            };
            return View(auditViewModel);
        }

        // GET: Admin/EditAuditorium/id
        public ActionResult EditAuditorium(int id)
        {
            var auditorium = unitOfWork.Auditoriums.GetById(id);
            if (auditorium == null) return HttpNotFound();

            var auditViewModel = new AdminSectionGenericViewModel<Auditorium> { Entity = auditorium };
            return View(auditViewModel);
        }

        // POST: Admin/SaveAuditorium
        [HttpPost]
        [ValidateAntiForgeryToken]
        public RedirectToRouteResult SaveAuditorium(Auditorium entity)
        {
            if (entity.Id == 0)
                unitOfWork.Auditoriums.Add(entity);
            else
            {
                var auditoriumInDb = unitOfWork.Auditoriums.GetById(entity.Id);
                auditoriumInDb.Name = entity.Name;
                auditoriumInDb.ImageUrl = entity.ImageUrl;
                auditoriumInDb.BasicSeatsCapacity = entity.BasicSeatsCapacity;
                auditoriumInDb.SilverSeatsCapacity = entity.SilverSeatsCapacity;
                auditoriumInDb.GoldSeatsCapacity = entity.GoldSeatsCapacity;
            }

            unitOfWork.Save();
            return RedirectToAction("Auditoriums");
        }

        // POST: Admin/DeleteAuditorium/id
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteAuditorium(int id)
        {
            var auditorium = unitOfWork.Auditoriums.GetById(id);
            if (auditorium == null) return HttpNotFound();

            unitOfWork.Auditoriums.Remove(auditorium);
            unitOfWork.Save();
            return RedirectToAction("Auditoriums");
        }
        #endregion

        #region Movies section
        // GET : Admin/Movies
        public ViewResult Movies()
        {
            var movies = unitOfWork.Movies.Get();
            var moviesViewModel = new AdminSectionGenericViewModel<Movie>
            {
                Entities = movies,
                Entity = new Movie(),
                Genres = Enum.GetNames(typeof(Genre))
            };

            return View(moviesViewModel);
        }

        // GET: Admin/EditMovie/id
        public ActionResult EditMovie(int id)
        {
            var movie = unitOfWork.Movies.GetById(id);
            if (movie == null) return HttpNotFound();

            var moviesViewModel = new AdminSectionGenericViewModel<Movie>
            {
                Entity = movie,
                Genres = Enum.GetNames(typeof(Genre))
            };

            return View(moviesViewModel);
        }

        // POST: Admin/SaveMovie
        [HttpPost]
        [ValidateAntiForgeryToken]
        public RedirectToRouteResult SaveMovie(Movie entity)
        {
            if (entity.Id == 0)
                unitOfWork.Movies.Add(entity);
            else
            {
                var movieInDb = unitOfWork.Movies.GetById(entity.Id);
                movieInDb.Name = entity.Name;
                movieInDb.ImageUrl = entity.ImageUrl;
                movieInDb.Description = entity.Description;
                movieInDb.ReleaseDate = entity.ReleaseDate;
                movieInDb.Genre = entity.Genre;
                movieInDb.BasicSeatPrice = entity.BasicSeatPrice;
                movieInDb.SilverSeatPrice = entity.SilverSeatPrice;
                movieInDb.GoldSeatPrice = entity.GoldSeatPrice;
            }

            unitOfWork.Save();
            return RedirectToAction("Movies");
        }

        // POST: Admin/DeleteMovie/id
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteMovie(int id)
        {
            var movie = unitOfWork.Movies.GetById(id);
            if (movie == null) return HttpNotFound();

            unitOfWork.Movies.Remove(movie);
            unitOfWork.Save();

            return RedirectToAction("Movies");
        }

        #endregion

        //GET: Admin/Sessions
        public ViewResult Sessions()
        {
            var auditoriums = unitOfWork.Auditoriums.Get();
            var movies = unitOfWork.Movies.Get();
            var movieSessionsViewModel = new AdminMovieSessionsViewModel
            {
                Auditoriums = auditoriums,
                Movies = movies,
                MovieSession = new MovieSession()
            };

            return View(movieSessionsViewModel);
        }

        // POST: Admin/SaveSession
        [HttpPost]
        [ValidateAntiForgeryToken]
        public RedirectToRouteResult SaveSession(MovieSession movieSession)
        {
            if (movieSession.Id == 0)
                unitOfWork.MovieSessions.Add(movieSession);

            unitOfWork.Save();
            return RedirectToAction("Sessions");
        }

        // POST: Admin/SessionsList
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ViewResult SessionsList(MovieSession movieSession)
        {
            var filteredMovieSessions = unitOfWork.MovieSessions
                .GetFilteredSessions(movieSession.AuditoriumId, movieSession.MovieId, movieSession.SessionDate);

            return View(filteredMovieSessions);
        }

        // POST: Admin/DeleteSession/id
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteSession(int id)
        {
            var session = unitOfWork.MovieSessions.GetById(id);
            if (session == null) return HttpNotFound();

            unitOfWork.MovieSessions.Remove(session);
            unitOfWork.Save();

            return RedirectToAction("Sessions");
        }

        // GET: Admin/Customers/id
        public ActionResult Customers(int id)
        {
            var session = unitOfWork.MovieSessions.GetById(id);
            if (session == null) return HttpNotFound();

            var customers = session.GetSessionCustomers();

            return View(customers);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}