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
        }
      }

      //On select of End Date
      onSelectEndDate(date: NgbDateStruct){
        if (date != null) {
                this.model = date;
                this.EndDateString = this.ngbDateParserFormatter.format(date);
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
