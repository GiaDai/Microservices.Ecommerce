using Microservices.Ecommerce.Infrastructure.Identity;
using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microservices.Ecommerce.Infrastructure.Identity.Features.RoleClaim.Commands.CreateRoleClaim;
using Microservices.Ecommerce.Infrastructure.Identity.Features.RoleClaim.Commands.DeleteRoleClaimById;
using Microservices.Ecommerce.Infrastructure.Identity.Features.RoleClaim.Commands.UpdateRoleClaim;
using Microservices.Ecommerce.Infrastructure.Identity.Features.RoleClaim.Queries.GetPagingRoleClaim;
using Microservices.Ecommerce.Infrastructure.Identity.Features.RoleClaim.Queries.GetRoleClaimById;
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
    public async Task<IActionResult> Get([FromQuery] GetPagingRoleClaimParameter filter)
    {
        return Ok(await Mediator.Send(new GetPagingRoleClaimQuery()
        {
            id = filter.id,
            _end = filter._end,
            _start = filter._start,
            _order = filter._order,
            _sort = filter._sort,
            _filter = filter._filter
        }));
    }

    // GET: api/roleclaims/5
    [HttpGet("show/{id}")]
    public async Task<IActionResult> Get(int id)
    {
        return Ok(await Mediator.Send(new GetRoleClaimByIdQuery() { Id = id }));
    }


    // POST: api/roleclaims
    [HttpPost]
    public async Task<IActionResult> Post(CreateRoleClaimCommand command)
    {
        return Ok(await Mediator.Send(command));
    }

    // PUT: api/roleclaims/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, UpdateRoleClaimCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }
        return Ok(await Mediator.Send(command));
    }

    // DELETE: api/roleclaims/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await Mediator.Send(new DeleteRoleClaimByIdCommand { Id = id }));
    }
}
