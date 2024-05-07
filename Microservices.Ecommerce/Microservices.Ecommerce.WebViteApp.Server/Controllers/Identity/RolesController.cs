using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers.Identity
{
    [Route("api/roles")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IdentityContext _context;
        public RolesController(IdentityContext context)
        {
            _context = context;
        }

        //GET: api/roles?_start=0&_end=10&_order=asc&_sort=Id
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
                var rolesFilter = await _context.Roles.Where(x => id.Contains(x.Id)).ToListAsync();
                return Ok(rolesFilter);
            }
            var roles = await _context.Roles
            .Skip(_start).Take(_end - _start)
            .OrderByDynamic(_sort, _order)
            .ToListAsync();
            var count = await _context.Roles.CountAsync();
            Response.Headers.Add("X-Total-Count", count.ToString());
            return Ok(roles);
        }

        // GET: api/roles/show/5
        [HttpGet("show/{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }
    }
}
