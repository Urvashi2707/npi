import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { QueueDetailsComponent } from './queue-details.component';
// import { ModalPhotoComponent } from './photo-gallery/modal-photo/modal-photo.component';
// import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
// import { QueueTableComponent } from './queue-table/queue-table.component';
// import { ModalQueueComponent } from './modal-queue/modal-queue.component';
// import { ModalUploadComponent } from './modal-upload/modal-upload.component'
import { ToasterModule } from 'angular2-toaster';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { RouteTakenComponent } from './route-taken/route-taken.component';
// import { ModalAdvComponent } from './modal-adv/modal-adv.component';

@NgModule({
  imports: [
    CommonModule,
    ToasterModule,
  ],
  exports: [
    // PhotoGalleryComponent,
  ],
  declarations: [
    // QueueDetailsComponent,
    // QueueTableComponent, 
    // ModalQueueComponent,
    //  ModalUploadComponent, 
    //  RouteTakenComponent, 
    //  ModalAdvComponent
  ],
  providers: [
    ToasterService
  ],
  entryComponents: [

  ],
})
export class QueueDetailsModule { }
