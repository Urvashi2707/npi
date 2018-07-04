import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthRoutingModule, routedComponents } from './auth.routing.module';
import { ToasterModule } from 'angular2-toaster';
import { ToasterService} from 'angular2-toaster';
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
  ],
})
export class AuthModule { }
