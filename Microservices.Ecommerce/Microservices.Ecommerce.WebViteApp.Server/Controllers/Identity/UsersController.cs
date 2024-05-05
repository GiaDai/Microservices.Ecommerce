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
        //private readonly IdentityDbContext _identityDbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(
            //IdentityDbContext identityDbContext,
            UserManager<ApplicationUser> userManager
            )
        {
            //_identityDbContext = identityDbContext;
            _userManager = userManager;
        }

        //GET: api/users?_start=0&_end=10&_order=asc&_sort=Id
        [HttpGet]
        public IActionResult Get([FromQuery] int _start = 0,
                       [FromQuery] int _end = 10,
                                  [FromQuery] string _order = "asc",
                                             [FromQuery] string _sort = "Id")
        {
            var users = _userManager.Users;
            var total = users.Count();
            Response.Headers.Add("X-Total-Count", total.ToString());
            return Ok(users);
        }

        // GET: api/users?_role=Admin
        [HttpGet("role/{role}")]
        public IActionResult GetByRole(string role)
        {
            var users = _userManager.GetUsersInRoleAsync(role);
            return Ok(users);
        }

        //GET: api/users/show/5
        [HttpGet("show/{id}")]
        public async Task<IActionResult> Show(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //POST: api/users
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ApplicationUser user)
        {
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                return Ok(user);
            }
            return BadRequest(result.Errors);
        }

        //PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] ApplicationUser user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok(user);
            }
            return BadRequest(result.Errors);
        }

        //DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors);
        }
    }
}
