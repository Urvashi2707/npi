import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueTableService } from '../services/queue-table.service';
import { ServerService } from '../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-mishaps',
  templateUrl: './mishaps.component.html',
  styleUrls: ['./mishaps.component.scss']
})
export class MishapsComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'Date of Mishap', 'Customer Name', 'License Plate','Estimate', 'Status'];
  tableData: any[];
  keyValues: any[];
  term:string;
  p:number = 1;
  record_count:string;
  dataperpage:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  public mishap : any =[];
  today:string;
  VehicleFlag:boolean = false;
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  pastdate:string;
  message:string;
  globalsvcid:string;
  svcid:string;
  constructor(private spinner: NgxSpinnerService,private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private _detailsTable: QueueTableService, private _data: ServerService, private _tableService: QueueTableService, private router: Router) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      this.keyValues = ['queueid', 'date_of_mishap', 'cust_name', 'veh_number', 'amount', 'mishap_status'];
    });
   
    
    if(localStorage.getItem('mis_startDate') == null && localStorage.getItem('mis_endDate') == null){
      const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.dateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var dt = new Date();
           dt.setDate( dt.getDate() - 14 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.dateString1 = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    }
    else if(localStorage.getItem('mis_startDate') == null){
      var EndDate = JSON.parse(localStorage.getItem('mis_endDate'));
      this.model = JSON.parse(localStorage.getItem('mis_endDate'));
      this.dateString = this.ngbDateParserFormatter.format(EndDate);
      var dt = new Date();
         dt.setDate( dt.getDate() - 14 );
    this.model1= { day:dt.getDate(), month: dt.getMonth() + 1, year: dt.getFullYear()};
    this.dateString1 = this.model1.year + '-' + this.model1.month + '-' + this.model1.day
    const date = new Date();
    var numberOfDays = 14;
    var days = date.setDate(date.getDate() - numberOfDays);
    this.dateString1 = this.datePipe.transform(days,"yyyy-MM-dd");
    }
    else if(localStorage.getItem('mis_endDate') == null){
      var StartDate = JSON.parse(localStorage.getItem('mis_startDate'));
      this.model1 = JSON.parse(localStorage.getItem('mis_startDate'));
      console.log(StartDate);
      this.dateString1 = this.ngbDateParserFormatter.format(StartDate);
      const date = new Date();
      this.model = {day:date.getDate(),month:date.getMonth() + 1,year: date.getFullYear() };
      this.dateString = this.model.year + '-' + this.model.month + '-' + this.model.day;

    }
    else{
      var EndDate = JSON.parse(localStorage.getItem('mis_endDate'));
      var StartDate = JSON.parse(localStorage.getItem('mis_startDate'));
      this.model1 = JSON.parse(localStorage.getItem('mis_startDate'));
      this.model = JSON.parse(localStorage.getItem('mis_endDate'));
      this.dateString = this.ngbDateParserFormatter.format(EndDate);
      this.dateString1 = this.ngbDateParserFormatter.format(StartDate);
    }

    window.onbeforeunload = function(e) {
      localStorage.removeItem('mis_startDate');
      localStorage.removeItem('mis_endDate');
    };
  }

  ngOnInit() {
    var prev_url = this._detailsTable.getPreviousUrl();
    var curr_url = this._detailsTable.getCurrentUrl();
    if(prev_url === '/pages/queue-details' && curr_url === '/pages/mishaps'){
      localStorage.removeItem('mis_startDate');
      localStorage.removeItem('mis_endDate');
    }
  
    else{
      console.log("inside else previous url");
    }
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    this.FilterCheck(1);
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  onSelectDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.dateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('mis_endDate',JSON.stringify(this.model));
        }
  }

  onSelectDate1(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.dateString1 = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('mis_startDate',JSON.stringify(this.model1));
        }
   }
   
   openQDetails(data:any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('QueueId',data.queueid)
    this._detailsTable.queueID = data.queueid;
    this.router.navigate(['/pages/queue-details']);
  }

  FilterCheck(p:number){
    this.spinner.show();
    this.p = p - 1 ;
    this.message = "";
    var reqpara3
    if(this.InsuranceCheck){
       reqpara3 = {
        requesttype: 'getqueueinfonewfpi',
        servicetype: '10',
        starttime: this.dateString1,
        endtime: this.dateString,
        pagenumber: '0',
        svcid:this.svcid
      }
    }
    else{
       reqpara3 = {
        requesttype: 'getqueueinfonew',
        servicetype: '10',
        starttime: this.dateString1,
        endtime: this.dateString,
        pagenumber: '0',
        svcid:this.svcid
      }
    }
  
    const as3 = JSON.stringify(reqpara3);
    this._data.webServiceCall(as3).subscribe(res => {
      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        this.message = "No Data" ;
        this.spinner.hide();
       }
       else{
         this.message = " ";
         this.mishap = res[1].mishaps;
         for(var i=0;i < this.mishap.lenght;i++){
           if(this.mishap[i].veh_number){
            this.VehicleFlag = true;
           }
          
         }
         this.record_count = res[0].pagecount[0].record_count;
         this.dataperpage = res[0].pagecount[0].pagelimit;
         this.spinner.hide();
       }
    });
  }

  ngOnDestroy(){  }
}
