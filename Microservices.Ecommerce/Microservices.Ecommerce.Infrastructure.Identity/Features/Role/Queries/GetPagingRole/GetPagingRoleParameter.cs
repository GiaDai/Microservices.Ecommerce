using System;
using System.Collections.Generic;
using Automatonymous;
using Microservices.Ecommerce.Application.Filters;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Role.Queries.GetPagingRole
{
    public class GetPagingRoleParameter : RequestParameter
    {
        public List<string> id { get; set; }
    }
}
