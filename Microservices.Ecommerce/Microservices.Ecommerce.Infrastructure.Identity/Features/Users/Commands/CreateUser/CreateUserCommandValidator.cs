using System;
using FluentValidation;
using Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.CreateUser;

namespace Microservices.Ecommerce.Infrastructure.Identity
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommandValidator()
        {
            RuleFor(p => p.FirstName)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} must not exceed 50 characters.");

            RuleFor(p => p.LastName)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} must not exceed 50 characters.");

            RuleFor(p => p.Email)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .EmailAddress().WithMessage("{PropertyName} is not a valid email address.");

            RuleFor(p => p.UserName)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MaximumLength(50).WithMessage("{PropertyName} must not exceed 50 characters.");

            RuleFor(p => p.Password)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .MinimumLength(6).WithMessage("{PropertyName} must be at least 6 characters.");

            RuleFor(p => p.ConfirmPassword)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull()
                .Equal(p => p.Password).WithMessage("{PropertyName} should be equal to Password.");
        }
    }
}
