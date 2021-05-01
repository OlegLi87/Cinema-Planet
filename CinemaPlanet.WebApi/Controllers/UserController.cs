using CinemaPlanet.Domain.Core;
using CinemaPlanet.WebApi.Infastructure;
using CinemaPlanet.WebApi.Infastructure.Auth;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CinemaPlanet.WebApi.Controllers
{
    [CustomAuthentication]
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
                .Select(ms => ms.Movie);

            return Request.CreateResponse(HttpStatusCode.OK, movies);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
