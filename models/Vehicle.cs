using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vegaApp.models
{
    [Table("Vehicles")]
    public class Vehicle
    {
       // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int modelId { get; set; }
        public bool isRegistered { get; set; }
        public Model model { get; set; }
        [Required]
        [StringLength(255)]
        public string contactName { get; set; }
        [StringLength(255)]
        public string contactEmail { get; set; }
        [Required]
        [StringLength(255)]
        public string contactPhone { get; set; }
        public DateTime updateDate { get; set; }
        public ICollection<VehicleFeature> Features { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public Vehicle()
        {
            Features = new Collection<VehicleFeature>();
            Photos   = new Collection<Photo>();
        }
    }
}
