import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbMenuService } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import {PaymentGatewayRoutingModule} from './payment-gateway-routing';
import {AddBookingComponent} from './add-booking/add-booking.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {PaymentGatewayComponent} from './payment-gateway.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';
 
@NgModule({
    imports: [
      CommonModule,
      NgbModule.forRoot(),
      ThemeModule.forRoot(),
      NgxPaginationModule,
      NgxSpinnerModule,
      PaymentGatewayRoutingModule,
      Ng2SearchPipeModule,
      Ng2OrderModule
  ],
    declarations: [
        PaymentGatewayComponent,
        AddBookingComponent,
        TransactionsComponent,
        SuccessMsgComponent,
    ],
    entryComponents: [
      SuccessMsgComponent,
    ],
  })
  export class PaymentGatewayModule { }