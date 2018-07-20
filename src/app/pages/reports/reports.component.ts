import { Component, OnInit } from '@angular/core';
import { ServicingService } from '../services/addServicing.service';
import { Router } from '@angular/router';
import { QueueTableService } from '../services/queue-table.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public service_type = [];
  public status = [];
  public report: any = [];
  key: string = 'id'; 
  reverse: boolean = false;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  EndDateString: string;
  StrtDateString: string;
  MessageNoData: string;
  page:number = 1;
  user: any = {};
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  DataPerPage:string;
  RecordCount:string;
  disableCust:boolean = false;
  public SvcID:string;

  constructor(private spinner: NgxSpinnerService,
              private _detailsTable: QueueTableService,
              private router: Router, 
              private ngbDateParserFormatter: NgbDateParserFormatter,
              private service: ServicingService) {
            }

  ngOnInit() {
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    this.user.service_type = "1";
    this.user.status = "1";
    var date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    var dt = new Date();
           dt.setDate( dt.getDate() - 14 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcID = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcID = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
    this.service_type = [
      { id: "1", type: 'Servicing Pickup and Dropoff' },
      { id: "1", type: 'Servicing only Dropoff' },
      { id: "4", type: 'Internal Movement' },
      { id: "5", type: 'Home Delivery' },
      { id: "6", type: 'Stock Yard' },
      { id: "7", type: 'Test Drive' },
    ];
    this.user.service_type = this.service_type[0].id;
    this.status = [
      { id: "0", type: 'Active' },
      { id: "1", type: 'Closed' },
      { id: "2", type: 'Cancelled' }
    ];
    this.user.status = this.status[0].id;
    this.Search(1);
  }

  onEndSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.EndDateString = this.ngbDateParserFormatter.format(date);
    }
}

  onStrtSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model1 = date;
      this.StrtDateString = this.ngbDateParserFormatter.format(date);
    }
}

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  setDefaultDate(): NgbDateStruct {
    var startDate = new Date();
    let startYear = startDate.getFullYear().toString();
    let startMonth = startDate.getMonth() + 1;
    let startDay = "1";
  return this.ngbDateParserFormatter.parse(startYear + "-" + startMonth.toString() + "-" + startDay);
  }


  Search(p:number) {  
    this.spinner.show();
    this.page = p - 1 ;
    if(this.user.service_type == "4" || this.user.service_type == "6"){
      this.disableCust = true;
    }
    else{
      this.disableCust = false;
    }
    this.MessageNoData = null ;
    const reportPara ={
        requesttype: 'getreportsv2',
        startdate: this.StrtDateString,
        enddate: this.EndDateString,
        servicetype: this.user.service_type,
        status: this.user.status,
        svcid:this.SvcID,
        pagenumber:this.page
     }
    const reqpara = JSON.stringify(reportPara)
    this.service.webServiceCall(reqpara).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          if (res[0].pagecount[0].hasOwnProperty('noqueues')) {
            this.MessageNoData = "No Data";
            this.spinner.hide();
          }
          else {
            this.RecordCount = res[0].pagecount[0].record_count;
            this.DataPerPage = res[0].pagecount[0].pagelimit;
            this.report = res[1].record;
            this.spinner.hide();
          }}
        });
      }
  
      openQDetails(data:any){
        console.log(data);
        sessionStorage.removeItem('clickedOn');
        sessionStorage.setItem('QueueId',data.id)
        this._detailsTable.queueID = data.id;
        this.router.navigate(['/pages/queue-details']);
      }
}
