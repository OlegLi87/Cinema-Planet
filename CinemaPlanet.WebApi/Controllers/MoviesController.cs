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
    public class MoviesController : ApiController
    {
        IUnitOfWork unitOfWork;

        public MoviesController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        [HttpGet]
        [Route("api/admin/getMovies")]
        public HttpResponseMessage GetMovies()
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
