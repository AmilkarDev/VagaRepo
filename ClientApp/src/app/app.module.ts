import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { PhotoService } from './shared/photo.service';
import { AppErrorHandler } from './../app.error-handler';
import { VegaService } from './vega.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VegaComponent } from './vega/vega.component';
import {ToastrModule} from 'ngx-toastr';
import { NoopAnimationsModule  } from '@angular/platform-browser/animations';
import * as Raven from 'raven-js';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './shared/pagination.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { BrowserXhr } from '@angular/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomMakeComponent } from './custom-make/custom-make.component';
import { CustomModelComponent } from './custom-model/custom-model.component';
import { DataService } from './data.service';
import { CustomNameComponent } from './custom-name/custom-name.component';


Raven.config('https://3e127bedad044e55b5e037839a953bf6@sentry.io/1491364').install();
@NgModule({
  declarations: [
    AppComponent,
    CustomMakeComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VegaComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    CustomModelComponent,
    CustomNameComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NoopAnimationsModule ,
    Ng2SmartTableModule,
    RouterModule.forRoot([
      { path: '',redirectTo:'vehicles', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'vega', component: VegaComponent },
      { path: 'vega/:id', component: VegaComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'view-vehicle/:id', component: ViewVehicleComponent }
    ])
  ],
  providers: [
    {provide: ErrorHandler, useClass : AppErrorHandler},
    {provide: BrowserXhr, useClass : BrowserXhrWithProgress},
    VegaService,PhotoService,ProgressService,DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CustomMakeComponent,CustomModelComponent,CustomNameComponent],
})
export class AppModule { }
