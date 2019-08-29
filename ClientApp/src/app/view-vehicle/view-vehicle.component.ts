import { ProgressService } from './../services/progress.service';
import { PhotoService } from './../shared/photo.service';
import { VegaService } from './../vega.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { Photo } from 'src/Classes/Photo';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { parseHttpResponse } from 'selenium-webdriver/http';
@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
@Pipe({
  name: 'safeUrl'
})
export class ViewVehicleComponent implements OnInit,PipeTransform {
  @ViewChild('fileInput', {static: false}) fileInput:ElementRef;
 
  vehicle: any;
  vehicleId: number; 
  photos ;
  UploadProgress:number;
  constructor( 
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer,
    private router: Router,
    private toasty: ToastrService,
    private photoService: PhotoService,
    private vehicleService: VegaService,
    private progressService : ProgressService ) { 
      route.params.subscribe(p => {
        this.vehicleId = +p['id'];
        if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
          router.navigate(['/vehicles']);
          return; 
        }
      });
    }

  ngOnInit()
   {
    this.vehicleService.getVehicle(this.vehicleId)
    .subscribe(
      v => this.vehicle = v,
      err => {
        if (err.status == 404) {
          this.router.navigate(['/vehicles']);
          return; 
        }
      });

      this.photoService.getPhotos(this.vehicleId).subscribe(photos=>{
        this.photos=photos;
      });
   }
   delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.deleteVehicle(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }


  uploadPhoto(){
    var nativeElement : HTMLInputElement =this.fileInput.nativeElement; 
    var file = nativeElement.files[0];
    nativeElement.value='';
   // this.progressService.uploadProgress.subscribe(po=>console.log(po));
    
    this.photoService.upload(this.vehicleId,file)
    .subscribe(
      photo=>{
  
        if(photo.type=== HttpEventType.UploadProgress){
          this.UploadProgress = Math.round((photo.loaded / photo.total) * 100);
         // console.log(this.UploadProgress)
        }
       
        
        else if(photo.type===HttpEventType.Response){
          let response : any;
          response = photo.body;
          //console.log(response);
         // console.log(photo);
          this.photos.push(photo.body);
         

        }
    },err=>{
      //console.log('error :' ,  err.error);
      this.toasty.error(err.error,'Error detected');
    }
    ,()=>{this.UploadProgress=null;}
    );
    // this.photoService.getPhotos(this.vehicleId).subscribe(photos=>{
    //   this.photos=photos;
    // });
  }   
   transform(value: string) {
     if(!value) return null;
     // console.log(this.sanitizer.bypassSecurityTrustUrl("C:/Users/Amilkar/source/repos/vegaApp/wwwroot/uploads/"+value));
    return this.sanitizer.bypassSecurityTrustUrl("http://127.0.0.1:8080/"+value);
   
  }
 
}
