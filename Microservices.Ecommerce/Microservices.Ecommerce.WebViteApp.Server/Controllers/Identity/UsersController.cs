using Microservices.Ecommerce.Infrastructure.Identity;
using Microservices.Ecommerce.Infrastructure.Identity.Contexts;
using Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.CreateUser;
using Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.GetPagingUser;
using Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Queries.GetUserById;
using Microservices.Ecommerce.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers.Identity
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : BaseApiController
    {
        private readonly IdentityContext _context;
        public UsersController(IdentityContext context)
        {
            _context = context;
        }

        // GET: api/users?_start=0&_end=10&_order=asc&_sort=Id
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetPagingUserParameter filter)
        {
            return Ok(await Mediator.Send(new GetPagingUserQuery()
            {
                _end = filter._end,
                _start = filter._start,
                _order = filter._order,
                _sort = filter._sort,
                _filter = filter._filter
            }));
        }

        // GET: api/users/show/5
        [HttpGet("show/{id}")]
        public async Task<IActionResult> Show(string id)
        {
            return Ok(await Mediator.Send((new GetUserByIdQuery { Id = id })));
        }

        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> Create(CreateUserCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, UpdateUserCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return Ok(await Mediator.Send(command));
        }


        // DELETE: api/users/delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return Ok(await Mediator.Send(new DeleteUserByIdCommand { Id = id }));
        }
    }
}
