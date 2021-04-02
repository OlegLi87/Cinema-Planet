using System.Web.Mvc;

namespace CinemaPlanet.WebUI.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public RedirectToRouteResult Index()
        {
            if (!User.Identity.IsAuthenticated) return RedirectToAction("SignIn", "Login");
            if (User.IsInRole("Admin")) return RedirectToAction("Index", "Admin");
            return RedirectToAction("Index", "User");
        }
    }
}