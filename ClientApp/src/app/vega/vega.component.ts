import { ToastrService } from 'ngx-toastr';
import { Feature } from './../../Classes/Feature.model';
import { VegaService } from './../vega.service';
import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';  
import { Observable } from 'rxjs';
import { Make } from 'src/Classes/Make.model';
import { Model } from 'src/Classes/Model.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-vega',
  templateUrl: './vega.component.html',
  styleUrls: []
})

export class VegaComponent implements OnInit {
  @Input() value: any;
  submitted = false;
  FormVega:any;
  i:Number;
  test:any={ "id": 1, "name": "Feature1" };
  vehicleSave : any={
    features :[],
    contact :{
      name:String,
      phone:String,
      email : String
    }
  };
  vehicle : any={
    id : Number,
    features :[],
    contact :{
      name:String,
      phone:String,
      email : String
    },
    IsRegistered: Boolean,
    //MakeId : Number,
    ModelId :Number
  
  };
   feats=[];
  MakeId:number=0;
  features:Feature[]=[];
  private Makes :Observable<Make[]>
  private Models : Observable<Model[]>
  private Features :Observable<Feature[]>;
  //formBuilder: any;
  constructor(
    private route :ActivatedRoute, private router : Router, private formbuilder : FormBuilder , private service : VegaService,private toast : ToastrService) {
route.params.subscribe(p=>{
  this.vehicle.id=+p['id'];
});

     }
  ListMakes()  
  {  
    //debugger;  
    this.Makes=this.service.MakeList(); 
   // console.log(this.Makes); 
  }  
  ListModels()  
  {  
    this.MakeId=this.FormVega.get('Makename').value;
    this.vehicle.MakeId=this.MakeId;
    this.Models =this.service.ModelList(this.MakeId); 
   // console.log(this.Models); 
  }  
  ListFeatures(){
    this.service.FeatureList().subscribe(ff=>{ff.forEach(f=>this.features.push(f))});
    this.Features=this.service.FeatureList();
    // console.log(this.features);
    // console.log(this.Features);
  }

  ngOnInit() {
        this.service.getVehicle(this.vehicle.id).subscribe(v=>{
     this.vehicle=v;
     this.Models =this.service.ModelList(this.vehicle.make.id);  
     this.vehicle.features.forEach(function(element){
      var kk = element.id ;
      this.feats.push(kk);
     }.bind(this));
     this.vehicleSave.features=this.feats;
     this.FormVega.patchValue({
      ContactName :this.vehicle.contact.name,
      contactEmail : this.vehicle.contact.email,
      contactPhone : this.vehicle.contact.phone,
      Makename : this.vehicle.make.id,
      Modelname :this.vehicle.model.id,
      Registered : this.vehicle.isRegistered,
      features : this.feats
     });
    
    }, err=>{
     if(err.status==404)
     this.router.navigate(['/vega']);
    });
    this.ListFeatures();

    this.FormVega = this.formbuilder.group({  
      Makename: ['', [Validators.required]],  
      Modelname: ['', [Validators.required]],  
      Registered: ['', [Validators.required]] , 
      features: this.formbuilder.array([{}])  ,
      ContactName: ['', [Validators.required]] ,
      contactPhone: ['', [Validators.required]] ,
      contactEmail: ['', [Validators.required]] ,
    });
    this.ListMakes();
    this.Makes.subscribe(x=>(console.log(x)));
  }
  get f() { return this.FormVega.controls; }

onFeatureToggle(featureId,$event){
  if($event.target.checked){
    this.vehicle.features.push(featureId);
    this.vehicleSave.features.push(featureId);
    //console.log(this.vehicle.features);

  }
  else{
    var index = this.vehicle.features.indexOf(featureId);
    var index = this.vehicleSave.features.indexOf(featureId);

    this.vehicle.features.splice(index,1);
    this.vehicleSave.features.splice(index,1);
    //console.log(this.vehicle.features);

  }
}
submit(){
  this.submitted = true;
  this.vehicle.ModelId = this.FormVega.get('Modelname').value;
  this.vehicle.contact.name=this.FormVega.get('ContactName').value;
  this.vehicle.contact.phone=this.FormVega.get('contactPhone').value;
  this.vehicle.contact.email=this.FormVega.get('contactEmail').value;
  this.vehicle.IsRegistered= this.FormVega.get('Registered').value; 


  this.vehicleSave.ModelId = this.FormVega.get('Modelname').value;
  this.vehicleSave.contact.name=this.FormVega.get('ContactName').value;
  this.vehicleSave.contact.phone=this.FormVega.get('contactPhone').value;
  this.vehicleSave.contact.email=this.FormVega.get('contactEmail').value;
  this.vehicleSave.IsRegistered= this.FormVega.get('Registered').value; 
   
  //console.log(this.vehicleSave);
  if (isNaN(this.vehicle.id)){
    var result$=this.service.create(this.vehicleSave);
    result$.subscribe(
       x=>{
         console.log(x);
         this.toast.success('Insert Operation done successfully !','Successful Insert');
         console.log("Insert done successfully");
         console.log(this.vehicleSave.id);
         this.router.navigate(['/vehicles'])

       }
      );
  }
  else{
    this.service.editVehicle(this.vehicle.id,this.vehicleSave).subscribe(
      x=>{console.log(x)
      this.toast.success('Update Operation done successfully !','Successful Update');
      console.log("Update done successfully");
      console.log(this.vehicle.id);
      this.router.navigate(['/view-vehicle/'+ this.vehicle.id])  
    });
  }
}

delete(){
  if(confirm("Are you sure ?")){
    this.service.deleteVehicle(this.vehicle.id).subscribe(x=>{
      this.router.navigate(['/home'])
    });
  }
}


  onCheckChange(event) {
    const formArray: FormArray = this.FormVega.get('features') as FormArray;
   // console.log(formArray);
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
    console.log(formArray.value);
  }
 




@ViewChild('makes', {static: false}) nameField: ElementRef;
setFocus2(): void {
  this.nameField.nativeElement.focus();
}
@ViewChild('models', {static: false}) nameField1: ElementRef;
setFocus3(): void {
  this.nameField1.nativeElement.focus();
}




  
}
