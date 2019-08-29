using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using vegaApp.models;

namespace vegaApp.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query,IQueryObject queryObj,  Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (string.IsNullOrWhiteSpace(queryObj.SortBy)||!columnsMap.ContainsKey(queryObj.SortBy)) return query;
            if (queryObj.IsSortAscending)
                return query.OrderBy(columnsMap[queryObj.SortBy]);
            else
                return query.OrderByDescending(columnsMap[queryObj.SortBy]);
        }
        public static IQueryable<T> ApplyPaging<T> (this IQueryable<T> query,IQueryObject QueryObj)
        {
            if (QueryObj.Page <= 0)
                QueryObj.Page = 1;
            if (QueryObj.PageSize <= 0)
                QueryObj.PageSize = 10;
          return query.Skip((QueryObj.Page - 1) * QueryObj.PageSize).Take(QueryObj.PageSize);

        }
    }
}
