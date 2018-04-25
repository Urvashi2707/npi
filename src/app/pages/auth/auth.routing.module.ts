import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
const routes: Routes = [{
        path: '',
        component: AuthComponent,
        children: [{
                        path: '',
                        component: LoginComponent
                    },{
                        path: 'login',
                        component: LoginComponent
                    }, {
                        path: 'forgot',
                        component: ForgotComponent
                    }, 
                    {
                        path: 'logout',
                        component: LogoutComponent
                    },  {
                        path: '',
                        redirectTo: 'login',
                        //pathMatch: 'full',
                 }],
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }

export const routedComponents = [
  LoginComponent,
  AuthComponent,
  ForgotComponent,
  LogoutComponent
];
