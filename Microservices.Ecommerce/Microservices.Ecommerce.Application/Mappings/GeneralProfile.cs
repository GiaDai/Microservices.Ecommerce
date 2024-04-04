using AutoMapper;
using Microservices.Ecommerce.Application.Features.Products.Commands.CreateProduct;
using Microservices.Ecommerce.Application.Features.Products.Queries.GetAllProducts;
using Microservices.Ecommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microservices.Ecommerce.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<Product, GetAllProductsViewModel>().ReverseMap();
            CreateMap<CreateProductCommand, Product>();
            CreateMap<GetAllProductsQuery, GetAllProductsParameter>();
        }
    }
}
