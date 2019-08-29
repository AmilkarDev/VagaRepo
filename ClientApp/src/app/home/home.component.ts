import { Vehicle, Contact } from './../../Classes/vehicle';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { VegaService } from '../vega.service';
import { CustomMakeComponent } from '../custom-make/custom-make.component';
import { CustomModelComponent } from '../custom-model/custom-model.component';
import { CustomNameComponent } from '../custom-name/custom-name.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  source: LocalDataSource; 
  
  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
    },
  };

  sets = {
    noDataMessage: 'Aucune véhicule trouvée.',
    add: {
      addButtonContent: '<i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i>', 
      createButtonContent: '<i class="fa fa-check-square fa-2x" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>',
      confirmCreate : true,
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil-square fa-2x" aria-hidden="true"></i>',
      saveButtonContent: '<i class="fa fa-check-square fa-2x" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash fa-2x" aria-hidden="true"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
       filter: true,
       editable:false,
      },
      isRegistered: {
        title: 'Registration',
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
            resetText: 'clear',
          },
        },
      },
      make: {
       title: 'Make',
       valuePrepareFunction: (make) => {
        return make.name;
      },
      editor: {
        type: 'custom',     
        component: CustomMakeComponent,       
          //list: [{ value: 'make1', title: 'make1' }, { value: 'make2', title: 'make2' }, {value: 'make3',title: 'Make3'}],       
      },
      filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [{ value: '1', title: 'make1' }, { value: '2', title: 'make2' }, {value: '3',title: 'Make3'}],
          },
        },
    },
    model: {
       title: 'Model',
       valuePrepareFunction: (model) => {
        return model.name;
      }  ,
      editor: {
        type: 'custom',
        component:  CustomModelComponent
      }, 
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: [{ value: '1', title: 'model1' }, { value: '2', title: 'model2' }, {value: '3',title: 'model3'},{value:'4',title: 'Model4-Make1'},
                  {value:'5',title:'Model5-Make2'},{value:'6',title:'Model6-Make3'}],
        },
      },
      },
    contact: {
      
      title: 'Contact',
      filter:true,
      valuePrepareFunction: (contact) => {
        return contact.name;
      }  ,
      editor: {
        
        type: 'custom',     
        component: CustomNameComponent,
        
          //list: [{ value: 'make1', title: 'make1' }, { value: 'make2', title: 'make2' }, {value: '<b>make3</b>',title: 'Make3'}],       
      }, 
      }
    }
    ,
    pager:{
      display:true,
      perPage:5
      }
  };
   dataa: Vehicle[];
  sourcem: ServerDataSource;
  message:number;
  filter: any[];
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
  constructor(http : HttpClient, private service:VegaService ,private toast : ToastrService) {
    
    this.sourcem =new ServerDataSource(http, {endPoint: 'http://localhost:65249/Api/vehicle', totalKey: 'totalItems' ,dataKey:'items',pagerLimitKey:'PageSize' , pagerPageKey:'Page'})
    console.log(this.sourcem);
    //this.filter  =[,{ field: 'ModelId', search: 3 }];
    //this.sourcem.setFilter([{ field: 'Make', search:'3' }],true);
    //this.sourcem.addFilter({ field: 'MakeId', search: 1 },true);
    //this.sourcem.setFilter([],true,false);
   // this.sourcem.refresh();
   // this.sourcem.setPaging(2,2);

  }
  onSearch(query: string = '') {
    this.sourcem.setFilter([
      // fields we want to include in the search      
      {
        field: 'contact',
        search: query
      }
    ], false); 
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
   // console.log(event);
    // if (window.confirm('Are you sure you want to delete?')) {
    //   console.log(event.data);
      if(confirm("Are you sure ?")){
        this.service.deleteVehicle(event.data.id).subscribe(x=>{
         console.log('delete done successfully');
         console.log(event);
         this.sourcem=event.source;
         this.sourcem.load(event.source);
        });
          event.confirm.resolve();
       }
    
    // } else {
    //   event.confirm.reject();
    // }
  }

  onCreateConfirm(event) {
    console.log("Create Event In Console")
    //console.log(event);
    console.log(event.newData);
    console.log('bla bla',event.newData.isRegistered);
    console.log('type', typeof(event.newData.isRegistered));
    this.vehicle.contact.name=event.newData.contact.name;
    this.vehicle.contact.phone=event.newData.contact.phone;
    this.vehicle.contact.email=event.newData.contact.email;
    if(event.newData.isRegistered=='true')
    this.vehicle.IsRegistered=true;
    else this.vehicle.IsRegistered=false;
    this.vehicle.ModelId= parseInt(event.newData.model.id);
     console.log(this.vehicle);
    var result$=this.service.create(this.vehicle);
    result$.subscribe(
       x=>{
         console.log(x);
         this.toast.success('Insert Operation done successfully !','Successful Insert');
         console.log("Insert done successfully");
         //console.log(this.vehicleSave.id);
         //this.router.navigate(['/vehicles'])

       }
      );
  }

  onSaveConfirm(event) {
    console.log("Edit Event In Console")
    //console.log(event);
    console.log(event.newData);
   this.vehicleSave.id=event.newData.id;
   this.vehicleSave.ModelId=event.newData.model.id;
   this.vehicleSave.contact.name=event.newData.contact.name;
   this.vehicleSave.contact.phone='5555';
    this.service.editVehicle(event.newData.id,this.vehicleSave).subscribe(
      x=>{console.log(x)
      this.toast.success('Update Operation done successfully !','Successful Update');
      console.log("Update done successfully");
      //console.log(this.vehicle.id);
     // this.router.navigate(['/view-vehicle/'+ this.vehicle.id])  
    });
  }
}
