import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCreditComponent } from './Add_credit/add_credit.component';
import { NeftComponent } from './neft/neft.component';
import { TransactionComponent } from './transaction/transaction.component';
import { WalletComponent } from './wallet.component';


const routes: Routes = [{
  path: '',
  component: WalletComponent,
  children: [
  {
    path: 'add-credit',
    component: AddCreditComponent,
  }, 
  {
    path: 'pending-approval',
    component: NeftComponent,
  },
  {
    path: 'account-statement/payment/success',
    component: TransactionComponent,
  },
  {
    path: 'account-statement',
    component: TransactionComponent,
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WalletRoutingModule { }

export const routedComponents = [
    AddCreditComponent,
    NeftComponent,
    TransactionComponent

]
