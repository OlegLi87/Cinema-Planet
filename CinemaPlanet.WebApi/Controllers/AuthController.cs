using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.DomainModels;
using CinemaPlanet.WebApi.Infastructure;
using CinemaPlanet.WebApi.Infastructure.Auth;
using CinemaPlanet.WebUI.Infastructure.Auth;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CinemaPlanet.WebApi.Controllers
{
    public class AuthController : ApiController
    {
        IUnitOfWork unitOfWork;

        public AuthController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        [HttpPost]
        public HttpResponseMessage SignUp(User newUser)
        {
            var userIndb = unitOfWork.Users.GetByCredentials(newUser.UserName);
            if (userIndb != null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Username allready exist.");

            newUser.Password = AuthUtils.GenerateBase64HashPassword(newUser.Password);
            unitOfWork.Users.Add(newUser);
            unitOfWork.Save();

            newUser = unitOfWork.Users.GetByCredentials(newUser.UserName); // Fetching user once again to get Role field se with value.
            var token = TokenManager.GenerateToken(newUser);
            newUser.JWTToken = token;
            unitOfWork.Save();

            return Request.CreateResponse(HttpStatusCode.Created, token);
        }

        [HttpGet]
        public HttpResponseMessage SignIn(User user)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Logged id.");
        }

        //public void SignOut()
        //{

        //}

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
