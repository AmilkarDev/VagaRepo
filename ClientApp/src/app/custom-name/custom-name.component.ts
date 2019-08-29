import { parseHttpResponse } from 'selenium-webdriver/http';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  template:`
   <input [ngClass]="inputClass" class="form-control" #contactName [placeholder]="cell.getTitle()"
          [name]="cell.getId()"    
            [disabled]="!cell.isEditable()"
            
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">
   <input [ngClass]="inputClass" class="form-control" #contactEmail [placeholder]="cell.getTitle()"
            [name]="cell.getId()"    
              [disabled]="!cell.isEditable()"
              
              (click)="onClick.emit($event)"
              (keyup)="updateValue()"
              (keydown.enter)="onEdited.emit($event)"
              (keydown.esc)="onStopEditing.emit()">  
   <input [ngClass]="inputClass" class="form-control" #contactPhone [placeholder]="cell.getTitle()"
          [name]="cell.getId()"    
            [disabled]="!cell.isEditable()"
            
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">       
    <div [hidden]="true" [innerHTML]="cell.getValue()" #name></div>
    <div [hidden]="true" [innerHTML]="cell.getValue()" #email></div>
    <div [hidden]="true" [innerHTML]="cell.getValue()" #phone></div>
  `
})
export class CustomNameComponent extends DefaultEditor implements AfterViewInit {
  @ViewChild('contactName', { static: false }) contactName: ElementRef;
  @ViewChild('contactEmail', { static: false }) contactEmail: ElementRef;
  @ViewChild('contactPhone', { static: false }) contactPhone: ElementRef;

  @ViewChild('name', { static: false }) name: ElementRef;
  @ViewChild('email', { static: false }) email: ElementRef;
  @ViewChild('phone', { static: false }) phone: ElementRef;
  ngAfterViewInit(): void {
    //console.log('htmlValues value ', this.cell.newValue);
    if (this.cell.newValue !== '') {
      console.log(this.cell);
      this.contactName.nativeElement.value = this.cell.newValue.name;
      this.contactPhone.nativeElement.value = this.cell.newValue.phone;
      this.contactEmail.nativeElement.value = this.cell.newValue.email;
    }
    // else {
    //   this.cell.newValue.name='name goes here'
    // }
  }
  updateValue() {
    const name = this.contactName.nativeElement.value;
    const email = this.contactEmail.nativeElement.value;
    const phone = this.contactPhone.nativeElement.value;
    if(!this.cell.newValue){
      this.cell.setValue({name:'', phone:'', email:''});
    }
    //console.log(this.cell.newValue);
    
    //console.log(this.cell.newValue);
  if(this.cell.newValue){
    //console.log(this.cell.newValue);
    this.cell.newValue.name = name;
    this.cell.newValue.email= email;
    this.cell.newValue.phone=phone;
    this
  }
    
  }

  getUrlName(): string {
    //console.log(this.name.nativeElement.innerText);
    return this.name.nativeElement.innerText;
  }
  getEmail(): string {
    //console.log(this.email.nativeElement.innerText);

    return this.email.nativeElement.innerText;
  }
  getPhone(): string {
//console.log(this.phone.nativeElement.innerText);

    return this.phone.nativeElement.innerText;
  }
  constructor() { super();}

  ngOnInit() {
  }

}
