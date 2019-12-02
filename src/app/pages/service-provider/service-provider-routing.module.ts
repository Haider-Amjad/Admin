import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceProvidersListComponent } from './service-provider-list/service-provider-list.component';
import { ServiceProvidersBookingHistoryComponent } from './service-provider-booking-history/service-provider-booking-history.component';
import { AdminGuard } from '../../guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ServiceProvidersListComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'booking/:serviceProviderEmail',
        component: ServiceProvidersBookingHistoryComponent,
        canActivate: [AdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProvidersRoutingModule { }
