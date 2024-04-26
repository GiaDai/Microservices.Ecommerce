using HotChocolate;
using HotChocolate.AspNetCore;
using HotChocolate.Subscriptions;
using Microservices.Ecommerce.Domain.Entities;
using Microservices.Ecommerce.GraphQL.GraphQL.Mutations.Payloads;
using Microservices.Ecommerce.GraphQL.GraphQL.Mutations.Records;
using Microservices.Ecommerce.GraphQL.GraphQL.Subcriptions;
using Microservices.Ecommerce.GraphQL.Schema;
using Microservices.Ecommerce.Infrastructure.Persistence.Contexts;

namespace Microservices.Ecommerce.GraphQL.GraphQL.Mutations
{
    public class Mutation
    {
        private readonly List<CourseType> _courses;
        public Mutation()
        {
            _courses = new List<CourseType>();
        }
        public async Task<AddProductPayload> AddProductAsync(
            AddProductInput input,
            [Service] ApplicationDbContext context)
        {
            var product = new Product
            {
                Name = input.Name,
                Description = input.Description,
                Barcode = input.Barcode,
                Rate = input.Rate
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();

            return new AddProductPayload(product);
        }

        public async Task<CourseType> AddCourseAsync(string name,Subject subject, Guid instructorId, [Service] ITopicEventSender topicEventSender)
        {
            CourseType courseType = new CourseType()
            {
                Name = name,
                Subject = subject,
                Instructor = new InstructorType()
                {
                    Id = instructorId
                }
            };
            
            _courses.Add(courseType);
            await topicEventSender.SendAsync(nameof(Subscription.CourseCreated), courseType);
            return await Task.FromResult(courseType);
        }

        public async Task<CourseType> UpdateCourseTypeAsync(Guid courseId, string name, Subject subject, Guid instructorId)
        {
            var course = _courses.FirstOrDefault(c => c.Id == courseId);
            if (course == null)
            {
                throw new GraphQLRequestException(new Error("Course not found","COURSE_NOT_FOUND"));
            }

            course.Name = name;
            course.Subject = subject;
            course.Instructor = new InstructorType()
            {
                Id = instructorId
            };

            return await Task.FromResult(course);
        }

        public async Task<bool> DeleteCourseTypeAsync(Guid courseId)
        {
            var course = _courses.FirstOrDefault(c => c.Id == courseId);
            if (course == null)
            {
                throw new GraphQLRequestException(new Error("Course not found","COURSE_NOT_FOUND"));
            }

            _courses.Remove(course);
            return await Task.FromResult(true);
        }
    }
}
