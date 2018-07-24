import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ServicingService} from './services/addServicing.service';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ManageComponent } from './manageSvc/manageSvc.component';
import { UserComponent } from './user/user.component';
import { ServerService } from './services/user.service';
import { EditUserComponent } from './user/modal/EditUser.component';
import { UpdateSvcComponent } from './manageSvc/modal/UpdateSvc.component';
import { QueueDetailsComponent } from './queue-details/queue-details.component';
import { MaterialModule } from '../material.module';
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
import { SearchModalComponent } from './search/modal/searchModal.component';
import { MatrixComponent } from './matrix/matrix.component';
import { UnconfirmedComponent } from './unconfirmed/unconfirmed.component';
import { ConfirmModalComponent } from './unconfirmed/modal/confirmModal.component';
import { TitleCasePipe } from '@angular/common';
import { BarRatingModule } from "ngx-bar-rating";
import { OptionComponent } from './dashboard/option/option.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { ModalAdvComponent } from './queue-details/modal-adv/modal-adv.component';
import { OnlyNumber } from './number.directive';
import { NotcheckedinComponent } from './notcheckedin/notcheckedin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {columnPipe,rowPipe,searchPipe} from './pipe.pipe'
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { UpcomingrsaComponent } from './upcomingrsa/upcomingrsa.component';
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
    BarRatingModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ManageComponent,
    UserComponent,
    UpdateSvcComponent,
    EditUserComponent,
    SearchModalComponent,
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
    ConfirmModalComponent,
    SuccessComponent,
    ModalPickupComponent,
    ModalDropoffComponent,
    ModalAdvComponent,
    OnlyNumber,
    NotcheckedinComponent,

    columnPipe,rowPipe,searchPipe, UpcomingrsaComponent,CreReportsComponent

  ],
  entryComponents: [
    EditUserComponent,
    ModalPhotoComponent,
    UpdateSvcComponent,
    ModalQueueComponent,
    ModalUploadComponent,SearchModalComponent, ConfirmModalComponent,
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
    ServerService,
    TitleCasePipe 
   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule {
}
