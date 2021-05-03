using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.DomainModels;
using CinemaPlanet.WebApi.Dtos;
using CinemaPlanet.WebApi.Infastructure;
using CinemaPlanet.WebApi.Infastructure.Auth;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CinemaPlanet.WebApi.Controllers
{
    [CustomAuthentication]
    [EnableCors(headers: "*", origins: "*", methods: "*")]
    [Authorize(Roles = "User")]
    public class UserController : ApiController
    {
        IUnitOfWork unitOfWork;

        public UserController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        [HttpGet]
        [Route("api/user/getMovies")]
        public HttpResponseMessage GetMovies()
        {
            var movies = unitOfWork.MovieSessions.Get()
                                   .Where(ms => ms.IsSessionAvailbale())
                                   .Select(ms => ms.Movie)
                                   .Distinct()
                                   .Select(m => ApiUtils.MapToMovieDto(m));

            return Request.CreateResponse(HttpStatusCode.OK, movies);
        }

        [HttpGet]
        [Route("api/user/getAvailableMovieSessions")]
        public HttpResponseMessage GetAvailableMovieSessions(int id) // movieId
        {
            var movie = unitOfWork.Movies.GetById(id);
            if (movie == null) return Request.CreateResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["id"]);


            var movieSessionsDto = unitOfWork.MovieSessions.Get(ms => ms.MovieId == id)
                                                         .Where(ms => ms.IsSessionAvailbale())
                                                         .Select(ms => ApiUtils.MapToMovieSessionDto(ms));

            return Request.CreateResponse(HttpStatusCode.OK, movieSessionsDto);
        }

        [HttpGet]
        [Route("api/user/getAvailableSeatTypes")]
        public HttpResponseMessage GetAvailableSeatTypes(int id) // movieSessionId
        {
            var movieSession = unitOfWork.MovieSessions.GetById(id);
            if (movieSession == null) return Request.CreateResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["id"]);

            string[] availableSeatTypes = new string[3];
            int i = 0;

            foreach (SeatType sType in Enum.GetValues(typeof(SeatType)))
                if (movieSession.IsSeatTypeAvailable(sType)) availableSeatTypes[i++] = sType.ToString();


            return Request.CreateResponse(HttpStatusCode.OK, availableSeatTypes);
        }

        [HttpGet]
        [Route("api/user/getOrders")]
        public HttpResponseMessage GetOrders()
        {
            var userName = RequestContext.Principal.Identity.Name;
            var user = unitOfWork.Users.GetByCredentials(userName);

            var ordersDto = user.Orders.Select(order => ApiUtils.MapToOrderDto(order));

            return Request.CreateResponse(HttpStatusCode.OK, ordersDto);
        }

        [HttpPost]
        [Route("api/user/saveOrder")]
        public HttpResponseMessage saveOrder(OrderDto orderDto)
        {
            if (orderDto.MovieSessionId < 1
                || Enum.GetNames(typeof(SeatType)).FirstOrDefault(st => st == orderDto.SeatType) == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["data"]);

            var userName = RequestContext.Principal.Identity.Name;
            var user = unitOfWork.Users.GetByCredentials(userName);

            orderDto.UserId = user.Id;
            var movieSession = unitOfWork.MovieSessions.GetById(orderDto.MovieSessionId);

            var order = ApiUtils.MapToOrder(new Order(), orderDto, movieSession);
            unitOfWork.Orders.Add(order);
            unitOfWork.Save();

            orderDto.Id = order.Id;
            orderDto.SeatNumber = order.SeatNumber;
            orderDto.SessionDate = movieSession.SessionDate;

            return Request.CreateResponse(HttpStatusCode.OK, orderDto);

        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
