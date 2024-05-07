
using Microservices.Ecommerce.Application.Features.Products.Commands.CreateProduct;
using Microservices.Ecommerce.Application.Features.Products.Commands.DeleteProductById;
using Microservices.Ecommerce.Application.Features.Products.Commands.UpdateProduct;
using Microservices.Ecommerce.Application.Features.Products.Queries.GetAllProducts;
using Microservices.Ecommerce.Application.Features.Products.Queries.GetProductById;
using Microservices.Ecommerce.Domain.Entities;
using Microservices.Ecommerce.Infrastructure.Persistence.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers.v1
{
    // [Authorize]
    [ApiVersion("1.0")]
    [Route("api/products")]
    public class ProductController : BaseApiController
    {
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/products?_end=3&_start=0&_order=asc&_sort=id&_filter=product_name||$like||%25product%25
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Paging([FromQuery] GetAllProductsParameter filter)
        {
            return Ok(await Mediator.Send(new GetAllProductsQuery()
            {
                _end = filter._end,
                _start = filter._start,
                _order = filter._order,
                _sort = filter._sort,
                _filter = filter._filter
            }));
        }

        // GET: api/products/show/5
        [HttpGet("show/{id}")]
        public async Task<ActionResult<Product>> Show(int id)
        {
            return Ok(await Mediator.Send(new GetProductByIdQuery { Id = id }));
        }

        // POST: api/products
        [HttpPost]
        public async Task<IActionResult> Post(CreateProductCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        // PUT: api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UpdateProductCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteProductByIdCommand { Id = id }));
        }
    }
}
