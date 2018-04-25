import { Component, OnInit } from '@angular/core';
import { ServicingService } from '../services/addServicing.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
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
  model: NgbDateStruct;
  model1: NgbDateStruct;
  dateString: string;
  dateString1: string;
  message: string;
  user: any = {};
  mydate: string;
  pastdate:string;
  today:string;
  date1:string;
  date2:string;
  public globalsvcid:string;
  public selectedsvcid:string;
  public svcid:string
  constructor(private datePipe: DatePipe, private router: Router, private ngbDateParserFormatter: NgbDateParserFormatter, private service: ServicingService, private http: HttpClient) {
  }

  ngOnInit() {
    var date = new Date();
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    var numberOfDays = 14;
    var days = date.setDate(date.getDate() - numberOfDays);
    this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    console.log(this.pastdate);
    
    console.log(this.today);
    if(sessionStorage.getItem('selectedsvc')){
      // console.log(sessionStorage.getItem('selectedsvc'));
      this.svcid = sessionStorage.getItem('selectedsvc');
      // console.log(this.svcid);
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      // console.log(this.svcid);
    }
    this.service_type = [
      { id: "0", type: 'Servicing Pickup and Dropoff' },
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
    this.defaultSearch()
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

  setDefaultDate(): NgbDateStruct {
    var startDate = new Date();
    let startYear = startDate.getFullYear().toString();
    let startMonth = startDate.getMonth() + 1;
    let startDay = "1";

    return this.ngbDateParserFormatter.parse(startYear + "-" + startMonth.toString() + "-" + startDay);
  }

  search() {  
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
        requesttype: 'getreports',
        startdate: this.date1,
        enddate: this.date2,
        servicetype: this.user.service_type,
        status: this.user.status,
        svcid:this.svcid
      }
    const as1 = JSON.stringify(reqpara1)
    this.service.getBrands(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
            if (res[0].report[0].hasOwnProperty('no_records')) {
              this.message = "No Data"
              console.log('No Data');
            }
            else {
              this.report = res[0].report;
              console.log(this.report);
            }
          }

        });

      }
  
  

  defaultSearch() {
    const reqpara1 =
      {
        requesttype: 'getreports',
        startdate: this.pastdate,
        enddate: this.today,
        servicetype: "0",
        status: "1",
        svcid:this.svcid
      }
    const as1 = JSON.stringify(reqpara1)
    this.service.getBrands(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          if (res[0].report[0].hasOwnProperty('no_records')) {
            // this.report = res[0].report;
            // console.log(this.report);
            this.message = "No Data"
            console.log('No Data');
          }
          else {
            // this.message = "No Data"
            // console.log('No Data');
            this.report = res[0].report;
            console.log(this.report);
          }

        }

      }
      );
  }

}
