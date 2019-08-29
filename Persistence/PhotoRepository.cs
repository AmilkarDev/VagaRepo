using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vegaApp.models;

namespace vegaApp.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaContext context;

        public PhotoRepository(VegaContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            try
            {
                return await context.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
