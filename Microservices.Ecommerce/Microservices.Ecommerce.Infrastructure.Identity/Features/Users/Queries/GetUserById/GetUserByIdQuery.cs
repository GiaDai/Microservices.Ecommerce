using MediatR;
using Microservices.Ecommerce.Application.Exceptions;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.GetUserById
{
    public class GetUserByIdQuery : IRequest<Response<ApplicationUser>>
    {
        public string Id { get; set; }
        public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Response<ApplicationUser>>
        {
            private readonly UserManager<ApplicationUser> _userManager;
            public GetUserByIdQueryHandler(UserManager<ApplicationUser> userManager)
            {
                _userManager = userManager;
            }
            public async Task<Response<ApplicationUser>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(query.Id);
                if (user == null) throw new ApiException($"User Not Found.");
                return new Response<ApplicationUser>(user);
            }
        }
    }
}
