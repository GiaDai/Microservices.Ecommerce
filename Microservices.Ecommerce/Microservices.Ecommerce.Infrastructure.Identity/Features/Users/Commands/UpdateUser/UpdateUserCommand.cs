using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microservices.Ecommerce.Application.Exceptions;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;

namespace Microservices.Ecommerce.Infrastructure.Identity
{
    public class UpdateUserCommand : IRequest<Response<ApplicationUser>>
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Response<ApplicationUser>>
        {
            private readonly UserManager<ApplicationUser> _userManager;
            public UpdateUserCommandHandler(UserManager<ApplicationUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<Response<ApplicationUser>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(command.Id);
                if (user == null) throw new ApiException($"User Not Found.");
                user.FirstName = command.FirstName ?? user.FirstName;
                user.LastName = command.LastName ?? user.LastName;
                user.PhoneNumber = command.PhoneNumber ?? user.PhoneNumber;
                await _userManager.UpdateAsync(user);
                return new Response<ApplicationUser>(user);
            }
        }
    }
}
