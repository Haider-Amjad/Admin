import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { ServiceProvidersRoutingModule } from './service-provider-routing.module';
import { ServiceProvidersListComponent } from './service-provider-list/service-provider-list.component';
import { ServiceProvidersEditComponent } from './service-provider-edit/service-provider-edit.component';
import { ServiceProvidersBookingHistoryComponent } from './service-provider-booking-history/service-provider-booking-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ServiceProvidersListComponent, ServiceProvidersEditComponent, ServiceProvidersBookingHistoryComponent],
  imports: [
    DataTablesModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceProvidersRoutingModule
  ],
  entryComponents: [ServiceProvidersEditComponent]
})
export class ServiceProvidersModule { }
