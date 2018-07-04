import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueTableService } from '../services/queue-table.service';
import { ListService } from '../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-cancelled',
  templateUrl: './cancelled.component.html',
  styleUrls: ['./cancelled.component.scss']
})
export class CancelledComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'Customer Name', 'License Plate','Slot','CRE', 'Reason', 'Cancelled By'];
  tableData: any[];
  keyValues: any[];
  term:string;
  public cancelled : any =[];
  today:string;
  record_count:string;
  dataperpage:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  message:string;
  pastdate:string;
  p: number = 1;
  searchText:string;

  svcadmin:string;
  checksvcadmin :boolean;
  checkgrpadmin :boolean;
  globalsvcid:string;
  groupadmin:string;
  svcid:string;
  constructor(private spinner: NgxSpinnerService,private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private _detailsTable: QueueTableService, private _data: ListService, private _tableService: QueueTableService, private router: Router) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      this.keyValues = ['queueid', 'cust_name', 'veh_number', 'queue_time', 'cre_name', 'pause_reason', 'paused_by'];
    });
    const date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.dateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    var numberOfDays = 5;
    var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
    this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.dateString1 = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.today)
    var days = date.setDate(date.getDate() - numberOfDays);
    this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    console.log(this.pastdate);
  }

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      // console.log(sessionStorage.getItem('selectedsvc'));
      this.svcid = sessionStorage.getItem('selectedsvc');
      // console.log(this.svcid);
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      // console.log(this.svcid);
    }
    this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    console.log(this.globalsvcid);
    this.FilterCheck(1);
  }
  onSelectDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.dateString = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString);
        }
        

  }

  onSelectDate1(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.dateString1 = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString1);
        }
        

  }
  // openQDetails(indexId: any){
  //   sessionStorage.removeItem('clickedOn');
  //   sessionStorage.setItem('QueueId',this.tableData[indexId][this.keyValues[0]])
  //   this._detailsTable.queueID = this.tableData[indexId][this.keyValues[0]];
  //   this.router.navigate(['/pages/queue-details']);
  // }

  openQDetails(data:any){
    sessionStorage.removeItem('clickedOn');

    sessionStorage.setItem('QueueId',data.queueid)
    this._detailsTable.queueID = data.queueid;
    this.router.navigate(['/pages/queue-details']);
  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  FilterCheck(p:number){
    // this.loading = true;
    this.spinner.show();
    this.p = p - 1 ;
    this.message= "";
    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '8',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: this.p,
      svcid:this.svcid
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.webServiceCall(as3).subscribe(res => {
      console.log(res);
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{

      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
        this.spinner.hide();
       }
       else{
         this.cancelled = res[1].cancelled;
        console.log(this.cancelled);
        for (let j = 0; j < this.cancelled.length ; j++){
        var queuetime = this.cancelled[j].queue_time;
        var date = queuetime.replace( /\n/g, " " ).split( " " );
        var newDate = this.datePipe.transform(date[0],"d,MMM,y");
        var timeString = date[1];
        var H = +timeString.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        this.cancelled[j].newtime = timeString;
        this.cancelled[j].newdate = newDate;
        }
        

        this.record_count = res[0].pagecount[0].record_count;
          this.dataperpage = res[0].pagecount[0].pagelimit;
          console.log(this.record_count);
          this.spinner.hide();
       }}
      // this._detailsTable.setTableData(res, 9);
    });
  }
}
