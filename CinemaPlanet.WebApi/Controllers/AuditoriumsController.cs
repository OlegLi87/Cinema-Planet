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
            var auditoriums = unitOfWork.Auditoriums.Get().Select(audit => new
            {
                id = audit.Id,
                name = audit.Name,
                imageUrl = audit.ImageUrl,
                basicSeatsCapacity = audit.BasicSeatsCapacity,
                silverSeatsCapacity = audit.SilverSeatsCapacity,
                goldSeatsCapacity = audit.GoldSeatsCapacity,
                activeSessions = audit.MovieSessions.Count
            }).ToList();

            return Request.CreateResponse(HttpStatusCode.OK, auditoriums);
        }

        [HttpPost]
        [Route("api/admin/saveAuditorium")]
        public HttpResponseMessage SaveAuditorium(Auditorium auditorium)
        {
            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Provided data is invalid.");

            if (auditorium.Id == 0)
            {
                unitOfWork.Auditoriums.Add(auditorium);
                unitOfWork.Save();

                return Request.CreateResponse(HttpStatusCode.Created, auditorium);
            }
            var auditoriumInDb = unitOfWork.Auditoriums.GetById(auditorium.Id);
            if (auditoriumInDb == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Provided ID is invalid.");

            auditoriumInDb.Name = auditorium.Name;
            auditoriumInDb.ImageUrl = auditorium.ImageUrl;
            auditoriumInDb.BasicSeatsCapacity = auditorium.BasicSeatsCapacity;
            auditoriumInDb.SilverSeatsCapacity = auditorium.SilverSeatsCapacity;
            auditoriumInDb.GoldSeatsCapacity = auditorium.GoldSeatsCapacity;

            unitOfWork.Save();
            return Request.CreateResponse(HttpStatusCode.OK, auditorium);
        }

        [HttpDelete]
        [Route("api/admin/deleteAuditorium")]
        public HttpResponseMessage DeleteAuditorium(int id)
        {
            var auditorium = unitOfWork.Auditoriums.GetById(id);
            if (auditorium == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Provided ID is invalid ");

            unitOfWork.Auditoriums.Remove(auditorium);
            unitOfWork.Save();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
