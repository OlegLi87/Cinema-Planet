using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace CinemaPlanet.WebApi.Infastructure.Auth
{
    public class CustomAuthenticationAttribute : FilterAttribute, IAuthenticationFilter
    {
        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            string authParameter = string.Empty;
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authHeader = request.Headers.Authorization;

            if (authHeader == null)
            {
                context.ErrorResult = new AuthenticationErrorResult
                {
                    ErrorMessage = "Missing Authorization Header.",
                    Request = request
                };
                return;
            }
            if (authHeader.Scheme != "Bearer")
            {
                context.ErrorResult = new AuthenticationErrorResult
                {
                    ErrorMessage = "Invalid Authorization Schema.",
                    Request = request
                };
                return;
            }
            if (string.IsNullOrEmpty(authHeader.Parameter))
            {
                context.ErrorResult = new AuthenticationErrorResult
                {
                    ErrorMessage = "Token is missing.",
                    Request = request
                };
                return;
            }
            if (!TokenManager.IsValidToken(authHeader.Parameter))
            {
                context.ErrorResult = new AuthenticationErrorResult
                {
                    ErrorMessage = "Invalid Token.",
                    Request = request
                };
                return;
            }

            context.Principal = TokenManager.GetPrincipal(authHeader.Parameter);
        }

        public async Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            HttpResponseMessage responseMsg = await context.Result.ExecuteAsync(cancellationToken);
            if (responseMsg.StatusCode == HttpStatusCode.Unauthorized)
                responseMsg.Headers.WwwAuthenticate.Add(new AuthenticationHeaderValue("Basic", "realm=localhost"));

            context.Result = new ResponseMessageResult(responseMsg);
        }

        public class AuthenticationErrorResult : IHttpActionResult
        {
            public string ErrorMessage { get; set; }
            public HttpRequestMessage Request { get; set; }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                return Task.FromResult(Execute());
            }

            public HttpResponseMessage Execute()
            {
                HttpResponseMessage responseMessage = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                responseMessage.RequestMessage = Request;
                responseMessage.Content = new StringContent(ErrorMessage);
                return responseMessage;
            }
        }
    }
}