import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { ServicingService } from '../../services/addServicing.service';
import { Router } from '@angular/router';
import { SuccessComponent } from '../../user/success/success.component';
import {  NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import 'style-loader!angular2-toaster/toaster.css';
import { NgForm } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-neft',
  templateUrl: './add_credit.component.html',
  styleUrls: ['./add_credit.component.scss']
})
export class AddCreditComponent implements OnInit {

  //variables
  Show_online_pay_card:boolean = false;
  Show_neft_card:boolean = false;
  model: NgbDateStruct;
  payment:any = {};
  SvcId:string;
  Online_submitBtn:boolean = false;
  Neft_submitBtn:boolean = false;

  constructor(private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _data: ServerService, 
    private messageService: ServicingService,
    private _tableService: QueueTableService, 
    private router: Router) {
      const el = document.getElementById('nb-global-spinner');
      if (el) {
        el.style['display'] = 'none';
      }
      
     }

  ngOnInit() {
    const date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
  }

  showNeftTable(){
    this.payment.amount = null;
    this.Neft_submitBtn = false;
    if(document.getElementById("neft").className.match('btn1_red')) {
      document.getElementById("neft").className = 'btn1';
      }
      else {
          if(document.getElementById("online_payment").className.match('btn1_red')) {
          document.getElementById("online_payment").className = 'btn1';
        }
          document.getElementById("neft").className = 'btn1 btn1_red';
        }
        this.Show_neft_card = !this.Show_neft_card;
        this.Show_online_pay_card = false;
  }

  GoToOnline_Gateway(){
    this.payment.neft = null;
    this.payment.neftId = null;
    this.Online_submitBtn = false;
    const today = new Date();
    this.model = {day:today.getUTCDate(),month:today.getUTCMonth() + 1,year: today.getUTCFullYear() };
   if(document.getElementById("online_payment").className.match('btn1_red')) {
      document.getElementById("online_payment").className = 'btn1';
  }
  else {
    if(document.getElementById("neft").className.match('btn1_red')) {
      document.getElementById("neft").className = 'btn1';
  }
    document.getElementById("online_payment").className = 'btn1 btn1_red';
  }
  this.Show_online_pay_card = !this.Show_online_pay_card;
  this.Show_neft_card = false;
  }

  online_payment(f: NgForm){
    this.Online_submitBtn = true;
    var CurrentUser = sessionStorage.getItem('userId');
     window.open('https://m.21north.in/svcpay/' + f.value.online_pay + '/1/' +CurrentUser,"_blank");
  }

  neft_payment(f: NgForm){
    this.Neft_submitBtn = true;
    console.log(f.value.dp.day + '-' + f.value.dp.month + '-' + f.value.dp.year);
    const req_parameter = {
        requesttype: 'approval_request_prepaid',
        svcid: this.SvcId ,
        amount: f.value.neft,
        neftid: f.value.neft_id,
        neft_date: f.value.dp.year + '-' + f.value.dp.month + '-' + f.value.dp.day
    }
    const UpReq = JSON.stringify(req_parameter);
    this._data.webServiceCall(UpReq).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        if(res[0].approval[0].insertid != '0'){
          this.success("0");
          const today = new Date();
          this.model = {day:today.getUTCDate(),month:today.getUTCMonth() + 1,year: today.getUTCFullYear()};
          this.payment.neft = null;
          this.payment.neftId = null;
          // send message to subscribers via observable subject
            // this.messageService.sendMessage('8999');
        }
        else{
          this.success("1");
          const today = new Date();
          this.model = {day:today.getUTCDate(),month:today.getUTCMonth() + 1,year: today.getUTCFullYear()};
          this.payment.neft = null;
          this.payment.neftId = null;
          // this.messageService.sendMessage('8999');
        }
      }
});
  }
 
     //Success Modal
     success(res:any) {
      const activeModal = this.modalService.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'Message';
      activeModal.componentInstance.modalContent = res;
    }

}
