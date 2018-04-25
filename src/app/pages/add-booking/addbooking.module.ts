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
import { Modal1Component } from './modal/modal1/modal1.component';
import { ToasterModule } from 'angular2-toaster';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { OnlyNumber } from '../number.directive';
import { Modal3Component } from './modal/modal2/modal2.component';
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
      Modal1Component,
      Modal3Component
      // ModalComponent,

  ],
  providers: [
    ServicingService,
    ChauffeurService,
    ToasterService,
    {provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('yyyy-MM-dd')}
  ],
  entryComponents: [
    Modal1Component,
    Modal3Component
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddbookingModule { }
