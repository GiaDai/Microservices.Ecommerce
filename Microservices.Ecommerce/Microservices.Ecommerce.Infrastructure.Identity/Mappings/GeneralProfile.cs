using AutoMapper;
using Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.GetPagingUser;
using Microservices.Ecommerce.Infrastructure.Identity.Models;

namespace Microservices.Ecommerce.Infrastructure.Identity.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<ApplicationUser, GetPagingUserViewModel>().ReverseMap();
        }
    }
}
