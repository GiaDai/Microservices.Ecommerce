using System;
using System.Collections.Generic;
using System.Text;

namespace Microservices.Ecommerce.Application.Wrappers
{
    public class PagedResponse<T> : Response<T>
    {

        public PagedResponse(T data)
        {
            this.Data = data;
            this.Message = null;
            this.Succeeded = true;
            this.Errors = null;
        }
    }
}
