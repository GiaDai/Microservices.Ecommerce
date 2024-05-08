using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Microservices.Ecommerce.Application.DTOs.Account
{
    public class AuthenticationRequest
    {
        [DefaultValue("basicuser@gmail.com")]
        public string Email { get; set; } = "basicuser@gmail.com";
        [DefaultValue("123Pa$$word!")]
        public string Password { get; set; } = "123Pa$$word!";
    }

    public class RefreshTokenDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
