using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vegaApp.models;
using vegaApp.Persistence;
using vegaApp.Resources;

namespace vegaApp.Controllers
{
    [Route("/api/vehicle/")]
    [ApiController]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly VegaContext context;

        public VehicleController(IMapper mapper,VegaContext context,IVehicleRepository repository,IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody]SaveVehicleResource vehicleResource)
        {
            //throw new Exception();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.updateDate = DateTime.Now;
            repository.Add(vehicle);
            // ctx.Vehicles.Add(vehicle);
            await unitOfWork.CompleteAsync();
            //await ctx.Models.Include(m => m.make).SingleOrDefaultAsync(m => m.id == vehicle.modelId);
            vehicle = await repository.GetVehicle(vehicle.Id);

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);

        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id,[FromBody]SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            // var vehicle = await ctx.Vehicles.Include(v=>v.Features).SingleOrDefaultAsync(v=>v.Id==id);
            var vehicle = await repository.GetVehicle(id);

            if (vehicle == null) return NotFound();

            mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource,vehicle);
            vehicle.updateDate = DateTime.Now;
            // ctx.Vehicles.Add(vehicle);
            await unitOfWork.CompleteAsync();
            vehicle = await repository.GetVehicle(vehicle.Id);
            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            //var vehicle = await ctx.Vehicles.FindAsync(id);
            var vehicle = await repository.GetVehicle(id,includeRelated: false);
            if (vehicle == null) return NotFound();


            repository.Remove(vehicle);
            await unitOfWork.CompleteAsync();
            return Ok(id);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id);
            if (vehicle == null) return NotFound();
            var vr = mapper.Map<Vehicle,VehicleResource>(vehicle);
            return Ok(vr);
        }



        [HttpGet]
        public async Task<QueryResultResource<VehicleResource>> GetVehicles([FromQuery]VehicleQueryResource filterResource,int make_like,int model_like , string contact_like ,int id_like)
        {
            if(make_like!=0) filterResource.MakeId = make_like;
            if(model_like!=0)  filterResource.ModelId = model_like;
            var filter = mapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);
            var queryResult = await repository.GetVehicles(filter);
            return mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);

        }
        [HttpGet]
        [Route("ListVehicles")]
        [HttpHead]
        public async Task<IActionResult> ListVehicles()
        {
            var res = await repository.ListVehicles();

            var xta= mapper.Map<IEnumerable<Vehicle>, List<VehicleResource>>(res);
            Response.Headers.Add("X-Total-Count", res.Count().ToString());
            return Ok(xta);
        }
    }
}