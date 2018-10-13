import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import {ServicingService} from '../services/addServicing.service';
import {ChauffeurService} from '../services/chauffeur.service';
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
import { OnlyNumber } from '../number.directive';
import { AddEmployee } from './modal/AddEmployee/AddEmployee.component';
import { MapComponent } from './map/map.component';
import { DecimalPipe } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { GooglePlacesDirective } from '../../pages/google-place.directive';
// import { ModalComponent } from './modal/modal.component';
@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    AddbookingRoutingModule,
    AngularMultiSelectModule,
    ToasterModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCbH3ty6Z6iOWfu6hxrlgs4JRc6jYa0piI',
      language: 'en',
      libraries: ["places"]
      }),
  ],
  declarations: [
    ServicingComponent,
    RsaComponent,
    ChauffeurComponent,
      ...routedComponents,
      BookingDetails,
      AddEmployee,
      MapComponent,
      GooglePlacesDirective
      // ModalComponent,

  ],
  providers: [
    ServicingService,
    ChauffeurService,
    ToasterService,
    NgbActiveModal,
    DecimalPipe,
    {provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('yyyy-MM-dd')}
  ],
  entryComponents: [
    BookingDetails,
    AddEmployee
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddbookingModule { }
