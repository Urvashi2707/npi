/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';
import {ServerService } from './pages/services/user.service';
import { AppComponent } from './app.component';
import {ServicingService} from './pages/services/addServicing.service';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from './material.module';
import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';
import { BarRatingModule } from "ngx-bar-rating";
import {LoginComponent} from './pages/auth/login/login.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { FilterPipe} from './pages/filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import {TrendsComponent} from './trends/trends/trends.component';
import {NavbarComponent} from './trends/navbar/navbar.component';
import { TestserviceService } from './testservice.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataService } from '../app/pages/services/data.service';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [AppComponent,FilterPipe,TrendsComponent,NavbarComponent],
  imports: [
    BrowserModule,
    AngularMultiSelectModule,
    BrowserAnimationsModule,
    HttpModule,
    NgxSpinnerModule,
    AppRoutingModule,
    MaterialModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    BarRatingModule,

    NbAuthModule.forRoot({
         providers: {
           email: {
             service: NbEmailPassAuthProvider,
             config: {

             },
           },
         },
         forms: {
           login: {
     redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
     provider: 'email',  // provider id key. If you have multiple providers, or what to use your own you need to tell a component to use it here
     rememberMe: true,   // whether to show or not the `rememberMe` checkbox
     showMessages: {     // show/not show success/error messages
       success: true,
       error: true,
     },
   },
   register: {
     redirectDelay: 500,
     provider: 'email',
     showMessages: {
       success: true,
       error: true,
     },
     terms: true,
   },
   requestPassword: {
     redirectDelay: 500,
     provider: 'email',
     showMessages: {
       success: true,
       error: true,
     },
   },
   resetPassword: {
     redirectDelay: 500,
     provider: 'email',
     showMessages: {
       success: true,
       error: true,
     },
   },
   logout: {
     redirectDelay: 500,
     provider: 'email',
   },
   validation: {  // fields validation rules. The validations are shared between all forms.
     password: {
       required: true,
       minLength: 4,
       maxLength: 50,
     },
     email: {
       required: true,
     },
     fullName: {
       required: false,
       minLength: 4,
       maxLength: 50,
     },
   },
         },
       }),
  ],
  bootstrap: [AppComponent],

  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }, ServerService,CookieService, TestserviceService,ServicingService,DataService,DatePipe
  ]
})
export class AppModule {
}
