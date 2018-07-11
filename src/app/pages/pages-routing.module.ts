import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage/manage.component';
import { UserComponent } from './user/user.component';
import { ReportsComponent } from './reports/reports.component';
import { PaymentComponent } from './payment/payment.component';
import { QueueDetailsComponent } from './queue-details/queue-details.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PausedComponent } from './paused/paused.component';
import {CreReportsComponent} from './cre-reports/cre-reports.component';

import { NotcheckedinComponent } from './notcheckedin/notcheckedin.component'
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
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
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
  },{
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  },
  {
    path: 'matrix',
    component: MatrixComponent,
  },
  // {
  //   path: 'user',
  //   loadChildren: './user/user.module#UserModule',
  // },
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
