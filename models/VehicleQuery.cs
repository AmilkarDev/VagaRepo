﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vegaApp.Extensions;

namespace vegaApp.models
{
    public class VehicleQuery : IQueryObject
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public string SortBy { get; set; } 
        public bool IsSortAscending { get; set; }
        public int Page { get; set; }
        public byte PageSize { get; set; }
        public string contact_like { get; set; }
        public string isregistered_like { get; set; }
        public int? id_like { get; set; }
    }
}
