﻿using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microservices.Ecommerce.Application.Enums;
using Microservices.Ecommerce.Application.Exceptions;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.CreateUser
{
    public partial class CreateUserCommand : IRequest<Response<ApplicationUser>>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Response<ApplicationUser>>
        {
            private readonly UserManager<ApplicationUser> _userManager;
            public CreateUserCommandHandler(UserManager<ApplicationUser> userManager)
            {
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
                    UserName = request.UserName
                };
                var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
                if (userWithSameEmail == null)
                {
                    var result = await _userManager.CreateAsync(user, request.Password);
                    if (result.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(user, Roles.Basic.ToString());
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
