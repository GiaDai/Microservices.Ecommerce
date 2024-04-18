using HotChocolate;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using Microservices.Ecommerce.GraphQL.Schema;

namespace Microservices.Ecommerce.GraphQL.GraphQL.Subcriptions
{
    public class Subscription
    {
        [Subscribe]
        public CourseType CourseCreated([EventMessage]CourseType course) => course;

        [SubscribeAndResolve]
        public ValueTask<ISourceStream<CourseType>> CourseUpdated(Guid courseId, [Service]ITopicEventReceiver eventReceiver)
        {
            string topicName = $"{nameof(CourseUpdated)}_{courseId}";
            var stream = eventReceiver.SubscribeAsync<string, CourseType>(topicName);
            return stream;
        }
    }
}
