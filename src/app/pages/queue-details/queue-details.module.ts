import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule } from 'angular2-toaster';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { RouteTakenComponent } from './route-taken/route-taken.component';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule,
  ],
  exports: [],
  declarations: [],
  providers: [
    ToasterService
  ],
  entryComponents: [

  ],
})
export class QueueDetailsModule { }
