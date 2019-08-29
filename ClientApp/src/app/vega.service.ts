import { Vehicle } from './../Classes/vehicle';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { Model } from './../Classes/Model.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Make } from '../Classes/Make.model';  
import { Feature } from 'src/Classes/Feature.model';
@Injectable({
  providedIn: 'root'
})
export class VegaService {
  Url = 'http://localhost:65249/Api/vega';  
  Urll ='http://localhost:65249/Api/vehicle/';
  constructor(private http:HttpClient) { }
  MakeList(): Observable<Make[]>  
  {  
    return this.http.get<Make[]>(this.Url + '/GetMakes');  
  }  
  getModelbyId(id: number){
    return this.http.get<Model>(this.Url + '/GetModelById/'+id);
  }
  getMakeById(id: number){
    return this.http.get<Make>(this.Url + '/GetMakeById/'+id);
  }
  ModelList(MakeId: number): Observable<Model[]>  
  {  
    return this.http.get<Model[]>(this.Url + '/GetModelsbyId/'+MakeId);  
  }  
  FeatureList() : Observable<Feature[]>
  {
    return this.http.get<Feature[]>(this.Url +'/GetFeatures');
  }
  create(vehicle){
    return this.http.post(this.Urll,vehicle);
  }
  getVehicle(id){
    
    return this.http.get(this.Urll+id);
  }
  editVehicle(id,vehicle){
    return this.http.put(this.Urll+id,vehicle);
  }
  deleteVehicle(id){
    return this.http.delete(this.Urll+id);  
  }
  getVehicles(filter)
  {
   // console.log(this.toQueryString(filter));
    return this.http.get<Vehicle[]>(this.Urll+'?'+this.toQueryString(filter));
  }
  listVehicles()
  {
    return this.http.get<Vehicle[]>(this.Urll+'ListVehicles');
  }
  toQueryString(obj){
    var parts= [];
    for(var property in obj){
      var value=obj[property];
      if(value!=null  && value!=undefined) 
        parts.push(encodeURIComponent(property)+'='+encodeURIComponent(value));
    }
    //console.log(parts);
    return parts.join('&');
    
  }
}
