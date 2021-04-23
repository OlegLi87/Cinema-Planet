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
using System.Web.Http.Cors;

namespace CinemaPlanet.WebApi.Controllers
{
    [CustomAuthentication]
    [Authorize(Roles = "Admin")]
    [EnableCors(headers: "*", origins: "*", methods: "*")]
    public class AdminController : ApiController
    {
        IUnitOfWork unitOfWork;

        public AdminController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        [HttpGet]
        [Route("api/admin/getOverallStat")]
        public HttpResponseMessage GetOverallStat()
        {
            var totalAuditoriums = unitOfWork.Auditoriums.Get().Count;
            var totalMovies = unitOfWork.Movies.Get().Count;
            var totalMovieSessions = unitOfWork.MovieSessions.Get().Count;
            var totalUsers = unitOfWork.Users.Get().Where(u => u.RoleId != 2).Count();

            var overallStat = new
            {
                totalAuditoriums = totalAuditoriums,
                totalMovies = totalMovies,
                totalMovieSessions = totalMovieSessions,
                totalUsers = totalUsers
            };

            return Request.CreateResponse(HttpStatusCode.OK, overallStat);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
