using Microservices.Ecommerce.Application.Filters;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.GetPagingUser
{
    public class GetPagingUserParameter : RequestParameter
    {
        public List<string> id { get; set; }
    }
}
