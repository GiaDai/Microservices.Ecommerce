﻿using System;

namespace Microservices.Ecommerce.Infrastructure.Identity.Features.Users.Commands.UpdateUser
{
    public class UpdateUserAvatar
    {
        public string AvatarName { get; set; }
        public string AvatarUid { get; set; }
        public string AvatarUrl { get; set; }
    }
}
