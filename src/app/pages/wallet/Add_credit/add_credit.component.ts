import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
import {OnlinePaySuccessModalComponent} from '../Add_credit/online-pay-modal/online-pay-modal.component';

declare var Razorpay: any;

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
  some_url:string;
  @ViewChild('myDiv') myDiv: ElementRef;

  constructor(private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _data: ServerService, 
    private http: HttpClient,
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
      this.http.get('https://m.21north.in/notify/rptest/pay2.php?amount=' +f.value.online_pay*100 + '&id=1&customer_id=' +CurrentUser).subscribe( OrderResponse =>{
        console.log(OrderResponse);
        var a = this;
        let  Razoroptions = {
          // "order_id": OrderResponse["order_id"],
          //TODO:remove hardcoding
          "order_id" : "order_BRcBbnGfSo8SqI",
          "amount":10099,
          "key": "rzp_test_IPS9y1GrktP0Yz",
          "name": sessionStorage.getItem('username'),
          "description": "wallet recharging",
          "image": "https:\/\/m.21north.in\/notify\/21N_logo.png",
          "handler": function (Payresponse){
              console.log("this is razorpay respnse",Payresponse)
               a.success_pay();
               document.getElementById("nb_card").click();
               f.reset();
               //a.triggerFalseClick();
              //var activeModal = function(){a.modalService.open(OnlinePaySuccessModalComponent, { size: 'lg', container: 'nb-layout' });
              // activeModal.componentInstance.modalHeader = 'Message';};
              // activeModal();
              // if (typeof Payresponse.razorpay_payment_id == 'undefined' ||  Payresponse.razorpay_payment_id < 1) {
              //    var redirect_url = '/you-owe-money.html';
              //    f.reset();
              // } else {
              //   var redirect_url = '/pages/wallet/account-statement/payment/success';
              //   const activeModal = a.modalService.open(OnlinePaySuccessModalComponent, { size: 'lg', container: 'nb-layout' });
              // activeModal.componentInstance.modalHeader = 'Message';
              //   f.reset();
              // }
              // location.href = redirect_url;
          },
          "prefill": {
              "name": sessionStorage.getItem('username'),
              "email": "test@test.com",
          },
          "notes": {
              "address": "Hello World"
          },
          "theme": {
              "color": "black"
          },
      };
      let razopay = new Razorpay(Razoroptions);
      razopay.open();
       });
  }

  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
}

      //Success Modal
      success_pay() {
        const activeModal = this.modalService.open(OnlinePaySuccessModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Message';
        console.log('i am called without click');
      }

  neft_payment(f: NgForm){
    this.Neft_submitBtn = true;
    // console.log(f.value.dp.day + '-' + f.value.dp.month + '-' + f.value.dp.year);
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
          this.Neft_submitBtn = false;
          f.reset();
            // send message to subscribers via observable subject
            // this.messageService.sendMessage('8999');
        }
        else{
          this.success("1");
          const today = new Date();
          this.model = {day:today.getUTCDate(),month:today.getUTCMonth() + 1,year: today.getUTCFullYear()};
          this.payment.neft = null;
          this.payment.neftId = null;
          this.Neft_submitBtn = false;
          f.reset();
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
