using System.Collections.Generic;
using System.Threading.Tasks;
using vegaApp.models;

namespace vegaApp.Persistence
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}