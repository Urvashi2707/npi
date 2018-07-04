import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { QueueTableService } from '../../services/queue-table.service';
import { ListService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'Pickup Slot', 'Customer Name', 'License Plate', 'CRE', 'Status'];
  tableData: any[];
  keyValues: any[];
  term:string;
  record_count:string;
  dataperpage:string;
  public pickup : any =[];
  p:number=1;
  today:string;
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  pastdate:string;
  message:string;
  globalsvcid:string;
  svcid:string;

  key: string = 'id'; 
  reverse: boolean = false;

  constructor(private spinner: NgxSpinnerService,private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private _detailsTable: QueueTableService, private _data: ListService, private _tableService: QueueTableService, private router: Router) {

    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      this.keyValues = ['queueid', 'queue_time', 'cust_name', 'veh_number', 'cre_name', 'queue_status'];
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
    // this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    // this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    // console.log(this.today)
    
    // var days = date.setDate(date.getDate() - numberOfDays);
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
  openQDetails(indexId: any){
    sessionStorage.removeItem('clickedOn');

    sessionStorage.setItem('QueueId',indexId)
    this._detailsTable.queueID = indexId;
    this.router.navigate(['/pages/queue-details']);
  }

  FilterCheck(p:number){
    this.message=" ";
    this.spinner.show();
    this.p = p - 1 ;

    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '0',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber:this.p,
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

      console.log(res);

      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
        this.spinner.hide();
       }
       else{
        this.pickup = res[1].activepickup;
        console.log(this.pickup);
        this.record_count = res[0].pagecount[0].record_count;
        this.dataperpage = res[0].pagecount[0].pagelimit;
        console.log(this.record_count);
        this.spinner.hide();
        for (let j = 0; j < this.pickup.length ; j++){
        var queuetime = this.pickup[j].queue_time;
        var date = queuetime.replace( /\n/g, " " ).split( " " );
        var newDate = this.datePipe.transform(date[0],"d MMM,y");
        var timeString = date[1];
        var H = +timeString.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;
        this.pickup[j].newtime = timeString;
        this.pickup[j].newdate = newDate;
       }
    }


}
});
  }
}

