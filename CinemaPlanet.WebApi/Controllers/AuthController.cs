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
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Cors;

namespace CinemaPlanet.WebApi.Controllers
{
    [EnableCors(headers: "*", origins: "*", methods: "*")]
    public class AuthController : ApiController
    {
        IUnitOfWork unitOfWork;

        public AuthController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        [HttpPost]
        [Route("api/auth/signup")]
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

        [HttpPost]
        [Route("api/auth/signin")]
        public HttpResponseMessage SignIn(User user)
        {
            var hashedPasword = AuthUtils.GenerateBase64HashPassword(user.Password);
            var userInDb = unitOfWork.Users.GetByCredentials(user.UserName, hashedPasword);
            if (userInDb == null)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Credentials are invalid.");

            var token = TokenManager.GenerateToken(userInDb);
            userInDb.JWTToken = token;
            unitOfWork.Save();
            return Request.CreateResponse(HttpStatusCode.OK, token);
        }

        [HttpGet]
        [CustomAuthentication]
        [Route("api/auth/signout")]
        public HttpResponseMessage SignOut()
        {
            string token = Request.Headers.Authorization.Parameter;
            TokenManager.RemoveToken(token);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [CustomAuthentication]
        [Route("api/auth/validateToken")]
        public HttpResponseMessage ValidateToken()
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}
