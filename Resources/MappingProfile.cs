 using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using vegaApp.models;

namespace vegaApp.Resources
{
    public class MappingProfile : Profile
    {
        public MappingProfile(){
            CreateMap<Photo, PhotoResource>();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<VehicleQueryResource, VehicleQuery>();
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.contactName, opt => opt.MapFrom(vr => vr.contact.Name))
                .ForMember(v => v.contactEmail, opt => opt.MapFrom(vr => vr.contact.Email))
                .ForMember(v => v.contactPhone, opt => opt.MapFrom(vr => vr.contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    //Remove UnselectedFeatures
                    var removeFeatures = new List<VehicleFeature>();
                    foreach(var f in v.Features)
                    {
                        if (!vr.Features.Contains(f.FeatureId))
                            removeFeatures.Add(f);
                    }
                    foreach(var f in removeFeatures)
                    {
                        v.Features.Remove(f);
                    }
                    //Add new Features 
                    foreach(var id in vr.Features)
                    {
                        if (!v.Features.Any(f => f.FeatureId == id)) {
                            v.Features.Add(new VehicleFeature { FeatureId = id });
                        }
                    }
                })
                .ForMember(v => v.Id, opt => opt.Ignore());

            
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.contact, opt => opt.MapFrom(v => new ContactResource { Name = v.contactName, Email = v.contactEmail, Phone = v.contactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));




            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.make , opt => opt.MapFrom(v=>v.model.make))
                     .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.contactName, Email = v.contactEmail, Phone = v.contactPhone }))
                     .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new Feature { id = vf.Feature.id, name=vf.Feature.name})));


        }




    }
}
