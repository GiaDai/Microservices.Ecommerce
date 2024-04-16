using Microservices.Ecommerce.Application.Interfaces;
using System.Security.Claims;

namespace Microservices.Ecommerce.RefineApp.Server.Services
{
    public class AuthenticatedUserService : IAuthenticatedUserService
    {
        public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
        {
            UserId = httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        }

        public string UserId { get; }
    }
}
