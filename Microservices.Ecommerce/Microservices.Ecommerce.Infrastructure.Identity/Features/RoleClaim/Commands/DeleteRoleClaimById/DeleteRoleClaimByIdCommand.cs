using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microsoft.AspNetCore.Identity;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.RoleClaim.Commands.DeleteRoleClaimById
{
    public class DeleteRoleClaimByIdCommand : IRequest<Response<IdentityRoleClaim<string>>>
    {
        public int Id { get; set; }

        public class DeleteRoleClaimByIdCommandHandler : IRequestHandler<DeleteRoleClaimByIdCommand, Response<IdentityRoleClaim<string>>>
        {
            private readonly IdentityContext _context;
            public DeleteRoleClaimByIdCommandHandler(IdentityContext context)
            {
                _context = context;
            }
            public Task<Response<IdentityRoleClaim<string>>> Handle(DeleteRoleClaimByIdCommand request, CancellationToken cancellationToken)
            {
                var roleClaim = _context.RoleClaims.Find(request.Id);
                if (roleClaim == null) throw new Exception($"RoleClaim Not Found.");
                _context.RoleClaims.Remove(roleClaim);
                _context.SaveChanges();
                return Task.FromResult(new Response<IdentityRoleClaim<string>>(roleClaim));
            }
        }
    }
}
