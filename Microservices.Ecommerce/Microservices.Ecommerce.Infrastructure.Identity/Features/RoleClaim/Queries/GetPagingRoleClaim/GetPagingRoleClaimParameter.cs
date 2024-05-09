using System;
using System.Collections.Generic;
using Microservices.Ecommerce.Application.Filters;

namespace Microservices.Ecommerce.Infrastructure.Identity
{
    public class GetPagingRoleClaimParameter : RequestParameter
    {
        public List<int> id { get; set; }
    }
}
