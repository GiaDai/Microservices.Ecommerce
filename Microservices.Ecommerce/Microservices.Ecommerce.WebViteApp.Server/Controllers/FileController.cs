using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers;

[ApiController]
[Route("api/file")]
public class FileController : ControllerBase
{
    private Cloudinary cloudinary = new Cloudinary("cloudinary://853652539285151:35dgbXUNu7U4_zye8KiQkR5GagA@hqxqmqmoo");
    // private Cloudinary cloudinary = new Cloudinary("");

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
        return Ok(new
        {
            uploadResult.PublicId,
            uploadResult.Url
        });
    }

    [HttpDelete()]
    public IActionResult Delete([FromQuery] string publicId)
    {
        var deleteParams = new DeletionParams(publicId)
        {
            ResourceType = ResourceType.Image
        };
        var deleteResult = cloudinary.Destroy(deleteParams);
        return Ok(deleteResult);
    }

    [HttpGet("{publicId}")]
    public IActionResult Get(string publicId)
    {
        var url = cloudinary.Api.UrlImgUp.BuildUrl(publicId);
        return Ok(url);
    }
}
