using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microservices.Ecommerce.Application.Exceptions;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Commands.UpdateUser;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Microservices.Ecommerce.Infrastructure.Identity
{
    public class UpdateUserCommand : IRequest<Response<ApplicationUser>>
    {
        public string Id { get; set; }
        public string RoleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public List<UpdateUserAvatar> Avatar { get; set; }

        public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Response<ApplicationUser>>
        {
            private readonly RoleManager<IdentityRole> _roleManager;
            private readonly UserManager<ApplicationUser> _userManager;
            public UpdateUserCommandHandler(
                UserManager<ApplicationUser> userManager,
                RoleManager<IdentityRole> roleManager
                )
            {
                _userManager = userManager;
                _roleManager = roleManager;
            }

            public async Task<Response<ApplicationUser>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(command.Id);
                if (user == null) throw new ApiException($"User Not Found.");
                user.FirstName = command.FirstName ?? user.FirstName;
                user.LastName = command.LastName ?? user.LastName;
                user.PhoneNumber = command.PhoneNumber ?? user.PhoneNumber;
                await _userManager.UpdateAsync(user);
                var roles = await _userManager.GetRolesAsync(user);
                // Add user claim for avatar
                if (command.Avatar != null)
                {
                    await _userManager.AddClaimsAsync(user, new System.Security.Claims.Claim[]
                    {
                        new System.Security.Claims.Claim("AvatarUrl", command.Avatar[0].AvatarUrl),
                        new System.Security.Claims.Claim("AvatarUid", command.Avatar[0].AvatarUid)
                    });
                }
                if (roles.Count > 0)
                {
                    var role = await _roleManager.FindByIdAsync(command.RoleId);
                    if (!roles.Contains(command.RoleId))
                    {
                        await _userManager.RemoveFromRolesAsync(user, roles);
                        await _userManager.AddToRoleAsync(user, role.Name);
                    }
                }
                return new Response<ApplicationUser>(user);
            }
        }
    }
}
