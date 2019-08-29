import { KeyValuePair } from './../../Classes/vehicle';
import { VegaService } from './../vega.service';
import { Component, OnInit, getDebugNode } from '@angular/core';
import { Vehicle } from 'src/Classes/vehicle';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Make } from 'src/Classes/Make.model';
import { Model } from 'src/Classes/Model.model';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE=3;
  makes1:Observable<Make[]>;
  currentMake:any;
  makes:Make[]=[];
  models:Model[]=[];
  private queryResult :any={};
  query:any={
    pageSize:this.PAGE_SIZE
  };
  columns:any[]=[
    {title:'Id'},
    {title:'Make',key:'make',isSortable:true},
    {title:'Model',key:'model',isSortable:true},
    {title:'Contact Name',key:'contactName',isSortable:true},
    {},{}
  ];
  constructor(private route :ActivatedRoute, private router : Router, private service:VegaService) { }

  ngOnInit() {
      this.populateVehicles();
      this.service.MakeList().subscribe(ff=>{ff.forEach(f=>this.makes.push(f))});
      this.makes1=this.service.MakeList();
      //console.log(this.vhs);
  }
  Edit(id){
    console.log(id);
    this.router.navigate(['/vega/'+id]);

  }
  View(id){
  //  console.log(id);
    this.router.navigate(['/view-vehicle/'+id]);

  }
  New(){
    this.router.navigate(['/vega']);
  }
  OnFilterChange(){
    this.query.page=1;
      this.populateVehicles();
    // var vehicles= this.allVehicles;
    // if(this.filter.makeId){
    //   vehicles=vehicles.filter(v=>v.make.id==this.filter.makeId);
    // }
    // if(this.filter.modelId){
    //   vehicles=vehicles.filter(v=>v.model.id==this.filter.modelId);
    // }
    // this.vhs=vehicles;
  }
  resetFilter(){
    this.query={
      page: 1,
      pageSize : this.PAGE_SIZE
    };
    this.populateVehicles(); 
  }
  private populateVehicles(){
    //console.log(this.query);
    if(this.query.MakeId!=undefined)  {
      if(this.currentMake!=this.query.MakeId){
        this.query.ModelId=null;
      } 
      this.currentMake= this.query.MakeId;
      console.log(this.currentMake);
      this.service.ModelList(this.query.MakeId).subscribe(models=>this.models=models);
    } 
    this.service.getVehicles(this.query).subscribe(result=>this.queryResult=result);
 
    if(this.query.MakeId==undefined )  this.query.ModelId=null;
     
  }
  sortBy(columnName){
    if(this.query.sortBy===columnName){
      this.query.isSortAscending=!this.query.isSortAscending;
    }
    else{
      this.query.sortBy=columnName;
      this.query.isSortAscending=true;
    }
    this.populateVehicles();
  }
  onPageChange(page){
    this.query.page=page;
    this.populateVehicles();
  }
}
