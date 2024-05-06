using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers.Identity;

[Route("api/roleclaims")]
[ApiController]
public class RoleClaimsController : BaseApiController
{
    private readonly IdentityContext _context;
    public RoleClaimsController(
        IdentityContext context)
    {
        _context = context;
    }

    // GET: api/roleclaims?_sort=Id&_order=asc&_start=0&_end=10
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int _start = 0,
        [FromQuery] int _end = 10,
        [FromQuery] string _order = "asc",
        [FromQuery] string _sort = "Id",
        [FromQuery] List<string>? _filter = null)
    {
        var roleclaimQuery = _context.RoleClaims.AsQueryable();
        if (_filter != null && _filter.Any())
        {
            roleclaimQuery = ApplyFilters(roleclaimQuery, _filter);
        }
        var roleclaims = await roleclaimQuery
            .Skip(_start).Take(_end - _start)
            .OrderByDynamic(_sort, _order)
            .ToListAsync();
        var total = await _context.RoleClaims.CountAsync();
        // Add X-Total-Count header
        Response.Headers.Append("X-Total-Count", total.ToString());
        return Ok(roleclaims);
    }

    // GET: api/roleclaims/5
    [HttpGet("show/{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var roleclaim = await _context.RoleClaims.FindAsync(id);

        if (roleclaim == null)
        {
            return NotFound();
        }

        return Ok(roleclaim);
    }


    // POST: api/roleclaims
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] IdentityRoleClaim<string> roleclaim)
    {
        _context.RoleClaims.Add(roleclaim);
        await _context.SaveChangesAsync();

        return Ok(roleclaim);
    }

    // PUT: api/roleclaims/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] IdentityRoleClaim<string> roleclaim)
    {
        if (id != roleclaim.Id)
        {
            return BadRequest();
        }

        _context.Entry(roleclaim).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok(roleclaim);
    }

    // DELETE: api/roleclaims/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var roleclaim = await _context.RoleClaims.FindAsync(id);

        if (roleclaim == null)
        {
            return NotFound();
        }

        _context.RoleClaims.Remove(roleclaim);
        await _context.SaveChangesAsync();

        return Ok(roleclaim);
    }
}
