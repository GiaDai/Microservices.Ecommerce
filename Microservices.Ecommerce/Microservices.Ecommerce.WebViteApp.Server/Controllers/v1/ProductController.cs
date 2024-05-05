
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
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
            [FromQuery] int _start = 0,
            [FromQuery] int _end = 10,
            [FromQuery] string _order = "asc",
            [FromQuery] string _sort = "Id",
            [FromQuery] List<string>? _filter = null)
        {
            var productsQuery = _context.Products.AsQueryable();
            if (_filter != null && _filter.Any())
            {
                foreach (var filter in _filter)
                {
                    var filterValues = filter.Split(':');
                    var filterKey = filterValues[0];
                    var filterValue = filterValues[1];

                    var productType = typeof(Product); // Assuming 'Product' is your entity class
                    var propertyInfo = productType.GetProperty(filterKey);
                    var propertyType = propertyInfo?.PropertyType;

                    if (propertyType != null)
                    {
                        if (propertyType == typeof(int) || propertyType == typeof(decimal) || propertyType == typeof(double)) // Add other numeric types if needed
                        {
                            int numericFilterValue;
                            if (int.TryParse(filterValue, out numericFilterValue))
                            {
                                productsQuery = productsQuery.Where(p => EF.Property<int>(p, filterKey) == numericFilterValue);
                            }
                        }
                        // datetime
                        else if (propertyType == typeof(DateTime))
                        {
                            DateTime dateFilterValue;
                            if (DateTime.TryParse(filterValue, out dateFilterValue))
                            {
                                productsQuery = productsQuery.Where(p => EF.Property<DateTime>(p, filterKey) == dateFilterValue);
                            }
                        }
                        else if (propertyType == typeof(string))
                        {
                            productsQuery = productsQuery.Where(p => EF.Property<string>(p, filterKey).Contains(filterValue));
                        }
                    }
                }
            }
            var products = await productsQuery
            .Skip(_start).Take(_end - _start)
            .OrderByDynamic(_sort, _order)
            .ToListAsync();
            var total = await _context.Products.CountAsync();
            // Add X-Total-Count header
            Response.Headers.Append("X-Total-Count", total.ToString());
            return Ok(products);
        }

        [HttpGet("show/{id}")]
        public async Task<ActionResult<Product>> GetAlbum(int id)
        {
            var album = await _context.Products.FindAsync(id);

            if (album == null)
            {
                return NotFound();
            }

            return Ok(album);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostAlbum([FromBody] Product album)
        {
            _context.Products.Add(album);
            await _context.SaveChangesAsync();

            return Ok(album);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlbum(int id, [FromBody] Product album)
        {
            if (id != album.Id)
            {
                return BadRequest();
            }

            _context.Entry(album).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(album);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            var album = await _context.Products.FindAsync(id);

            if (album == null)
            {
                return NotFound();
            }

            _context.Products.Remove(album);
            await _context.SaveChangesAsync();

            return Ok(album);
        }
    }
}
