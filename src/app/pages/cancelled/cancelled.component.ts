import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../services/queue-table.service';
import { ServerService } from '../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.scss']
})
export class CancelledComponent implements OnInit {

  tableData: any[];
  SearchData:string;
  public cancelled : any =[];
  RecordCount:string;
  DataPerPage:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  EndDateString: string;
  StartDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  MessageNoData:string;
  page: number = 1;
  SvcId:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;

  constructor(private spinner: NgxSpinnerService,private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private _detailsTable: QueueTableService, private _data: ServerService, private _tableService: QueueTableService, private router: Router) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      });

      var prev_url = this._tableService.getPreviousUrl();
      var curr_url = this._tableService.getCurrentUrl();
      if(curr_url === '/pages/queue-details' && prev_url === '/pages/cancelled'){
        console.log("inside if previous url");
      }
      else{
        console.log("inside else previous url");
         localStorage.removeItem('can_startDate');
        localStorage.removeItem('can_endDate');
      }

 
    
    if(localStorage.getItem('can_startDate') == null && localStorage.getItem('can_endDate') == null){
      const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var dt = new Date();
           dt.setDate( dt.getDate() - 5 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.StartDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    }
    else if(localStorage.getItem('can_startDate') == null){
      var EndDate = JSON.parse(localStorage.getItem('can_endDate'));
      this.model = JSON.parse(localStorage.getItem('can_endDate'));
      this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
      var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
    this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.StartDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    }
    else if(localStorage.getItem('can_endDate') == null){
      var StartDate = JSON.parse(localStorage.getItem('can_startDate'));
      this.model1 = JSON.parse(localStorage.getItem('can_startDate'));
      this.StartDateString = this.ngbDateParserFormatter.format(StartDate);
      const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    }
    else{
      var EndDate = JSON.parse(localStorage.getItem('can_endDate'));
      var StartDate = JSON.parse(localStorage.getItem('can_startDate'));
      this.model1 = JSON.parse(localStorage.getItem('can_startDate'));
      this.model = JSON.parse(localStorage.getItem('can_endDate'));
      this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
      this.StartDateString = this.ngbDateParserFormatter.format(StartDate);
    }

    window.onbeforeunload = function(e) {
      localStorage.removeItem('can_startDate');
      localStorage.removeItem('can_endDate');
    };
  }

  ngOnInit() {
    var prev_url = this._tableService.getPreviousUrl();
    var curr_url = this._tableService.getCurrentUrl();
    console.log("init",prev_url);
    console.log("init",curr_url);
    if(prev_url === '/pages/queue-details' && curr_url === '/pages/cancelled'){
      console.log("inside if previous url");
      // localStorage.removeItem('startDate');
      // localStorage.removeItem('endDate');
    }
    else{
      console.log("inside else previous url");
       localStorage.removeItem('can_startDate');
      localStorage.removeItem('can_endDate');
    }
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.FilterCheck(1);
  }

  //On select of End Date
  onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.EndDateString = this.ngbDateParserFormatter.format(date);
            console.log(this.EndDateString);
            localStorage.setItem('can_endDate',JSON.stringify(this.model));
        }
      }

      //On select of startDate
      onSelectStartDate(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.StartDateString = this.ngbDateParserFormatter.format(date);
            console.log(this.StartDateString);
            localStorage.setItem('can_startDate',JSON.stringify(this.model1));
        }
    }

    //Open Queue Details Page
  openQDetails(data:any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('QueueId',data.queueid)
    this._detailsTable.queueID = data.queueid;
    this.router.navigate(['/pages/queue-details']);
  }

//Sort
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

//cancelled table API call
  FilterCheck(p:number){
    this.spinner.show();
    this.page = p - 1 ;
    this.MessageNoData= null;
    var CancelledReq
    if(this.InsuranceCheck){
       CancelledReq = {
        requesttype: 'getqueueinfonewfpi',
        servicetype: '8',
        starttime: this.StartDateString,
        endtime: this.EndDateString,
        pagenumber: this.page,
        svcid:this.SvcId
      }
    }
    else{
       CancelledReq = {
        requesttype: 'getqueueinfonew',
        servicetype: '8',
        starttime: this.StartDateString,
        endtime: this.EndDateString,
        pagenumber: this.page,
        svcid:this.SvcId
      }
    }

    const CanReq = JSON.stringify(CancelledReq);
    this._data.webServiceCall(CanReq).subscribe(res => {
      console.log(res);
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
         this.cancelled = res[1].cancelled;
        this._tableService.DateFormat(this.cancelled);
        this._tableService.TimeFormat(this.cancelled);
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        this.spinner.hide();

       }}
    });
}

ngOnDestroy(){
  // var prev_url = this._tableService.getPreviousUrl();
  // var curr_url = this._tableService.getCurrentUrl();
  // console.log(prev_url);
  // console.log(curr_url);
  // if(prev_url === '/pages/queue-details' && curr_url === '/pages/cancelled'){
  //   console.log("inside if previous url");
  //   localStorage.removeItem('startDate');
  //   localStorage.removeItem('endDate');
  // }
  // else{
  //   console.log("inside else previous url");
  // }
}
}
