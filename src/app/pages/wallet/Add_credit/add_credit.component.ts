import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import {  NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import 'style-loader!angular2-toaster/toaster.css';
import { NgForm } from '@angular/forms';

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
  Online_submitBtn:boolean = false;
  Neft_submitBtn:boolean = false;

  constructor(private spinner: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter, 
    private _detailsTable: QueueTableService, 
    private _data: ServerService, 
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
  }

  showNeftTable(){
    this.payment.amount = null;
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
    console.log(f.value);
  }
 

}
