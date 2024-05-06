using MassTransit.Mediator;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public abstract class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected IQueryable<T> ApplyFilters<T>(IQueryable<T> query, List<string> filters)
        {
            foreach (var filter in filters)
            {
                var filterValues = filter.Split(':');
                var filterKey = filterValues[0];
                var filterValue = filterValues[1];

                var entityType = typeof(T);
                var propertyInfo = entityType.GetProperty(filterKey);
                var propertyType = propertyInfo?.PropertyType;

                if (propertyType != null)
                {
                    if (propertyType == typeof(int) || propertyType == typeof(decimal) || propertyType == typeof(double)) // Add other numeric types if needed
                    {
                        int numericFilterValue;
                        if (int.TryParse(filterValue, out numericFilterValue))
                        {
                            query = query.Where(p => EF.Property<int>(p, filterKey) == numericFilterValue);
                        }
                    }
                    // datetime
                    else if (propertyType == typeof(DateTime))
                    {
                        DateTime dateFilterValue;
                        if (DateTime.TryParse(filterValue, out dateFilterValue))
                        {
                            query = query.Where(p => EF.Property<DateTime>(p, filterKey) == dateFilterValue);
                        }
                    }
                    else if (propertyType == typeof(string))
                    {
                        query = query.Where(p => EF.Property<string>(p, filterKey).Contains(filterValue));
                    }
                }
            }

            return query;
        }
    }
}
