﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Microservices.Ecommerce.Application.Interfaces
{
    public interface IDateTimeService
    {
        DateTime NowUtc { get; }
    }
}
