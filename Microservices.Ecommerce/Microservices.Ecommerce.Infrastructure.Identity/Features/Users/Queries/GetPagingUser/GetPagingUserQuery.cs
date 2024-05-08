using AutoMapper;
using MediatR;
using Microservices.Ecommerce.Application.Features.Products.Queries.GetAllProducts;
using Microservices.Ecommerce.Application.Wrappers;
using Microservices.Ecommerce.Domain.Entities;
using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microservices.Ecommerce.Infrastructure.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.GetPagingUser
{
    public class GetPagingUserQuery : IRequest<Response<object>>
    {
        public int _start { get; set; }
        public int _end { get; set; }
        public string _sort { get; set; }
        public string _order { get; set; }
        public List<string> _filter { get; set; }

        public class GetPagingUserHanlder : IRequestHandler<GetPagingUserQuery, Response<object>>
        {
            private readonly IMapper _mapper;
            private readonly IdentityContext _context;
            public GetPagingUserHanlder(IdentityContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Response<object>> Handle(GetPagingUserQuery request, CancellationToken cancellationToken)
            {
                var userQuery = _context.Users.AsQueryable();
                if(request._filter != null && request._filter.Count > 0)
                {
                    userQuery = MethodExtensions.ApplyFilters(userQuery, request._filter);
                }
                var users = await PagedList<ApplicationUser>.ToPagedList(userQuery.OrderByDynamic(request._sort, request._order).AsNoTracking(), request._start, request._end);
                return new Response<object>(true, new
                {
                    users._start,
                    users._pages,
                    users._end,
                    users._total,
                    users._hasNext,
                    users._hasPrevious,
                    _data = _mapper.Map<IEnumerable<GetPagingUserViewModel>>(users)
                }, "Success");
            }
        }
    }
}
