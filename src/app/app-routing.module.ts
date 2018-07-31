import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './pages/auth/auth.guard';
import {TrendsComponent} from './trends/trends/trends.component';
const routes: Routes = [
  {path : 'auth' , loadChildren: 'app/pages/auth/auth.module#AuthModule'},
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate:[AuthGuard]},
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path : 'trend', component:TrendsComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {
}
