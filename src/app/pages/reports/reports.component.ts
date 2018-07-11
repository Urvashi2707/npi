import { Component, OnInit } from '@angular/core';
import { ServicingService } from '../services/addServicing.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { QueueTableService } from '../services/queue-table.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
  dateString: string;
  dateString1: string;
  message: string;
  p:number = 1;
  user: any = {};
  mydate: string;
  pastdate:string;
  today:string;
  date1:string;
  date2:string;
  dataperpage:string;
  record_count:string;

  disableCust:boolean = false;
  public globalsvcid:string;
  public selectedsvcid:string;
  public svcid:string
  constructor(private spinner: NgxSpinnerService,private _detailsTable: QueueTableService,private datePipe: DatePipe, private router: Router, private ngbDateParserFormatter: NgbDateParserFormatter, private service: ServicingService, private http: HttpClient) {
  }

  ngOnInit() {
    this.user.service_type = "1";
    this.user.status = "1";

    var date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.dateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    var dt = new Date();
           dt.setDate( dt.getDate() - 14 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.dateString1 = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
      console.log(this.dateString1);
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
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
    this.search(1);
  }

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.dateString = this.ngbDateParserFormatter.format(date);
      console.log(this.dateString);
    }


  }

  onSelectDate1(date: NgbDateStruct) {
    if (date != null) {
      this.model1 = date;
      this.dateString1 = this.ngbDateParserFormatter.format(date);
      console.log(this.dateString1);
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
  search(p:number) {  
    this.spinner.show();
    this.p = p - 1 ;

    if(this.user.service_type == "4" || this.user.service_type == "6"){
      this.disableCust = true;
    }
    else{
      this.disableCust = false;
    }
    this.message = "";

    if(this.dateString){
      
      this.date2 = this.dateString
    }
    else {
      
      this.date2 = this.today;
    }
    if(this.dateString1){
      this.date1 = this.dateString1;
    }
    else{
      this.date1 = this.pastdate;
    }
    const reqpara1 =
      {
        requesttype: 'getreportsv2',
        startdate: this.dateString1,
        enddate: this.dateString,
        servicetype: this.user.service_type,
        status: this.user.status,
        svcid:this.svcid,
        pagenumber:this.p

      }
    const as1 = JSON.stringify(reqpara1)
    this.service.webServiceCall(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          if (res[0].pagecount[0].hasOwnProperty('noqueues')) {
            this.message = "No Data";
            console.log('No Data');
            this.spinner.hide();
          }
          else {
            this.record_count = res[0].pagecount[0].record_count;
            this.dataperpage = res[0].pagecount[0].pagelimit;
            this.report = res[1].record;
            console.log(this.report);
            this.spinner.hide();
          }

          }

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
