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

        [HttpPost]
        [Route("api/admin/saveMovieSession")]
        public HttpResponseMessage SaveMovieSession(MovieSessionDto movieSessionDto)
        {
            if (!ModelState.IsValid)
                return Request.CreateResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["data"]);

            if (movieSessionDto.Id == 0)
            {
                var newMovieSession = ApiUtils.MapToMovieSession(new MovieSession(), movieSessionDto);
                unitOfWork.MovieSessions.Add(newMovieSession);
                unitOfWork.Save();
                return Request.CreateResponse(HttpStatusCode.Created, movieSessionDto);
            }

            var movieSessionInDb = unitOfWork.MovieSessions.GetById(movieSessionDto.Id);
            if (movieSessionInDb == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["id"]);

            ApiUtils.MapToMovieSession(movieSessionInDb, movieSessionDto);
            unitOfWork.Save();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("api/admin/deleteMovieSession")]
        public HttpResponseMessage DeleteMovieSession(int id)
        {
            var movieSessionInDb = unitOfWork.MovieSessions.GetById(id);
            if (movieSessionInDb == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["id"]);

            unitOfWork.MovieSessions.Remove(movieSessionInDb);
            unitOfWork.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);

        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
