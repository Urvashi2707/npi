import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddBookingComponent} from './add-booking/add-booking.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {PaymentGatewayComponent} from './payment-gateway.component';


const routes: Routes = [{
  path: '',
  component: PaymentGatewayComponent,
  children: [
  {
    path: 'Add Booking',
    component: AddBookingComponent,
  }, 
  {
    path: 'Transactions',
    component: TransactionsComponent,
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PaymentGatewayRoutingModule { }

export const routedComponents = [
    AddBookingComponent,
    TransactionsComponent

]