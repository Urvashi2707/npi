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
  SearchData:string
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
                this.service_type = [
                  { id: "1", type: 'Servicing Pickup and Dropoff'},
                  { id: "4", type: 'Internal Movement' },
                  { id: "5", type: 'Home Delivery' },
                  { id: "6", type: 'StockYard' },
                  { id: "7", type: 'Test Drive' },
                ];
                this.user.service_type = this.service_type[0].id;
                this.status = [
                  { id: 0, type: 'Active' },
                  { id: 1, type: 'Closed' },
                  { id: 2, type: 'Cancelled' }
                ];
                   var prev_url = this._detailsTable.getPreviousUrl();
                   var curr_url = this._detailsTable.getCurrentUrl();
                   console.log("cons",prev_url);
                   console.log("cons",curr_url);
        if(curr_url === '/pages/queue-details' && prev_url === '/pages/reports'){
          // localStorage.removeItem('startDate');
          // localStorage.removeItem('endDate');
        }
        else{
          console.log("inside else previous url");
          localStorage.removeItem('startDate');
          localStorage.removeItem('endDate');
          localStorage.removeItem('service_status');
          localStorage.removeItem('service_type');
        }
        if(localStorage.getItem('reports_startDate') == null && localStorage.getItem('reports_endDate') == null){
          const date = new Date();
          this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
          this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
          var dt = new Date();
               dt.setDate( dt.getDate() - 14 );
          this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
          this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
          if(localStorage.getItem('service_status') != null){
            console.log("service status when nothing is changed",localStorage.getItem('service_status'));
            this.user.status = JSON.parse(localStorage.getItem('service_status'))
            for(var i = 0; i<this.status.length ;i++){
              if(this.status[i].id === JSON.parse(localStorage.getItem('service_status'))){
                console.log("selected service status is",this.status[i].type);
                this.user.status = this.status[i];
                console.log(this.user.status,this.status[i].id)
              }
            }
          }
          if(localStorage.getItem('service_type') != null){
            console.log("service type when nothing is changed",localStorage.getItem('service_type'));
            this.user.service_type = JSON.parse(localStorage.getItem('service_type'))
          }
        }
        else if(localStorage.getItem('reports_startDate') == null){
          var EndDate = JSON.parse(localStorage.getItem('reports_endDate'));
          this.model = JSON.parse(localStorage.getItem('reports_endDate'));
          this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
          var date = new Date();
          this.model1 = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
          this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
          if(localStorage.getItem('service_status') != null){
            console.log("service status when enddate is changed",localStorage.getItem('service_status'));
            this.user.status = JSON.parse(localStorage.getItem('service_status'))
            for(var i = 0; i<this.status.length ;i++){
              if(this.status[i].id === localStorage.getItem('service_status')){
                console.log("selected service status is",this.status[i].type);
                this.user.status = this.status[i].id
              }
            }
          }
          if(localStorage.getItem('service_type') != null){
            console.log("service status when enddate is changed",localStorage.getItem('service_type'));
            this.user.service_type = JSON.parse(localStorage.getItem('service_type'))
          }
        }
        else if(localStorage.getItem('reports_endDate') == null){
          var StartDate = JSON.parse(localStorage.getItem('reports_startDate'));
          this.model1 = JSON.parse(localStorage.getItem('reports_startDate'));
          this.StrtDateString = this.ngbDateParserFormatter.format(StartDate);
          var dt = new Date();
              this.model = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
              this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
              if(localStorage.getItem('service_status') != null){
                console.log("service status when startdate is changed",localStorage.getItem('service_status'));
                this.user.status = JSON.parse(localStorage.getItem('service_status'))
                for(var i = 0; i<this.status.length ;i++){
                  if(this.status[i].id === localStorage.getItem('service_status')){
                    console.log("selected service status is",this.status[i].type);
                    this.user.status = this.status[i].id
                  }
                }
              }
              if(localStorage.getItem('service_type') != null){
                console.log("service status when startdate is changed",localStorage.getItem('service_type'));
                this.user.service_type = JSON.parse(localStorage.getItem('service_type'))
              }
        }
        else{
          var EndDate = JSON.parse(localStorage.getItem('reports_endDate'));
          var StartDate = JSON.parse(localStorage.getItem('reports_startDate'));
          this.model1 = JSON.parse(localStorage.getItem('reports_startDate'));
          this.model = JSON.parse(localStorage.getItem('reports_endDate'));
          this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
          this.StrtDateString = this.ngbDateParserFormatter.format(StartDate);
          if(localStorage.getItem('service_status') != null){
            console.log("service status when both is changed",localStorage.getItem('service_status'));
            for(var i = 0; i<this.status.length ;i++){
              if(this.status[i].id === localStorage.getItem('service_status')){
                console.log("selected service status is",this.status[i].type);
                this.user.status = this.status[i].id
              }
            }
            
          }
          if(localStorage.getItem('service_type') != null){
            console.log("service status when both is changed" , localStorage.getItem('service_type'));
            this.user.service_type = localStorage.getItem('service_type')
          }
        }
            }

  ngOnInit() {
       var prev_url = this._detailsTable.getPreviousUrl();
        var curr_url = this._detailsTable.getCurrentUrl();
        if(prev_url === '/pages/queue-details' && curr_url === '/pages/reports'){ }
        else{
          localStorage.removeItem('startDate');
          localStorage.removeItem('endDate');
        }
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    this.user.service_type = "1";
    this.user.status = "1";
  
     window.onbeforeunload = function(e) {
      localStorage.removeItem('reports_startDate');
      localStorage.removeItem('reports_endDate');
    };

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

    this.user.status = this.status[0].id;
    this.Search(1);
  }

  onEndSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.EndDateString = this.ngbDateParserFormatter.format(date);
      localStorage.setItem('reports_endDate',JSON.stringify(this.model));

    }
}

service_status_changed(ev){
  console.log("service_status_chnaged",ev);
  for(var i = 0; i<this.status.length ;i++){
    if(this.status[i].id === ev){
      console.log("selected service status is",this.status[i].type);
      localStorage.setItem('service_status',ev);
    }
  }
}


service_type_changed(ev){
  console.log("service_type_chnaged",ev);
  for(var i = 0; i<this.service_type.length ;i++){
    if(this.service_type[i].id === ev){
      console.log("selected type is",this.service_type[i].type);
      localStorage.setItem('service_type',JSON.stringify(ev));
    }
  }
}

  onStrtSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model1 = date;
      this.StrtDateString = this.ngbDateParserFormatter.format(date);
      localStorage.setItem('reports_startDate',JSON.stringify(this.model1));
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
    this.report = [];
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
        sessionStorage.removeItem('clickedOn');
        sessionStorage.setItem('QueueId',data.id)
        this._detailsTable.queueID = data.id;
        this.router.navigate(['/pages/queue-details']);
      }


      ngOnDestroy(){}

}
