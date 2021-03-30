using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using CinemaPlanet.Domain.Core.DomainModels;
using System.Web.Security;

namespace CinemaPlanet.WebUI.Infastructure.Auth
{
    public static class AuthUtils
    {
        public static string GenerateBase64HashPassword(string password)
        {
            using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider())
            {
                UTF8Encoding utf8 = new UTF8Encoding();
                byte[] generatedHash = md5.ComputeHash(utf8.GetBytes(password));
                return Convert.ToBase64String(generatedHash);
            }
        }

        public static HttpCookie GenerateCookie(User user)
        {
            var ticket = new FormsAuthenticationTicket(user.UserName, true, 1000);
            var encryptedTicket = FormsAuthentication.Encrypt(ticket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            cookie.Expires = DateTime.Now.AddHours(100);
            cookie.HttpOnly = true;
            return cookie;
        }
    }
}