import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import {  NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import 'style-loader!angular2-toaster/toaster.css';

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
  key: string = 'queueid'; 
  reverse: boolean = false;
  SvcId:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;

  constructor(private spinner: NgxSpinnerService,
              private ngbDateParserFormatter: NgbDateParserFormatter, 
              private _detailsTable: QueueTableService, 
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

  FilterCheck(p:number) {
    console.log("Filter function called");
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
        console.log(res);
        this.spinner.hide();
       }}
    });
  }

}
