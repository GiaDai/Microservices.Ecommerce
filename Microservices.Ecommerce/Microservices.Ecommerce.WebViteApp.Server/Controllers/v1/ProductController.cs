
using Microservices.Ecommerce.Domain.Entities;
using Microservices.Ecommerce.Infrastructure.Persistence.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers.v1
{
    [Authorize]
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
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int _start = 0, int _end = 10, string _order = "asc", string _sort = "Id")
        {
            var products = await _context.Products
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
