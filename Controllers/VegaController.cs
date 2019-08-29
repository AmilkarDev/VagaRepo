using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vegaApp.models;

namespace vegaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VegaController : ControllerBase
    {
        private readonly VegaContext _context;
        public VegaController(VegaContext context)
        {
            _context = context;
            if(_context.Makes.Count() == 0)
            {
                _context.Makes.Add(new Make { id = 1, name = "bmw", models = new Collection<Model> { new Model { id = 1, name = "model1" }, new Model { id = 2, name = "model2" } } });
                _context.Features.Add(new Feature { id = 1, name = "feature1" });
                _context.Features.Add(new Feature { id = 2, name = "Feature2" });
                _context.SaveChanges();
            }
        }
        // GET: api/Todo
        [HttpGet]
        [Route("GetMakes")]
        public async Task<ActionResult<IEnumerable<Make>>> GetMakes()
        {
            return await _context.Makes.ToListAsync();
        }
        [HttpGet]
        [Route("GetModels")]
        public async Task<ActionResult<IEnumerable<Model>>> GetModels()
        {
            return await _context.Models.ToListAsync();
        }
        [HttpGet]
        [Route("GetModelbyId/{id}")]
        public async Task<ActionResult<Model>> GetModelById(int? id)
        {
            return await _context.Models.Where(m => m.id == id).FirstOrDefaultAsync();
        }
        [HttpGet]
        [Route("GetMakeById/{id}")]
        public async Task<ActionResult<Make>> GetMakeById(int? id)
        {
            return await _context.Makes.Where(m => m.id == id).FirstOrDefaultAsync();
        }
        [HttpGet]
        [Route("GetModelsbyId/{id}")]
        public async Task<ActionResult<IEnumerable<Model>>> GetModelsbyId(int? id)
        {
            return await _context.Models.Where(m=>m.makeId==id).ToListAsync();
        }
        // GET: api/Todo/5
        [HttpGet]
        [Route("GetMake/{id}")]
        public async Task<ActionResult<Make>> GetMake(int id)
        {
            var make = await _context.Makes.FindAsync(id);

            if (make == null)
            {
                return NotFound();
            }

            return make;
        }



        /*************************** Feature CRUD Operations ************************************/
        [HttpGet]
        [Route("GetFeatures")]
        public async Task<ActionResult<IEnumerable<Feature>>> GetFeatures()
        {
            return await _context.Features.ToListAsync();
        }

        [HttpDelete]
        [Route("DeleteFeature/{id}")]
        public async Task<IActionResult> DeleteFeature(int id)
        {
            var feature = await _context.Features.FindAsync(id);

            if (feature == null)
            {
                return NotFound();
            }

            _context.Features.Remove(feature);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut]
        [Route("PutFeature")]
        public async Task<IActionResult> PutFeature( Feature item)
        {
            int id = _context.Features.Where(f => f.id == item.id).Select(y=>y.id).FirstOrDefault();
            if (id != item.id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet]
        [Route("GetFeature/{id}")]
        public async Task<ActionResult<Feature>> GetFeature(int id)
        {
            var feature = await _context.Features.FindAsync(id);

            if (feature == null)
            {
                return NotFound();
            }

            return feature;
        }
        [HttpPost]
        [Route("PostFeature")]
        public async Task<ActionResult<Feature>> PostFeature(Feature item)
        {
            _context.Features.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFeature), new { id = item.id }, item);
        }
    }
}