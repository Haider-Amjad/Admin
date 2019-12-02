import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaypalComponent } from './paypal/paypal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paypal/:id',
        component: PaypalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
