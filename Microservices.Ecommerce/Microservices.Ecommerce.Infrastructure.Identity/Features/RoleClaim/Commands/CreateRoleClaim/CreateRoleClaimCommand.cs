using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microsoft.AspNetCore.Identity;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.RoleClaim.Commands.CreateRoleClaim
{
    public class CreateRoleClaimCommand : IRequest<Response<IdentityRoleClaim<string>>>
    {
        public string RoleId { get; set; }
        public string ClaimType { get; set; }
        public string[] ClaimValue { get; set; }

        public class CreateRoleClaimCommandHandler : IRequestHandler<CreateRoleClaimCommand, Response<IdentityRoleClaim<string>>>
        {
            private readonly IdentityContext _context;
            public CreateRoleClaimCommandHandler(
                IdentityContext context)
            {
                _context = context;
            }

            public async Task<Response<IdentityRoleClaim<string>>> Handle(CreateRoleClaimCommand request, CancellationToken cancellationToken)
            {
                var roleClaim = new IdentityRoleClaim<string>
                {
                    RoleId = request.RoleId,
                    ClaimType = request.ClaimType,
                    ClaimValue = string.Join("#", request.ClaimValue)
                };
                _context.RoleClaims.Add(roleClaim);
                await _context.SaveChangesAsync();

                return new Response<IdentityRoleClaim<string>>(roleClaim);
            }
        }
    }
}
