import { NgModule } from '@angular/core';
// import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieService } from 'ngx-cookie-service';
// import {Authservice} from './auth.service';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthRoutingModule, routedComponents } from './auth.routing.module';
import { ForgotComponent } from './forgot/forgot.component';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {ServicingService} from '../services/addServicing.service';

@NgModule({
  imports: [
    ThemeModule,
    AuthRoutingModule,
    ToasterModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    CookieService,
    ToasterService,
    ServicingService
    // Authservice

  ],
})
export class AuthModule { }
