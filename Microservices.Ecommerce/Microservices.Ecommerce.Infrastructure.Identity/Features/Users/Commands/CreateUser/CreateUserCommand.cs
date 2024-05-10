using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microservices.Ecommerce.Application.Enums;
using Microservices.Ecommerce.Application.Exceptions;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Commands.UpdateUser;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.CreateUser
{
    public partial class CreateUserCommand : IRequest<Response<ApplicationUser>>
    {
        public string RoleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public List<UpdateUserAvatar> Avatar { get; set; }

        public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Response<ApplicationUser>>
        {
            private readonly RoleManager<IdentityRole> _roleManager;
            private readonly UserManager<ApplicationUser> _userManager;
            public CreateUserCommandHandler(
                RoleManager<IdentityRole> roleManager,
                UserManager<ApplicationUser> userManager)
            {
                _roleManager = roleManager;
                _userManager = userManager;
            }

            public async Task<Response<ApplicationUser>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
            {
                var userWithSameUserName = await _userManager.FindByNameAsync(request.UserName);
                if (userWithSameUserName != null)
                {
                    throw new ApiException($"Username '{request.UserName}' is already taken.");
                }
                var user = new ApplicationUser
                {
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    UserName = request.UserName,
                    PhoneNumber = request.PhoneNumber,
                    EmailConfirmed = request.EmailConfirmed,
                };
                var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
                if (userWithSameEmail == null)
                {
                    var result = await _userManager.CreateAsync(user, request.Password);
                    if (result.Succeeded)
                    {
                        var role = await _roleManager.FindByIdAsync(request.RoleId);
                        await _userManager.AddToRoleAsync(user, role.Name);
                        // Add user claim for avatar
                        if (request.Avatar != null)
                        {
                            await _userManager.AddClaimsAsync(user, new System.Security.Claims.Claim[]
                            {
                                new System.Security.Claims.Claim("AvatarUrl", request.Avatar[0].AvatarUrl),
                                new System.Security.Claims.Claim("AvatarUid", request.Avatar[0].AvatarUid)
                            });
                        }
                        // var verificationUri = await SendVerificationEmail(user, origin);
                        //TODO: Attach Email Service here and configure it via appsettings
                        // await _emailService.SendAsync(new Application.DTOs.Email.EmailRequest() { From = "mail@codewithmukesh.com", To = user.Email, Body = $"Please confirm your account by visiting this URL {verificationUri}", Subject = "Confirm Registration" });
                        return new Response<ApplicationUser>(user);
                    }
                    else
                    {
                        throw new ApiException($"{result.Errors}");
                    }
                }
                else
                {
                    throw new ApiException($"Email {request.Email} is already registered.");
                }
            }
        }
    }

}
