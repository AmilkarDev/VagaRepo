using System.Collections.Generic;
using System.Threading.Tasks;
using vegaApp.models;

namespace vegaApp.Persistence
{
    public interface IVehicleRepository
    {
        void Add(Vehicle vehicle);
        Task<Vehicle> GetVehicle(int id,bool includeRelated=true);
        void Remove(Vehicle vehicle);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
        Task<IEnumerable<Vehicle>> ListVehicles();
    }
}