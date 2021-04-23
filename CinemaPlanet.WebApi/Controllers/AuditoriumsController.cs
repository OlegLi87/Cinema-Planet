using CinemaPlanet.Domain.Core.DomainModels;
using CinemaPlanet.Domain.Core;
using CinemaPlanet.WebApi.Infastructure.Auth;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using CinemaPlanet.WebApi.Infastructure;
using CinemaPlanet.WebApi.Dtos;

namespace CinemaPlanet.WebApi.Controllers
{
    [CustomAuthentication]
    [Authorize(Roles = "Admin")]
    [EnableCors(headers: "*", origins: "*", methods: "*")]
    public class AuditoriumsController : ApiController
    {
        IUnitOfWork unitOfWork;

        public AuditoriumsController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        [HttpGet]
        [Route("api/admin/getAuditoriums")]
        public HttpResponseMessage GetAuditoriums()
        {
            var auditoriumDtos = unitOfWork.Auditoriums.Get().Select(ApiUtils.MapToAuditoriumDto);
            return Request.CreateResponse(HttpStatusCode.OK, auditoriumDtos);
        }

        [HttpPost]
        [Route("api/admin/saveAuditorium")]
        public HttpResponseMessage SaveAuditorium(AuditoriumDto auditoriumDto)
        {
            if (!ModelState.IsValid || auditoriumDto == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["data"]);

            if (auditoriumDto.Id == 0)
            {
                var newAuditorium = ApiUtils.MapToAuditorium(new Auditorium(), auditoriumDto);
                unitOfWork.Auditoriums.Add(newAuditorium);
                unitOfWork.Save();

                return Request.CreateResponse(HttpStatusCode.Created, auditoriumDto);
            }

            var auditoriumInDb = unitOfWork.Auditoriums.GetById(auditoriumDto.Id);
            if (auditoriumInDb == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["id"]);

            ApiUtils.MapToAuditorium(auditoriumInDb, auditoriumDto);

            unitOfWork.Save();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("api/admin/deleteAuditorium")]
        public HttpResponseMessage DeleteAuditorium(int id)
        {
            var auditorium = unitOfWork.Auditoriums.GetById(id);
            if (auditorium == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ApiUtils.ErrorMessages["id"]);

            unitOfWork.Auditoriums.Remove(auditorium);
            unitOfWork.Save();

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
