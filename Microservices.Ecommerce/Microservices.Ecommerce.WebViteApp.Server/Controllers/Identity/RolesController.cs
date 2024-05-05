using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers.Identity
{
    [Route("api/roles")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RolesController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        //GET: api/roles?_start=0&_end=10&_order=asc&_sort=Id
        [HttpGet]
        public IActionResult Get([FromQuery] int _start = 0,
            [FromQuery] int _end = 10,
            [FromQuery] string _order = "asc",
            [FromQuery] string _sort = "Id")
        {
            var roles = _roleManager.Roles;
            var total = roles.Count();
            Response.Headers.Add("X-Total-Count", total.ToString());
            return Ok(roles);
        }

        //GET: api/roles/show/5
        [HttpGet("show/{id}")]
        public async Task<IActionResult> Show(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        //POST: api/roles
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] IdentityRole role)
        {
            var result = await _roleManager.CreateAsync(role);
            if (result.Succeeded)
            {
                return Ok(role);
            }
            return BadRequest(result.Errors);
        }

        //PUT: api/roles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] IdentityRole role)
        {
            if (id != role.Id)
            {
                return BadRequest();
            }

            var result = await _roleManager.UpdateAsync(role);
            if (result.Succeeded)
            {
                return Ok(role);
            }
            return BadRequest(result.Errors);
        }

        //DELETE: api/roles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            if (role == null)
            {
                return NotFound();
            }
            var result = await _roleManager.DeleteAsync(role);
            if (result.Succeeded)
            {
                return Ok(role);
            }
            return BadRequest(result.Errors);
        }
    }
}
