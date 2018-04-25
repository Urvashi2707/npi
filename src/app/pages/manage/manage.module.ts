import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
// import {ManageComponent} from './manage.component';
// import {Modal2Component} from './modal/modal.component'; 

const components = [
  
    
];

@NgModule({
  imports: [
    ThemeModule,
    
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
 
  ],
})
export class ManageModule { }