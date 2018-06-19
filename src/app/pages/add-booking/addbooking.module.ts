import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import {ServicingService} from './../services/addServicing.service';
import {ChauffeurService} from './../services/chauffeur.service';
import { ServicingComponent } from './servicing/servicing.component';
import { RsaComponent } from './rsa/rsa.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import {AddbookingRoutingModule , routedComponents} from './addbooking-routing.module'
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from './ngb-date-fr-parser-formatter';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BookingDetails } from './modal/BookingDetails/BookingDetails.component';
import { ToasterModule } from 'angular2-toaster';
import {NgbModal,NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { OnlyNumber } from '.././number.directive';
import { AddEmployee } from './modal/AddEmployee/AddEmployee.component';
// import { ModalComponent } from './modal/modal.component';
@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    AddbookingRoutingModule,
    AngularMultiSelectModule,
    ToasterModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ServicingComponent,
    RsaComponent,
    ChauffeurComponent,
      ...routedComponents,
      BookingDetails,
      AddEmployee,
     
      // ModalComponent,

  ],
  providers: [
    ServicingService,
    ChauffeurService,
    ToasterService,
    NgbActiveModal,
    {provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('yyyy-MM-dd')}
  ],
  entryComponents: [
    BookingDetails,
    AddEmployee
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddbookingModule { }
