import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../services/queue-table.service';
import { ServerService } from '../services/user.service';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-upcomingrsa',
  templateUrl: './upcomingrsa.component.html',
  styleUrls: ['./upcomingrsa.component.scss']
})
export class UpcomingrsaComponent implements OnInit {

  tableData: any[];
  page: number = 1;
  public upcoming : any =[];
  StrtDateString: string;
  EndDateString: string;
  SearchData:string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  MessageNoData:string;
  DataPerPage:string;
  RecordCount:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  SvcId:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;

  constructor(private spinner: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private _data: ServerService, 
    private _tableService: QueueTableService, 
    private router: Router) 
    { 
this._tableService.clickedID.subscribe(value => {
this.tableData = _tableService.table_data;
});
   var prev_url = this._tableService.getPreviousUrl();
    var curr_url = this._tableService.getCurrentUrl();
    console.log(prev_url);
    console.log(curr_url);
    if(curr_url === '/pages/queue-details' && prev_url === '/pages/upcomingrsa'){
      console.log("inside if previous url");
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
    }
    else{
      console.log("inside else previous url");
    }


if(localStorage.getItem('startDate') == null && localStorage.getItem('endDate') == null){
  const date = new Date();
  this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
  this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
  var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
  this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
  this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
}
else if(localStorage.getItem('startDate') == null){
  var EndDate = JSON.parse(localStorage.getItem('endDate'));
  this.model = JSON.parse(localStorage.getItem('endDate'));
  this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
  const date = new Date();
this.model1 = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
}
else if(localStorage.getItem('endDate') == null){
  var StartDate = JSON.parse(localStorage.getItem('startDate'));
  this.model1 = JSON.parse(localStorage.getItem('startDate'));
  this.StrtDateString = this.ngbDateParserFormatter.format(StartDate);
  var numberOfDays = 1;
var dt = new Date();
         dt.setDate( dt.getDate() + numberOfDays );
this.model = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
}
else{
  var EndDate = JSON.parse(localStorage.getItem('endDate'));
  var StartDate = JSON.parse(localStorage.getItem('startDate'));
  this.model1 = JSON.parse(localStorage.getItem('startDate'));
  this.model = JSON.parse(localStorage.getItem('endDate'));
  this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
  this.StrtDateString = this.ngbDateParserFormatter.format(StartDate);
}

window.onbeforeunload = function(e) {
  console.log("page refreshed");
  localStorage.removeItem('startDate');
  localStorage.removeItem('endDate');
};
}

ngOnInit() {
     var prev_url = this._tableService.getPreviousUrl();
    var curr_url = this._tableService.getCurrentUrl();
    console.log(prev_url);
    console.log(curr_url);
    if(prev_url === '/pages/queue-details' && curr_url === '/pages/upcomingrsa'){
      console.log("inside if previous url");
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
    }
    else{
      console.log("inside else previous url");
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

  //Sort
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Open Queue Details Page
  openQDetails(data:any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('clickedOn', '7')
    sessionStorage.setItem('QueueId',data.queueid)
    this._tableService.queueID = data.queueid;
    this.router.navigate(['/pages/queue-details']);
  }

  //On select of startDate
  onSelectStartDate(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.StrtDateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('startDate',JSON.stringify(this.model1));
        }
      }

      //On select of End Date
  onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.EndDateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('endDate',JSON.stringify(this.model));
        }
       }

       //Upcoming table API call
  FilterCheck(p:number){
    this.spinner.show();
    this.page = p - 1 ;
    this.MessageNoData = null;
    var NotCheckedInReq
    if(this.InsuranceCheck){
       NotCheckedInReq = {
         requesttype: 'getqueueinfonewfpi',
         servicetype: '15',
         starttime: this.StrtDateString,
         endtime: this.EndDateString,
         pagenumber: this.page,
         svcid:this.SvcId
       }
    }
    else{
       NotCheckedInReq = {
         requesttype: 'getqueueinfonew',
         servicetype: '15',
         starttime: this.StrtDateString,
         endtime: this.EndDateString,
         pagenumber: this.page,
         svcid:this.SvcId
       }
    }
    const UpReq = JSON.stringify(NotCheckedInReq);
    this._data.webServiceCall(UpReq).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        if(res[0].pagecount[0].hasOwnProperty('noqueues')){
          this.MessageNoData = "No Data" ;
          this.spinner.hide();
         }
         else{
        this.upcoming = res[1].upcoming;
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        this.spinner.hide();
        this._tableService.DateFormat(this.upcoming);
        this._tableService.TimeFormat(this.upcoming);
      }
    }
  });
  }

  ngOnDestroy(){
    // var prev_url = this._tableService.getPreviousUrl();
    // var curr_url = this._tableService.getCurrentUrl();
    // console.log(prev_url);
    // console.log(curr_url);
    // if(prev_url === '/pages/queue-details' && curr_url === '/pages/upcomingrsa'){
    //   console.log("inside if previous url");
    //   localStorage.removeItem('startDate');
    //   localStorage.removeItem('endDate');
    // }
    // else{
    //   console.log("inside else previous url");
    // }
  }

}
