using CinemaPlanet.WebApi.Infastructure.Auth;
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
    public class AdminController : ApiController
    {
        public string Get()
        {
            return ControllerContext.RequestContext.Principal.Identity.Name;

        }
    }
}
