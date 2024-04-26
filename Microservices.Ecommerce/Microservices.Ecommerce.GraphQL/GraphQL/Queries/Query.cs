using Bogus;
using HotChocolate;
using Microservices.Ecommerce.Domain.Entities;
using Microservices.Ecommerce.GraphQL.Schema;
using Microservices.Ecommerce.Infrastructure.Persistence.Contexts;

namespace Microservices.Ecommerce.GraphQL.GraphQL.Queries
{
    public class Query
    {

        private readonly Faker<InstructorType> _instructorTypeFaker;
        private readonly Faker<StudentType> _studentTypeFaker;
        private readonly Faker<CourseType> _courseTypeFaker;

        public Query()
        {
            _instructorTypeFaker = new Faker<InstructorType>()
                .RuleFor(i => i.Id, f => f.Random.Guid())
                .RuleFor(i => i.FirstName, f => f.Name.FirstName())
                .RuleFor(i => i.LastName, f => f.Name.LastName())
                .RuleFor(i => i.Salary, f => f.Random.Double(0, 1000000));

            _studentTypeFaker = new Faker<StudentType>()
                .RuleFor(s => s.Id, f => f.Random.Guid())
                .RuleFor(s => s.FirstName, f => f.Name.FirstName())
                .RuleFor(s => s.LastName, f => f.Name.LastName())
                .RuleFor(s => s.GPA, f => f.Random.Double(0, 4));

            _courseTypeFaker = new Faker<CourseType>()
                .RuleFor(c => c.Id, f => f.Random.Guid())
                .RuleFor(c => c.Name, f => f.Name.FullName())
                .RuleFor(c => c.Subject, f => f.PickRandom<Subject>())
                .RuleFor(c => c.Instructor, f => _instructorTypeFaker.Generate())
                .RuleFor(c => c.Students, f => _studentTypeFaker.Generate(10))
                ;
        }

        [GraphQLDeprecated("Use GetProductsPagination instead")]
        public IQueryable<Product> GetProducts([Service] ApplicationDbContext context)
        {
            return context.Products;
        }

        // Get product pagination with page size and page number parameters
        public IQueryable<Product> GetProductsPagination(int pageSize, int pageNumber, [Service] ApplicationDbContext context)
        {
            return context.Products.Skip((pageNumber - 1) * pageSize).Take(pageSize);
        }

        public IEnumerable<CourseType> GetCourses()
        {
            
            return _courseTypeFaker.Generate(10);
        }

        public async Task<CourseType> GetCourseByIdAsync(Guid id)
        {
            return await Task.FromResult(_courseTypeFaker.Generate());
        }
    }
}
