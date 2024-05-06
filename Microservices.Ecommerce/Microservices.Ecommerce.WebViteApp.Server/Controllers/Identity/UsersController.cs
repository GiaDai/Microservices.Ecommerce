using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers.Identity
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IdentityContext _context;
        public UsersController(IdentityContext context)
        {
            _context = context;
        }

        // GET: api/users?_start=0&_end=10&_order=asc&_sort=Id
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] List<string>? id,
            [FromQuery] int _start = 0,
            [FromQuery] int _end = 10,
            [FromQuery] string _order = "asc",
            [FromQuery] string _sort = "Id",
            [FromQuery] List<string>? _filter = null)
        {
            if (id != null && id.Count > 0)
            {
                var usersFilter = await _context.Users.Where(x => id.Contains(x.Id)).ToListAsync();
                return Ok(usersFilter);
            }
            var users = await _context.Users
            .Skip(_start).Take(_end - _start)
            .OrderByDynamic(_sort, _order)
            .ToListAsync();
            var count = await _context.Users.CountAsync();
            Response.Headers.Add("X-Total-Count", count.ToString());
            return Ok(users);
        }
    }
}
