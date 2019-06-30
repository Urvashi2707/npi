import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../services/queue-table.service';
import { ServerService } from '../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {NgbDateStruct,  NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {ServicingService } from '../services/addServicing.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from '../search/modal/searchModal.component';

@Component({
  selector: 'app-notcheckedin',
  templateUrl: './notcheckedin.component.html',
  styleUrls: ['./notcheckedin.component.scss']
})
export class NotcheckedinComponent implements OnInit {

  //variables
  notcheckedin : any =[];
  EndDateString: string;
  page:number=1;
  StartDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  term:string;
  MessageNoData:string;
  RecordCount:string;
  DataPerPage:string;
  GlobalSvcId:string;
  SvcId:string;
  datatopass:any;
  reverse: boolean = false;
  key: string = 'queueid'; 
  dataForUpload: any;
  today:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  constructor(private spinner: NgxSpinnerService,
                private ngbDateParserFormatter: NgbDateParserFormatter,
                private _tableService: QueueTableService, 
                private router: Router,
                private modalService: NgbModal,
                private service :ServicingService) { 
      const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var dt = new Date();
           dt.setDate( dt.getDate() - 5 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.StartDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day; 
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
            this.StartDateString = this.ngbDateParserFormatter.format(date);
        }
      }

         //On select of End Date
      onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.EndDateString = this.ngbDateParserFormatter.format(date);
        }
    }

    //Show modal for invoice upload
  ShowUploadModal(data:any){
    const activeModal = this.modalService.open(SearchModalComponent, { size: 'lg', container: 'nb-layout' });
    this.datatopass = {id:data.queueid, queue_exists: "0", service_status:data.service_status, queue_time:data.queue_time,service_advisor:data.service_advisor};
    this.dataForUpload = { id: sessionStorage.getItem('QueueId'), queue_date: new Date, service_status: data.service_status}
    activeModal.componentInstance.modalHeader = 'Upload File';
    activeModal.componentInstance.modalContent = this.datatopass;
}

 //Open Queue Details Page
  openQDetails(data:any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('QueueId',data.queueid)
    this._tableService.queueID = data.queueid;
    this.router.navigate(['/pages/queue-details']);
  }

  //sort
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

//Not Checkedin table data API call
  FilterCheck(p:number){
    this.spinner.show();
    this.page = p - 1 ;
   this.MessageNoData = null;
   var NotCheckedInReq
   if(this.InsuranceCheck){
      NotCheckedInReq = {
        requesttype: 'getqueueinfonewfpi',
        servicetype:14,
        starttime: this.StartDateString,
        endtime: this.EndDateString,
        pagenumber: this.page,
        svcid:this.SvcId
      }
   }
   else{
      NotCheckedInReq = {
        requesttype: 'getqueueinfonew',
        servicetype:14,
        starttime: this.StartDateString,
        endtime: this.EndDateString,
        pagenumber: this.page,
        svcid:this.SvcId
      }
   }
      const Req = JSON.stringify(NotCheckedInReq)
      this.service.webServiceCall(Req).subscribe
  (res =>{
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
          this.notcheckedin = res[1].atsvc;
          this.RecordCount = res[0].pagecount[0].record_count;
         this.DataPerPage = res[0].pagecount[0].pagelimit;
         this.spinner.hide();
         this._tableService.DateFormat(this.notcheckedin);
         this._tableService.TimeFormat(this.notcheckedin);
      }
    }
  });
  }
}
