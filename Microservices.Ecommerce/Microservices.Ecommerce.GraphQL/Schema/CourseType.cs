using HotChocolate;

namespace Microservices.Ecommerce.GraphQL.Schema
{

    public enum Subject
    {
        Mathematics,
        Science,
        History,
        English
    }

    public class CourseType
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public Subject Subject { get; set; }
        [GraphQLNonNullType]
        public InstructorType Instructor { get; set; }
        public IEnumerable<StudentType>? Students { get; set; }
        public string Description
        {
            get
            {
                return $"{Name} is a {Subject} course taught by {Instructor.FirstName} {Instructor.LastName}";
            }
        }
    }
}
