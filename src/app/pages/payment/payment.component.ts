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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public payment : any =[];
  public term:string;
  today:string;
  p:number=1;
  record_count:string;
  dataperpage:string;
  dateString: string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  pastdate:string;
  message:string;
  globalsvcid:string;
  svcid:string;
  constructor(private spinner: NgxSpinnerService,private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private router:Router,private service:ServicingService ) { }

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
    const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.dateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var numberOfDays = 5;
      var dt = new Date();
           dt.setDate( dt.getDate() - 14 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.dateString1 = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
      this.today = this.datePipe.transform(date,"yyyy-MM-dd");
      console.log(this.today)
      var days = date.setDate(date.getDate() - numberOfDays);
      this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
      console.log(this.pastdate);
    this.FilterCheck(1);
  }

  DownloadFile(url){

    console.log(url);
    var file = new File([url],"invoice.pdf",{type:"application/pdf"});

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
      servicetype: '12',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: this.p,
      svcid:this.svcid
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this.service.webServiceCall(as3).subscribe(res => {
      console.log(res);
      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = "No Data";
        this.spinner.hide();
       }
       else{
         this.message = null;
        this.payment = res[1].paymentadvice;
        this.record_count = res[0].pagecount[0].record_count;
         this.dataperpage = res[0].pagecount[0].pagelimit;
         console.log(this.record_count);
         this.spinner.hide();
        console.log(this.payment);
       
       }
    });
  }

}
