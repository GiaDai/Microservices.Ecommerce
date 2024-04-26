namespace Microservices.Ecommerce.GraphQL.GraphQL.Mutations.Records
{
    public record AddProductInput(
            string Name,
            string Description,
            string Barcode,
            decimal Rate
        );
}
