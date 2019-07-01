import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manageSvc/manageSvc.component';
import { UserComponent } from './user/user.component';
import { ReportsComponent } from './reports/reports.component';
import { PaymentComponent } from './payment/payment.component';
import { QueueDetailsComponent } from './queue-details/queue-details.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PausedComponent } from './paused/paused.component';
import {UpcomingrsaComponent} from './upcomingrsa/upcomingrsa.component'
import {CreReportsComponent} from './cre-reports/cre-reports.component';
import { NotcheckedinComponent } from './notcheckedin/notcheckedin.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { CompletedComponent } from './completed/completed.component';
import { MishapsComponent} from './mishaps/mishaps.component';
import { SearchComponent} from './search/search.component';
import {ProfileComponent} from './profile/profile.component';
import {MatrixComponent} from './matrix/matrix.component';
import {UnconfirmedComponent} from './unconfirmed/unconfirmed.component';

const routes: Routes = [{
  // path: '/home',
  path:'',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, 
  {
    path: 'queue-details',
    component: QueueDetailsComponent,
  },
  {
    path: 'add-booking',
    loadChildren: './add-booking/addbooking.module#AddbookingModule',
  },
  {
    path: 'Active',
    loadChildren: './Active/active.module#ActiveModule',
  },
  {
    path: 'wallet',
    loadChildren: './wallet/wallet.module#WalletModule',
  },
  {
    path: 'payment-gateway',
    loadChildren: './payment-gateway/payment-gateway.module#PaymentGatewayModule',
  },
  {
    path: 'upcoming',
    component: UpcomingComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'paused',
    component: PausedComponent,
  },
  {
    path: 'upcomingrsa',
    component: UpcomingrsaComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
   {
    path: 'notcheckedin',
    component: NotcheckedinComponent,
  },
  {
    path: 'cancelled',
    component: CancelledComponent,
  },
  {
    path: 'completed',
    component: CompletedComponent,
  },
  {
    path: 'unconfirmed',
    component: UnconfirmedComponent,
  },
  {
    path: 'mishaps',
    component: MishapsComponent,
  },
  {
    path: 'matrix',
    component: MatrixComponent,
  },
  {
  path: 'manage',
  component: ManageComponent,
},
{
path: 'user',
component: UserComponent,
},
{
  path: 'cre-reports',
    component: CreReportsComponent,
  },
{
  path: 'reports',
  component: ReportsComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
    },
{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

