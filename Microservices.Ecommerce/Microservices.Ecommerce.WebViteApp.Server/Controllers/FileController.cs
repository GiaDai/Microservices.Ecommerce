using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers;

[ApiController]
[Route("api/file")]
public class FileController : ControllerBase
{
    private Cloudinary cloudinary = new Cloudinary("cloudinary://853652539285151:35dgbXUNu7U4_zye8KiQkR5GagA@hqxqmqmoo");

    [HttpPost]
    public IActionResult Post(IFormFile file)
    {
        cloudinary.Api.Secure = true;
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            UseFilename = true,
            UniqueFilename = false,
            Overwrite = true,
            Folder = "samples/haircut",
        };
        var uploadResult = cloudinary.Upload(uploadParams);
        return Ok(uploadResult.Url);
    }
}
