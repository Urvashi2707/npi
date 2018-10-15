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
    const date = new Date();
    this.model = {day:date.getDate(),month:date.getMonth() + 1,year: date.getFullYear() };
    this.dateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    var numberOfDays = 14;
    var dt = new Date();
         dt.setDate( dt.getDate() - 14 );
    this.model1= { day:dt.getDate(), month: dt.getMonth() + 1, year: dt.getFullYear()};
    this.dateString1 = this.model1.year + '-' + this.model1.month + '-' + this.model1.day

    var days = date.setDate(date.getDate() - numberOfDays);
    console.log(days)
    this.dateString1 = this.datePipe.transform(days,"yyyy-MM-dd");
    console.log("starting model",this.model);
    console.log(localStorage.getItem('startDate'));
    if(localStorage.getItem('startDate') == null && localStorage.getItem('endDate') == null){
      console.log("not changed");
      const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.dateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var dt = new Date();
           dt.setDate( dt.getDate() - 5 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.dateString1 = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
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
      this.dateString = this.ngbDateParserFormatter.format(EndDate);
      this.dateString1 = this.ngbDateParserFormatter.format(StartDate);
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
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    console.log(this.globalsvcid);
    
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
            console.log(this.dateString);
            localStorage.setItem('endDate',JSON.stringify(this.dateString));
        }
  }

  onSelectDate1(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.dateString1 = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString1);
            localStorage.setItem('startDate',JSON.stringify(this.dateString1));
        }
   }
   
  // openQDetails(data){
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
  FilterCheck(p:number){
    this.spinner.show();
    this.p = p - 1 ;
   
    this.message = "";
    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '10',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: '0',
      svcid:this.svcid
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.webServiceCall(as3).subscribe(res => {
      console.log(res);
      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
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
         console.log(this.mishap);
         this.record_count = res[0].pagecount[0].record_count;
         this.dataperpage = res[0].pagecount[0].pagelimit;
         console.log(this.record_count);
         this.spinner.hide();
       }
      // this._detailsTable.setTableData(res, 11);
    });
  }
}
