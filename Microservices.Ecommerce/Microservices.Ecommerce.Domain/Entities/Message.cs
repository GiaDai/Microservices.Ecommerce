using Microservices.Ecommerce.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microservices.Ecommerce.Domain.Entities
{
    public class Message : AuditableBaseEntity
    {
        public int SenderId { get; set; }
        public int ReciverId { get; set; }
        public string Content { get; set; }
    }
}
