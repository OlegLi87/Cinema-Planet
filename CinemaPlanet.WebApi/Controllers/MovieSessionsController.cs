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
    [Authorize(Roles = "Admin")]
    public class MovieSessionsController : ApiController
    {
        IUnitOfWork unitOfWork;

        public MovieSessionsController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        [HttpGet]
        [Route("api/admin/getMovieSessions")]
        public HttpResponseMessage GetMovieSessions()
        {
            var movieSessionDtos = unitOfWork.MovieSessions.Get()
                .Select(ms => ApiUtils.MapToMovieSessionDto(ms));

            return Request.CreateResponse(HttpStatusCode.OK, movieSessionDtos);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
