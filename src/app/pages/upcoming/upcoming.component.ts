import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueTableService } from '../services/queue-table.service';
import { ListService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { defaultIfEmpty } from 'rxjs/operator/defaultIfEmpty';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'Customer Name', 'License Plate', 'Service Type', 'Date', 'Time', 'Status'];
  tableData: any[];
  keyValues: any[];
  today:string;
  term:string;
  p: number = 1;
  public upcoming : any =[];
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  futuredate:string;
  message:string;
  dataperpage:string;
  record_count:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  globalsvcid:string;
  svcid:string;
  constructor(private spinner: NgxSpinnerService,private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private _detailsTable: QueueTableService, private _data: ListService, private _tableService: QueueTableService, private router: Router) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      this.keyValues = ['queueid', 'cust_name', 'veh_number', '(select description from 21N_queue_services where id = 21N_queue.type_service)', 'queue_date', 'queue_time', 'queue_state'];
    });
    const date = new Date();
    this.model1 = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.dateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    var numberOfDays = 1;
    var dt = new Date();
         dt.setDate( dt.getDate() + 1 );
    this.model = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.dateString1 = this.model.year + '-' + this.model.month + '-' + this.model.day;
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.today)
    var days = date.setDate(date.getDate() + numberOfDays);
    // this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    // console.log(this.pastdate);
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

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  openQDetails(data:any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('clickedOn', '7')
    sessionStorage.setItem('QueueId',data.queueid)
    this._detailsTable.queueID = data.queueid;
    this.router.navigate(['/pages/queue-details']);
  }
  // openQDetails(indexId: any){
  //   sessionStorage.setItem('QueueId',this.tableData[indexId][this.keyValues[0]])
  //   sessionStorage.setItem('clickedOn', '7')
  //   this._detailsTable.queueID = this.tableData[indexId][this.keyValues[0]];
  //   this.router.navigate(['/pages/queue-details']);
  // }
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
  FilterCheck(p:number){
    // this.loading = true;
    this.spinner.show();
    this.p = p - 1 ;
    this.message = " ";
    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '6',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: this.p,
      svcid:this.svcid
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.webServiceCall(as3).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        if(res[0].pagecount[0].hasOwnProperty('noqueues')){
          console.log('No queue');
          this.message = "No Data" ;
          this.spinner.hide();
         }
         else{
          this.upcoming = res[1].upcoming;
          this.record_count = res[0].pagecount[0].record_count;
        this.dataperpage = res[0].pagecount[0].pagelimit;
        console.log(this.record_count);
        this.spinner.hide();
         }
      //   this.unconfirmed = res[1].unconfirmed;
      // console.log(this.unconfirmed);
      }
      // this._detailsTable.setTableData(res, 7);
    });
  }
}
