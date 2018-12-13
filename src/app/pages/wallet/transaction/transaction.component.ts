import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import {  NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'style-loader!angular2-toaster/toaster.css';
import {OnlinePaySuccessModalComponent} from '../Add_credit/online-pay-modal/online-pay-modal.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  //varibales

  SearchData:string;
  page: number = 1;
  tableData: any[];
  RecordCount:string;
  public transaction : any =[];
  EndDateString: string;
  StrtDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  MessageNoData:string;
  DataPerPage:string;
  key: string = 'creationdatetime'; 
  reverse: boolean = false;
  SvcId:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  sort_dir = false;

  constructor(private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private _data: ServerService, 
              private _tableService: QueueTableService, 
              private router: Router) { 
    const date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    var dt = new Date();
         dt.setDate( dt.getDate() - 7 );
    this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
  }

  ngOnInit() {
    this.sort_dir = false;
    var curr_url = this._tableService.getCurrentUrl();
    // console.log(curr_url);
    if(curr_url === '/pages/wallet/account-statement/payment/success'){
      // console.log('sucess full');
      this.success();
    }
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
    this.FilterCheck(1);
}

//sort function
// sort(key){
//   this.key = key;
//   this.reverse = !this.reverse;
// }

     //Success Modal
     success() {
      const activeModal = this.modalService.open(OnlinePaySuccessModalComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'Message';
    }

    sort_prepaid(key:any){
      this.sort_dir = true;
      this.reverse = !this.reverse;
      let pre_paid = this.transaction;
      for(var i = 0; i < pre_paid.length; i++){
        for(var k in pre_paid[i]) {
    
            if (isNaN(pre_paid [i][k]) == false){
              pre_paid[i][k] =  Math.abs(parseFloat(pre_paid[i][k]));
                  }
              }
        }
        console.log("date",typeof(pre_paid[1]['creationdatetime']));
        console.log("debit",typeof(pre_paid[1]['debit']));
        console.log("credit",typeof(pre_paid[1]['credit']));
        console.log("balance",typeof(pre_paid[1]['balance']));
        console.log("type_of_transaction",typeof(pre_paid[1]['type_of_transaction']));
        if(key == 'type_of_transaction' || key == 'creationdatetime'){
          console.log('type_of_transaction || creationdatetime')
          if(this.reverse == true){
            pre_paid.sort(function(a, b) {
              var titleA = a[key].toLowerCase(), titleB = b[key].toLowerCase();
              if (titleA < titleB) return -1;
              if (titleA > titleB) return 1;
              return 0;
          });
          }
          else{
            pre_paid.sort(function(a, b) {
              var titleA = a[key].toLowerCase(), titleB = b[key].toLowerCase();
              if (titleA < titleB) return 1;
              if (titleA > titleB) return -1;
              return 0;
          });
          }
        }
        else{
          if(this.reverse == true){
            pre_paid.sort(function(a, b) {
              return a[key] - b[key];
          });
          }
          else{
            pre_paid.sort(function(a, b) {
              return b[key] - a[key];
          });
          }
        }
     } 

  FilterCheck(p:number) {
    // console.log("Filter function called");
    this.spinner.show();
    this.page = p - 1 ;
    this.MessageNoData= "";
    const ComReq = {
      requesttype: 'getqueueinfonew',
      servicetype: '17',
      starttime: this.StrtDateString,
      endtime: this.EndDateString,
      pagenumber: this.page,
      svcid:this.SvcId
    }
    const ComRq = JSON.stringify(ComReq);
    this._data.webServiceCall(ComRq).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        this.MessageNoData = 'No Data';
        this.spinner.hide();
       }
       else{
        this.transaction = res[1].prepaid;
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        for(var i = 0; i < this.transaction.length; i++){
          this.transaction[i].debit = Math.abs(Number(this.transaction[i].debit));
        }
        this.transaction.reverse();
        this.spinner.hide();
       }}
    });
  }

}
