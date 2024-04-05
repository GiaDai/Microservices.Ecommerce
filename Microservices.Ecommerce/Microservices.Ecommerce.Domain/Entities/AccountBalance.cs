using Microservices.Ecommerce.Domain.Common;

namespace Microservices.Ecommerce.Domain.Entities
{
    public class AccountBalance : AuditableBaseEntity
    {
        public string AccountNumber { get; set; }
        public decimal Balance { get; set; }
    }
}
