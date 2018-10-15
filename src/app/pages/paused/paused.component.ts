import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../services/queue-table.service';
import { ServerService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paused',
  templateUrl: './paused.component.html',
  styleUrls: ['./paused.component.scss']
})
export class PausedComponent implements OnInit {

  tableData: any[];
  SearchData:string;
  RecordCount:string;
  DataPerPage:string;
  page:number;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  public paused : any =[];
  MessageNoData:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  StrtDateString: string;
  EndDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  SvcId:string;
  
  constructor(private spinner: NgxSpinnerService,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              private _detailsTable: QueueTableService,
              private _data: ServerService,
              private _tableService: QueueTableService,
              private router: Router) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
    });
    const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.StrtDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var dt = new Date();
           dt.setDate( dt.getDate() - 5 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.EndDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
      console.log("pehle se",this.model);
      console.log(localStorage.getItem('startDate'));
      if(localStorage.getItem('startDate') == null && localStorage.getItem('endDate') == null){
        console.log("not changed");
        const date = new Date();
        this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
        this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
        var dt = new Date();
             dt.setDate( dt.getDate() - 5 );
        this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
        this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
      }
      else if(localStorage.getItem('startDate') == null){
        console.log("Start Date Changed");
        var EndDate = JSON.parse(localStorage.getItem('endDate'));
        this.model = JSON.parse(localStorage.getItem('endDate'));
      }
      else if(localStorage.getItem('endDate') == null){
        console.log("End Date Changed");
        var StartDate = JSON.parse(localStorage.getItem('startDate'));
        this.model1 = JSON.parse(localStorage.getItem('startDate'));
      }
      else{
        console.log("both changed");
        console.log(localStorage.getItem('startDate'));
        console.log(localStorage.getItem('endDate'));
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

  //Paused table API call
  FilterCheck(p:number){
    this.spinner.show();
    this.page = p - 1 ;
    this.MessageNoData= "";
    const PausedReq = {
      requesttype: 'getqueueinfonew',
      servicetype: '7',
      starttime: this.StrtDateString,
      endtime: this.EndDateString,
      ppagenumber: this.page,
      svcid:this.SvcId
    }
    const PauseRq = JSON.stringify(PausedReq);
    this._data.webServiceCall(PauseRq).subscribe(res => {
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
          this.paused = res[1].paused;
          this.RecordCount = res[0].pagecount[0].record_count;
          this.DataPerPage = res[0].pagecount[0].pagelimit;
          this.spinner.hide();
          this._tableService.DateFormat(this.paused);
          this._tableService.TimeFormat(this.paused);
         }
    }
  });

  }
}
