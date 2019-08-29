using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vegaApp.models;
using vegaApp.Persistence;
using vegaApp.Resources;

namespace vegaApp.Controllers
{
    //[Route("api/vehicles/{vehicleId}/photos")]
    [Route("/api/photos/")]
    [ApiController]
    public class PhotosController : Controller
    {
        //private readonly int MAX_BYTES = 1 * 1024 * 1024;
        //private readonly string[] ACCEPTED_FILE_TYPES = new[] { ".jpg", ".jpeg", ".png" };
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository Repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IPhotoRepository photoRepository;
        private readonly IOptionsSnapshot<PhotoSettings> options;
        private readonly PhotoSettings photoSettings;
        public PhotosController(IHostingEnvironment host,IVehicleRepository repository , IUnitOfWork unitOfWork, IMapper mapper , IOptionsSnapshot<PhotoSettings> options,IPhotoRepository photoRepository)
        {
            this.host = host;
            this.Repository = repository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.photoRepository = photoRepository;
            this.photoSettings = options.Value;
        }
        [HttpGet("{id}")]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int id)
        {
            var photos = await photoRepository.GetPhotos(id);
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> Upload(int id, IFormFile file)
        {
            try
            {
                var vehicle = await Repository.GetVehicle(id, includeRelated: false);
                if (vehicle == null) return NotFound();
                if (file == null) return BadRequest("Null File");
                if (file.Length == 0) return BadRequest("Empty File");
                if (file.Length > photoSettings.MaxBytes) return BadRequest("Maximum file size exceeded");
                if (!photoSettings.isSupported(file.FileName)) return BadRequest("Invalid File Type");
                var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolderPath))
                    Directory.CreateDirectory(uploadsFolderPath);

                var filename = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolderPath, filename);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                var photo = new Photo { FileName = filename };
                vehicle.Photos.Add(photo);
                await unitOfWork.CompleteAsync();
                return Ok(mapper.Map<Photo, PhotoResource>(photo));

            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}