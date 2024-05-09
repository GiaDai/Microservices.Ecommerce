using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microsoft.AspNetCore.Identity;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.RoleClaim.Commands.UpdateRoleClaim
{
    public class UpdateRoleClaimCommand : IRequest<Response<IdentityRoleClaim<string>>>
    {
        public int Id { get; set; }
        public string ClaimType { get; set; }
        public string[] ClaimValue { get; set; }

        public class UpdateRoleClaimCommandHandler : IRequestHandler<UpdateRoleClaimCommand, Response<IdentityRoleClaim<string>>>
        {
            private readonly IdentityContext _context;
            public UpdateRoleClaimCommandHandler(IdentityContext context)
            {
                _context = context;
            }

            public async Task<Response<IdentityRoleClaim<string>>> Handle(UpdateRoleClaimCommand request, CancellationToken cancellationToken)
            {
                var roleClaim = await _context.RoleClaims.FindAsync(request.Id);
                if (roleClaim == null) throw new Exception($"RoleClaim Not Found.");

                roleClaim.ClaimType = request.ClaimType;
                roleClaim.ClaimValue = string.Join("#", request.ClaimValue);
                await _context.SaveChangesAsync();

                return new Response<IdentityRoleClaim<string>>(roleClaim);
            }
        }
    }
}
