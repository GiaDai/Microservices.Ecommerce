using Microservices.Ecommerce.Application.Features.Products.Queries.GetAllProducts;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Microservices.Ecommerce.WebApp.Controllers.v1
{
    [ApiVersion("1.0")]
    public class ProductController : BaseApiController
    {
        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetAllProductsParameter filter)
        {

            return Ok(await Mediator.Send(new GetAllProductsQuery() { PageSize = filter.PageSize, PageNumber = filter.PageNumber }));
        }
    }
}
