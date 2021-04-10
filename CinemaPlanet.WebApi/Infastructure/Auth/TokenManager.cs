using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Core.DomainModels;
using Microsoft.IdentityModel.Tokens;
using Ninject;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace CinemaPlanet.WebApi.Infastructure.Auth
{
    public static class TokenManager
    {
        const string SECRET_NAME = "API_SECRET";

        public static string GenerateToken(User user)
        {
            var secret = getSecretKey();

            byte[] secretBytes = Convert.FromBase64String(secret);
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(secretBytes);
            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.UserName), new Claim(ClaimTypes.Role, user.Role.Name) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.CreateJwtSecurityToken(descriptor);
            return handler.WriteToken(token);
        }

        public static ClaimsPrincipal GetPrincipal(string token)
        {
            var secret = getSecretKey();

            try
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken jwtToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
                if (jwtToken == null)
                    return null;

                byte[] key = Convert.FromBase64String(secret);

                TokenValidationParameters validationParams = new TokenValidationParameters
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                SecurityToken securityToken;
                ClaimsPrincipal principal = tokenHandler.ValidateToken(token, validationParams, out securityToken);
                return principal;
            }
            catch
            {
                return null;
            }
        }

        public static bool IsValidToken(string token)
        {
            ClaimsPrincipal principal = GetPrincipal(token);
            if (principal == null)
                return false;

            ClaimsIdentity identity = null;
            try
            {
                identity = (ClaimsIdentity)principal.Identity;
            }
            catch
            {
                return false;
            }

            Claim usernNameClaim = identity.FindFirst(ClaimTypes.Name);
            string username = usernNameClaim.Value;

            IKernel kernel = new StandardKernel(new NinjectBinding());
            IUnitOfWork unitOfWork = kernel.Get<IUnitOfWork>();

            var user = unitOfWork.Users.GetByCredentials(username);
            unitOfWork.Dispose();

            if (user == null || user.JWTToken != token)
                return false;

            return true;
        }

        static string getSecretKey()
        {
            IKernel kernel = new StandardKernel(new NinjectBinding());
            IUnitOfWork unitOfWork = kernel.Get<IUnitOfWork>();
            var secret = unitOfWork.JWTSecrets.GetSecret(SECRET_NAME);
            unitOfWork.Dispose();
            return secret;
        }
    }
}