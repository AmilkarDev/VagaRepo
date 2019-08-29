using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using vegaApp.models;

namespace vegaApp.Resources
{
    public class ContactResource
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(255)]
        public string Phone { get; set; }
    }
    public class SaveVehicleResource
    {
        public int id { get; set; }
        public int modelId { get; set; }
        public bool isRegistered { get; set; }
        [Required]
        public ContactResource contact { get; set; }
        public ICollection<int> Features { get; set; }
        public SaveVehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}
