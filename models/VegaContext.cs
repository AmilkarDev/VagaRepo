using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace vegaApp.models
{
    public class VegaContext: DbContext
    {
        public VegaContext(DbContextOptions<VegaContext> options)
           : base(options)
        {
        }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new { vf.VehicleId, vf.FeatureId });
            modelBuilder.Entity<Feature>().HasData(new Feature { id = 1, name = "Feature1"}, new Feature { id=2,name="Feature2"}, new Feature { id = 3, name = "Feature3" });
            modelBuilder.Entity<Make>().HasData(new Feature { id = 1, name = "Make1" }, new Feature { id = 2, name = "Make2" }, new Feature { id = 3, name = "Make3" });
            modelBuilder.Entity<Model>().HasData(new Model { id = 1, name = "Model1" ,makeId=3 }, new Model { id = 2, name = "Model2" , makeId=2}, new Model { id = 3, name = "Model3",makeId=1 });
        }
        

    }
}
