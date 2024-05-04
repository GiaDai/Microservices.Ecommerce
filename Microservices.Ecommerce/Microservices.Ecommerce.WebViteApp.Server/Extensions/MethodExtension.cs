using System.Linq.Expressions;

namespace Microservices.Ecommerce.WebViteApp.Server;

public static class MethodExtension
{
    public static IQueryable<TSource> OrderByDynamic<TSource>(
        this IQueryable<TSource> query, string propertyName, string ascending)
    {
        var entityType = typeof(TSource);
        var propertyInfo = entityType.GetProperty(propertyName);
        if (propertyInfo == null)
        {
            throw new ArgumentException($"Property {propertyName} not found on type {entityType.Name}");
        }

        var parameter = Expression.Parameter(entityType, "x");
        var propertyAccess = Expression.MakeMemberAccess(parameter, propertyInfo);
        var orderByExp = Expression.Lambda(propertyAccess, parameter);

        var methodName = ascending == "asc" ? "OrderBy" : "OrderByDescending";
        var resultExpression = Expression.Call(typeof(Queryable), methodName,
            new Type[] { entityType, propertyInfo.PropertyType },
            query.Expression, Expression.Quote(orderByExp));

        return query.Provider.CreateQuery<TSource>(resultExpression);
    }
}
