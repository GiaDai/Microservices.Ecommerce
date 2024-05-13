using System;
using Microservices.Ecommerce.Application.Features.Products.Commands.CreateProduct;

namespace Microservices.Ecommerce.Application
{
    public class CreateRangeProductResponse : CreateProductCommand
    {
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}
