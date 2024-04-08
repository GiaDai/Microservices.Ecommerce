using MassTransit.Mediator;
using Microsoft.AspNetCore.Mvc;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public abstract class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }
}
