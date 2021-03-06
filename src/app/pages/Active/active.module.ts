import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbMenuService } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../../@theme/theme.module';
import { PickupComponent } from './pickup/pickup.component';
import { ActiveComponent } from './active.component';
import { ActiveRoutingModule, routedComponents } from './active-routing.module';
import { AtCentreComponent } from './at-centre/at-centre.component';
import { DropOffComponent } from './drop-off/drop-off.component';
import { RsaComponent } from './rsa/rsa.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ActiveRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    Ng2OrderModule
],
  declarations: [
    PickupComponent, 
    ActiveComponent, 
    AtCentreComponent, 
    DropOffComponent, 
    RsaComponent, 
    ChauffeurComponent,
  ]
})
export class ActiveModule { }
