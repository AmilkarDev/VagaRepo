using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using vegaApp.models;

namespace vegaApp.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }
        public bool isRegistered { get; set; }
        public KeyValuePairResource model { get; set; }
        public KeyValuePairResource make { get; set; }

        public ContactResource Contact { get; set; }
        public DateTime updateDate { get; set; }
        public ICollection<KeyValuePairResource> Features { get; set; }
        public VehicleResource()
        {
            Features = new Collection<KeyValuePairResource>();
        }
    }
}
