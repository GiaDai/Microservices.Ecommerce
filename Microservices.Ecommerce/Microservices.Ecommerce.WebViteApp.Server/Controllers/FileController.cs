using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microservices.Ecommerce.Infrastructure.Shared.Environments;
using Microsoft.AspNetCore.Mvc;

namespace Microservices.Ecommerce.WebViteApp.Server.Controllers;

[ApiController]
[Route("api/file")]
public class FileController : ControllerBase
{
    private readonly ICloudinarySettingsProvider _cloudinaryProvider;
    private readonly Cloudinary _cloudinary;
    public FileController(ICloudinarySettingsProvider cloudinaryProvider)
    {
        _cloudinaryProvider = cloudinaryProvider;
        _cloudinary = new Cloudinary(_cloudinaryProvider.GetConnectionString());
    }

    [HttpPost]
    public IActionResult Post(IFormFile file)
    {
        _cloudinary.Api.Secure = true;
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            UseFilename = true,
            UniqueFilename = false,
            Overwrite = true,
            Folder = "samples/haircut",
        };
        var uploadResult = _cloudinary.Upload(uploadParams);
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
        var deleteResult = _cloudinary.Destroy(deleteParams);
        return Ok(deleteResult);
    }

    [HttpGet("{publicId}")]
    public IActionResult Get(string publicId)
    {
        var url = _cloudinary.Api.UrlImgUp.BuildUrl(publicId);
        return Ok(url);
    }
}
