using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaPlanet.WebUI.Controllers
{
    [ChildActionOnly]
    public class NavigationController : Controller
    {
        public PartialViewResult NavigationContent(string callingAction)
        {
            if (HttpContext.User.IsInRole("Admin"))
            {
                ViewBag.CallingAction = callingAction;
                return PartialView("_AdminNavigation");
            }

            return PartialView("_UserNavigation");
        }

        public PartialViewResult NavTabsContent(string callingAction)
        {
            ViewBag.CallingAction = callingAction;
            return PartialView("_NavTabs");
        }
    }
}