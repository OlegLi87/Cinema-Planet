using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.DomainModels;
using CinemaPlanet.WebUI.Infastructure;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaPlanet.WebUI.Controllers
{
    [Authorize(Roles = "User")]
    public class UserController : Controller
    {
        IUnitOfWork unitOfWork;
        public UserController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        // GET: User
        public ActionResult Index(string genre, int? year)
        {
            var availableMovies = unitOfWork.Movies.GetAvailableMovies().ToList();
            return View(availableMovies);
        }

        // POST: User/PlaceOrder
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ViewResult PlaceOrder(string date, string seatType, int movieId)
        {
            var userName = HttpContext.User.Identity.Name;
            var userId = unitOfWork.Users.GetByCredentials(userName).Id;
            var session = unitOfWork.MovieSessions.GetFilteredSessions(0, movieId, DateTime.Parse(date)).SingleOrDefault();
            var seatT = (SeatType)Enum.Parse(typeof(SeatType), seatType);
            var seatNumber = session.GetSeatNumber(seatT);

            if (seatNumber < 1 || seatNumber > byte.MaxValue)
                throw new ArgumentOutOfRangeException();

            var newOrder = new Order
            {
                MovieSessionId = session.Id,
                UserId = userId,
                SeatType = seatT,
                SeatNumber = seatNumber
            };

            unitOfWork.Orders.Add(newOrder);
            unitOfWork.Save();

            return View(newOrder.SeatNumber);
        }
    }
}