using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.DomainModels;
using CinemaPlanet.WebUI.Infastructure;
using CinemaPlanet.WebUI.Infastructure.Auth;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace CinemaPlanet.WebUI.Controllers
{
    public class LoginController : Controller
    {
        IUnitOfWork unitOfWork;
        public LoginController()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        // GET: Login
        public ActionResult SignUp()
        {
            return View("LoginForm");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SignUp(User user)
        {
            if (ModelState.IsValid)
            {
                var userInDb = unitOfWork.Users.GetByCredentials(user.UserName);
                if (userInDb != null)
                {
                    ModelState.AddModelError("UserName", "User Name allready exist.");
                    return View("LoginForm");
                }

                var newUser = new User
                {
                    UserName = user.UserName,
                    Password = AuthUtils.GenerateBase64HashPassword(user.Password),
                    BirthDate = user.BirthDate
                };

                var cookie = AuthUtils.GenerateCookie(newUser);
                Response.Cookies.Add(cookie);

                unitOfWork.Users.Add(newUser);
                unitOfWork.Save();
                ModelState.Clear();
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        public ActionResult SignIn()
        {
            return View("LoginForm", new User());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SignIn(User user)
        {
            if (ModelState.IsValid)
            {
                var base64Password = AuthUtils.GenerateBase64HashPassword(user.Password);
                var userInDb = unitOfWork.Users.GetByCredentials(user.UserName, base64Password);
                if (userInDb != null)
                {
                    var cookie = AuthUtils.GenerateCookie(user);
                    Response.Cookies.Add(cookie);
                    return RedirectToAction("Index", "Home");
                }
                ViewBag.ErrorMessage = "Provided credentials are wrong.";
            }
            return View("LoginForm", user);
        }

        public RedirectToRouteResult SignOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }

        protected override void Dispose(bool disposing)
        {
            unitOfWork.Dispose();
        }
    }
}