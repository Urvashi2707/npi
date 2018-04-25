import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {LoginComponent} from './pages/auth/login/login.component';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  {path : 'auth' , loadChildren: 'app/pages/auth/auth.module#AuthModule'},
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate:[AuthGuard]},
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
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
