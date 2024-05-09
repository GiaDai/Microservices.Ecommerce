using MediatR;
using System.Linq;
using Microservices.Ecommerce.Application.Exceptions;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.GetUserById
{
    public class GetUserByIdQuery : IRequest<Response<ApplicationUser>>
    {
        public string Id { get; set; }
        public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Response<ApplicationUser>>
        {
            private readonly RoleManager<IdentityRole> _roleManager;
            private readonly UserManager<ApplicationUser> _userManager;
            private readonly IdentityContext _context;

            public GetUserByIdQueryHandler(
                RoleManager<IdentityRole> roleManager,
                UserManager<ApplicationUser> userManager,
                IdentityContext context)
            {
                _roleManager = roleManager;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Response<ApplicationUser>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(query.Id);
                if (user == null) throw new ApiException($"User Not Found.");

                var userRole = await (from ur in _context.UserRoles
                                      join r in _context.Roles on ur.RoleId equals r.Id
                                      where ur.UserId == user.Id
                                      select r).FirstOrDefaultAsync();

                if (userRole == null) throw new ApiException($"User Role Not Found.");

                user.RoleId = userRole.Id;

                return new Response<ApplicationUser>(user);
            }
        }
    }
}
