import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  Url = 'http://localhost:65249/Api/photos';  
  constructor(private http : HttpClient) { }
  upload(vehicleId,photo){
    var formData = new FormData();
    formData.append('file',photo);
    return this.http.post(`http://localhost:65249/api/photos/${vehicleId}`,formData,{reportProgress:true, observe :'events'});
  }
  getPhotos(vehicleId){
    return this.http.get(`http://localhost:65249/api/photos/${vehicleId}`);
  }
}
