import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './customers-list/customers-list.component';
import { UsersBookingHistoryComponent } from './customers-booking-history/customers-booking-history.component';
import { AdminGuard } from '../../guards/admin/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: UsersListComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'booking/:customerEmail',
        component: UsersBookingHistoryComponent,
        canActivate: [AdminGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
