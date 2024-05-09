using System;
using Microservices.Ecommerce.Infrastructure.Identity.Models;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.GetUserById
{
    public class GetUserByIdModel : ApplicationUser
    {
        public UserAvatarClaim Avatar { get; set; }
    }
}
