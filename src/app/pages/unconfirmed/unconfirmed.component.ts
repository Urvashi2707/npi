import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {ServicingService } from '../services/addServicing.service';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError,retry } from 'rxjs/operators';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { defaultIfEmpty } from 'rxjs/operator/defaultIfEmpty';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import * as FileSaver from "file-saver";
import { DatePipe } from '@angular/common';
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Modal5Component} from './modal5/modal5.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-unconfirmed',
  templateUrl: './unconfirmed.component.html',
  styleUrls: ['./unconfirmed.component.scss']
})
export class UnconfirmedComponent implements OnInit {
  public unconfirmed : any =[];
  public term:string;
  today:string;
  p:number=1;
  record_count:string;
  dataperpage:string;
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  pastdate:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  message:string;
  globalsvcid:string;
  svcid:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  constructor(private spinner: NgxSpinnerService,private modalService: NgbModal,private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private router:Router,private service:ServicingService ) { }

  ngOnInit() {
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    if(sessionStorage.getItem('selectedsvc')){
      // console.log(sessionStorage.getItem('selectedsvc'));
      this.svcid = sessionStorage.getItem('selectedsvc');
      // console.log(this.svcid);
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      // console.log(this.svcid);
    }
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
    this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    console.log(this.globalsvcid);
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
    this.FilterCheck(1);
  }
  showModal(res:any) {
    const activeModal = this.modalService.open(Modal5Component, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Confirmed Booking';
    activeModal.componentInstance.modalContent = res;
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
  FilterCheck(p:number){
    this.spinner.show();
    this.p = p - 1 ;
   this.message = "";
    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '13',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: this.p,
      svcid:this.svcid
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this.service.webServiceCall(as3).subscribe(res => {
      console.log(res);
      this.message="";
      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = "No Data" ;
        this.spinner.hide();
       }
       else{
        this.unconfirmed = res[1].unconfirmed;
        this.record_count = res[0].pagecount[0].record_count;
        this.dataperpage = res[0].pagecount[0].pagelimit;
        console.log(this.record_count);
        this.spinner.hide();
        for (let j = 0; j < this.unconfirmed .length ; j++){
          if(this.unconfirmed [j].queue_date != null){
             var queuedate = this.unconfirmed [j].queue_date;
            var newDate = this.datePipe.transform(queuedate,"d MMM,y");
            this.unconfirmed [j].newdate = newDate;
          }
         if(this.unconfirmed [j].queue_time != null){
          var timeString = this.unconfirmed [j].queue_time ;
          var H = +timeString.substr(0, 2);
          var h = (H % 12) || 12;
          var ampm = H < 12 ? "AM" : "PM";
          timeString = h + timeString.substr(2, 3) + ampm;
          this.unconfirmed [j].newtime = timeString;
          
         }
         
         }
       
      }
      
    });
  }

  confirm(){

  }
}
