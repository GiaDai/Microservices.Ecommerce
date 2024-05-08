﻿using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microservices.Ecommerce.Application.Exceptions;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Microservices.Ecommerce.Infrastructure.Identity
{
    public class DeleteUserByIdCommand : IRequest<Response<ApplicationUser>>
    {
        public string Id { get; set; }
        public class DeleteUserByIdCommandHandler : IRequestHandler<DeleteUserByIdCommand, Response<ApplicationUser>>
        {
            private readonly UserManager<ApplicationUser> _userManager;
            public DeleteUserByIdCommandHandler(UserManager<ApplicationUser> userManager)
            {
                _userManager = userManager;
            }
            public async Task<Response<ApplicationUser>> Handle(DeleteUserByIdCommand command, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(command.Id);
                if (user == null) throw new ApiException($"User Not Found.");
                await _userManager.DeleteAsync(user);
                return new Response<ApplicationUser>(user);
            }
        }
    }
}
