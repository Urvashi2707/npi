import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import {UserComponent} from './user.component';
// import {ModalComponent} from './modal/modal.component'; 
import { ToasterModule } from 'angular2-toaster';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
// import { SuccessComponent } from './success/success.component';
const components = [
    // ModalComponent,
    // UserComponent
];

@NgModule({
  imports: [
    ThemeModule,
    ToasterModule,
  ],
  declarations: [
    ...components,
    // SuccessComponent,
  ],
  entryComponents: [
    // ModalComponent,
  ],
  providers: [
    ToasterService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UserModule { }
