import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbMenuService } from '@nebular/theme';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe'; 
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import {AddCreditComponent} from './Add_credit/add_credit.component';
import {NeftComponent} from './neft/neft.component';
import {TransactionComponent} from './transaction/transaction.component';
import { WalletRoutingModule} from './wallet-routing.module';
import { WalletComponent } from './wallet.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule,
    WalletRoutingModule,
    Ng2SearchPipeModule,
    Ng2OrderModule
],
  declarations: [
    AddCreditComponent,
    NeftComponent,
    TransactionComponent,
    WalletComponent
  ]
})
export class WalletModule { }
