using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using vegaApp.Extensions;
using vegaApp.models;

namespace vegaApp.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaContext context;

        public VehicleRepository(VegaContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle(int id,bool includeRelated=true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);
            return await context.Vehicles.Include(v => v.Features).ThenInclude(vf => vf.Feature).Include(v => v.model).ThenInclude(m => m.make).SingleOrDefaultAsync(v => v.Id == id);

        }
        public async Task<IEnumerable<Vehicle>> ListVehicles()
        {
            var query = context.Vehicles
               .Include(v => v.model)
                   .ThenInclude(m => m.make)
               .Include(v => v.Features)
                   .ThenInclude(vf => vf.Feature).AsQueryable();
            return query;
        }

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery QueryObj)
        {
            var result = new QueryResult<Vehicle>();


            var query =  context.Vehicles
               .Include(v => v.model)
                   .ThenInclude(m => m.make)
               .Include(v => v.Features)
                   .ThenInclude(vf => vf.Feature).AsQueryable();
            if (QueryObj.MakeId.HasValue)
            {
                query = query.Where(v => v.model.makeId == QueryObj.MakeId.Value);
            }
            if (QueryObj.ModelId.HasValue)
            {
                query = query.Where(v => v.modelId == QueryObj.ModelId.Value);
            }
            if (QueryObj.id_like.HasValue)
            {
                query = query.Where(v => v.Id == QueryObj.id_like);
            }
            if (QueryObj.contact_like!=null)
            {
                query = query.Where(v => v.contactName.Contains(QueryObj.contact_like));
            }
            if (QueryObj.isregistered_like=="true")
            {
                query = query.Where(v => v.isRegistered==true);
            }
            if (QueryObj.isregistered_like == "false")
            {
                query = query.Where(v => v.isRegistered == false);
            }
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>
            {
                ["make"] = v => v.model.make.name,
                ["model"] =v => v.model.name,
                ["contactName"] = v=> v.contactName
            };
            //Expression<Func<Vehicle, object>> exp;
            //Expression<Func<Vehicle, string>> func = v => v.contactName;
            //columnsMap.Add("make", v => v.model.make.name);


            //if (QueryObj.SortBy == "make")
            //{
            //    query = (QueryObj.IsSortAscending) ? query.OrderBy(v => v.model.make.name) : query.OrderByDescending(v => v.model.make.name);
            //}
            //if (QueryObj.SortBy == "model")
            //{
            //    query = (QueryObj.IsSortAscending) ? query.OrderBy(v => v.model.name)QueryObj.SortBy :; query.OrderByDescending(v => v.model.name);
            //}
            //if (QueryObj.SortBy == "contactName")
            //{
            //    query = (QueryObj.IsSortAscending) ? query.OrderBy(v => v.contactName) : query.OrderByDescending(v => v.contactName);
            //}
           // query = ApplyOrdering(QueryObj, query, columnsMap);
            query = query.ApplyOrdering( QueryObj, columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(QueryObj);
            result.Items = await query.ToListAsync();
            return result;
        }
       
        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }
        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }
      

    }
}
