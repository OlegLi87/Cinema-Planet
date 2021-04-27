using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.DomainModels;
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
using CinemaPlanet.WebApi.Dtos;

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
            var movieDtos = unitOfWork.Movies.Get().Select(ApiUtils.MapToMovieDto);
            return Request.CreateResponse(HttpStatusCode.OK, movieDtos);
        }

        [HttpPost]
        [Route("api/admin/saveMovie")]
        public HttpResponseMessage SaveMovie(MovieDto movieDto)
        {
            if (!ModelState.IsValid || movieDto == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["data"]);

            if (movieDto.Id == 0)
            {
                var newMovie = ApiUtils.MapToMovie(new Movie(), movieDto);
                unitOfWork.Movies.Add(newMovie);
                unitOfWork.Save();
                return Request.CreateResponse(HttpStatusCode.Created, movieDto);
            }

            var movieInDb = unitOfWork.Movies.GetById(movieDto.Id);
            if (movieInDb == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["id"]);

            ApiUtils.MapToMovie(movieInDb, movieDto);
            unitOfWork.Save();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("api/admin/deleteMovie")]
        public HttpResponseMessage DeleteMovie(int id)
        {
            var movieInDb = unitOfWork.Movies.GetById(id);
            if (movieInDb == null) return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["id"]);

            unitOfWork.Movies.Remove(movieInDb);
            unitOfWork.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        [HttpGet]
        [Route("api/admin/getGenres")]
        public HttpResponseMessage GetGenres()
        {
            var genres = Enum.GetNames(typeof(Genre));
            return Request.CreateResponse(HttpStatusCode.OK, genres);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
