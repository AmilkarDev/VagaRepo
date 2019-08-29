import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VegaService } from '../vega.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Make } from 'src/Classes/Make.model';
import { Observable } from 'rxjs';
import { DefaultEditor } from 'ng2-smart-table';
import { Model } from 'src/Classes/Model.model';
import { DataService } from '../data.service';

@Component({
  template: `
  <form  [formGroup]="FormVega" (ngSubmit)="submit()" novalidate>  
    <div>   
        
        <select  class="form-control" #makes formControlName="Makename"  (change)="ListModels();"
         [ngClass]="inputClass"
         [name]="cell.getId()"    
          
    
          (click)="onClick.emit($event)"
          (keyup)="updateValue()"
          (keydown.enter)="onEdited.emit($event)"
          (keydown.esc)="onStopEditing.emit()">  
        <option value="">--Select--</option>  
        <option *ngFor="let Make of Makes | async" value={{Make.id}}>  
            {{Make.name}}  
        </option>  
        </select>  
        <div class="alert alert-danger" *ngIf="submitted && f.Makename.errors">
        <div *ngIf="f.Makename.errors.required">please specify the make.</div>
        </div>
    </div>  
</form>
<div [hidden]="true" [innerHTML]="cell.getValue()" #htm></div>
  `

})
export class CustomMakeComponent extends DefaultEditor implements AfterViewInit {
  Makes: Observable<Make[]>;
  listMakes : any= ["Make1","Make2","Make3"];
  FormVega: any;
  submitted = false;
  MakeId: any;
  make: Make;
  Models: Observable<Model[]>;
  message:string;
  @ViewChild('makes', { static: false }) makes: ElementRef;
  @ViewChild('htm', { static: false }) htmlValue: ElementRef;
  constructor( private formbuilder : FormBuilder ,private service : VegaService,private data: DataService) { 
    super();
    this.ListMakes();
    this.FormVega = this.formbuilder.group({  
      Makename:  ['', [Validators.required]]
    });
  }
  ngAfterViewInit() {
    if(this.cell.getValue()){
      //this.message=this.cell.newValue.id;
      this.data.changeMessage(this.cell.newValue.id);

      setTimeout(() => {
        //this.Models=this.service.ModelList(3);
      this.FormVega.patchValue({
       Makename : this.cell.newValue.id,
      });
      });
    }   
  }
  
  getMake(){
    return this.htmlValue.nativeElement.innerText; 
  }
  updateValue(){
  
  }
  ngOnInit(){
    this.data.currentMessage.subscribe(message => this.message = message)
  }
  ListModels(){
    this.MakeId=this.FormVega.get('Makename').value;
    this.data.changeMessage(this.MakeId);
   // console.log(this.cell.newValue);
    if(!this.cell.newValue){
      this.cell.setValue({id: this.makes.nativeElement.value, name:''});
    }
    if(this.cell.newValue){
      this.cell.newValue.id = this.makes.nativeElement.value;
    }
    this.service.getMakeById(this.makes.nativeElement.value).subscribe(x=>{
      this.make=x;
      //debugger;
      if(this.cell.newValue){
      this.cell.newValue.name = this.make.name ; 
      }
      //this.cell.newValue.id = this.make.Id;
      //debugger;
     // console.log(this.make);
    });

  }
  ListMakes()  
  {  
    this.Makes=this.service.MakeList();  
  }  
  get f() { return this.FormVega.controls; }
  }



  

