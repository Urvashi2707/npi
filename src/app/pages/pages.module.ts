import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ServicingService} from './services/addServicing.service';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ManageComponent } from './manage/manage.component';
import { UserComponent } from './user/user.component';
import { ModalComponent } from './user/modal/modal.component';
import { Modal2Component } from './manage/modal/modal.component';
import { QueueDetailsComponent } from './queue-details/queue-details.component';
import { MaterialModule } from '.././material.module';
import { ReportsComponent } from './reports/reports.component';
import { PaymentComponent } from './payment/payment.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PausedComponent } from './paused/paused.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { CompletedComponent } from './completed/completed.component';
import { MishapsComponent } from './mishaps/mishaps.component';
import { QueueTableService } from './services/queue-table.service'; 
import { ModalPhotoComponent } from './queue-details/photo-gallery/modal-photo/modal-photo.component';
import { PhotoGalleryComponent } from './queue-details/photo-gallery/photo-gallery.component';
import { QueueTableComponent } from './queue-details/queue-table/queue-table.component';
import { SearchComponent } from './search/search.component';
import { ModalQueueComponent } from './queue-details/modal-queue/modal-queue.component';
import { ModalUploadComponent } from './queue-details/modal-upload/modal-upload.component';
import { ModalSendLinkComponent } from './queue-details/modal-send-link/modal-send-link.component'
import { ModalPickupComponent } from './queue-details/modal-pickup/modal-pickup.component';
import { ModalDropoffComponent } from './queue-details/modal-dropoff/modal-dropoff.component';
import { RouteTakenComponent } from './queue-details/route-taken/route-taken.component';
import { SuccessComponent } from './user/success/success.component';
import { ToasterModule } from 'angular2-toaster';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileComponent } from './profile/profile.component';
import { Modal4Component } from './search/modal/modal.component';
import { MatrixComponent } from './matrix/matrix.component';
import { UnconfirmedComponent } from './unconfirmed/unconfirmed.component';
import { Modal5Component } from './unconfirmed/modal5/modal5.component';
import { TitleCasePipe } from '@angular/common';
import { OptionComponent } from './dashboard/option/option.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ModalAdvComponent } from './queue-details/modal-adv/modal-adv.component';
import { OnlyNumber } from './number.directive';
import { NotcheckedinComponent } from './notcheckedin/notcheckedin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {columnPipe,rowPipe,searchPipe} from './pipe.pipe'
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreReportsComponent } from './cre-reports/cre-reports.component';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MaterialModule,
    Ng2SearchPipeModule,
    AngularMultiSelectModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgxSpinnerModule,
   
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ManageComponent,
    UserComponent,
    Modal2Component,
    ModalComponent,
    Modal4Component,
    ReportsComponent,
    PaymentComponent,
    UpcomingComponent,
    PausedComponent,
    CancelledComponent,
    CompletedComponent,
    MishapsComponent,
    QueueDetailsComponent,
    ModalPhotoComponent,
    ModalQueueComponent,
    ModalUploadComponent,
    ModalSendLinkComponent,
    RouteTakenComponent,
    PhotoGalleryComponent,
    QueueTableComponent,
    SearchComponent,
    ProfileComponent,
    MatrixComponent,
    UnconfirmedComponent,
    Modal5Component,
    SuccessComponent,
    ModalPickupComponent,
    ModalDropoffComponent,
    ModalAdvComponent,
    OnlyNumber,
    NotcheckedinComponent,
    columnPipe,rowPipe,searchPipe, CreReportsComponent
  ],
  entryComponents: [
    ModalComponent,
    ModalPhotoComponent,
    Modal2Component,
    ModalQueueComponent,
    ModalUploadComponent,Modal4Component, Modal5Component,
    ModalSendLinkComponent,
    SuccessComponent,
    ModalPickupComponent,
    ModalDropoffComponent,
    ModalAdvComponent

  ],
  providers: [
    ServicingService,
    QueueTableService,
    ToasterService,
    DatePipe,
    TitleCasePipe 
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule {
}
