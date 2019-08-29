import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ɵsetCurrentInjector } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { FormBuilder, Validators } from '@angular/forms';
import { VegaService } from '../vega.service';
import { Observable, Subscription } from 'rxjs';
import { Model } from 'src/Classes/Model.model';
import { DataService } from '../data.service';

@Component({
    template :`
    <form  [formGroup]="FormVega"  novalidate>
    <div>      
         
        <select  class="form-control" #models formControlName="Modelname" (change)="updateValue();"
        [ngClass]="inputClass"           
        [name]="cell.getId()"    
        
        (click)="onClick.emit($event)"
        (keyup)="updateValue()"
        (keydown.enter)="onEdited.emit($event)"
        (keydown.esc)="onStopEditing.emit()">  
          <option value="">--Select--</option>  
          <option *ngFor="let Model of Models | async" value={{Model.id}}>  
              {{Model.name}}  
          </option>  
        </select>  
        <div class="alert alert-danger" *ngIf="submitted && f.Modelname.errors">
        <div *ngIf="f.Modelname.errors.required">please specify the model.</div>
      </div>
    </div> 
    </form>
    <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
    `
    
})
export class CustomModelComponent extends DefaultEditor implements AfterViewInit   {
  FormVega: any;
  submitted:false;
  message:number;
  current: any;
  mm: any;
  Models:Observable<Model[]>;
  @ViewChild('models', { static: false }) models: ElementRef;
  @ViewChild('htmlValue', { static: false }) htmlValue: ElementRef;
  mod: Model;
 
  ngAfterViewInit() {
    if(this.cell.getValue()){
      setTimeout(() => {
        this.Models=this.service.ModelList(this.message);
      this.FormVega.patchValue({
       Modelname : this.cell.newValue.id,
      });
       // console.log("patch done");
      });
    }
    // this.FormVega.patchValue({
     
    //   Modelname :1,
    
    //  });


    // if (this.cell.newValue !== '') {
    //   console.log(this.cell.newValue);
    //   console.log(this.cell.getValue());
    //   //console.log(this.models);
    //   //this.models.nativeElement.value = 1;
      
    // }
    
  }
getModel(){
  //console.log( this.htmlValue.nativeElement.innerText);
  return this.htmlValue.nativeElement.innerText;

}
updateValue() {
  //debugger;
  //const Model = ;
 // console.log(Model);
  // this.mm = this.FormVega.get('Modelname');
  //console.log(this.htmlValue.nativeElement.innerText);
  // console.log(this.cell.newValue);
  //console.log('mm value ',this.mm);
  // console.log(this.cell.newValue);
  // console.log(this.cell.newValue.name);

//  console.log(this.contactName.nativeElement);


//console.log(this.cell.newValue);
if(!this.cell.newValue){
  this.cell.setValue({id: this.models.nativeElement.value, name:''});
}
if(this.cell.newValue){
   this.cell.newValue.id = this.models.nativeElement.value;
}
  this.service.getModelbyId(this.models.nativeElement.value).subscribe(x=>{
    this.mod=x;
    if(this.cell.newValue){
    this.cell.newValue.name = this.mod.name ;
    }
   // console.log(this.mod);
    

  });

  // this.cell.newValue.name = this.cell.newValue.name;
 // console.log(this.cell);
}
  constructor(private formbuilder : FormBuilder ,private service : VegaService,private data: DataService) {
    super();
   // console.log('oncontstruct');
    this.FormVega = this.formbuilder.group({  
      Modelname:  ['', [Validators.required]]
    });
    
   }

  ngOnInit() {
    this.data.currentMessage.subscribe(message =>
   {
    this.message = parseInt(message);
    //console.log("this is msg from component",message);
        if(!isNaN(this.message)){    
      this.Models=this.service.ModelList(this.message);
    }
    else{     
      this.Models=null;
    }
   } );


   
  }
}
