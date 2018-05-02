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


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public payment : any =[];
  public term:string;
  today:string;
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
  constructor(private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private router:Router,private service:ServicingService ) { }

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
    var date = new Date();
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.today)
    var numberOfDays = 14;
    var days = date.setDate(date.getDate() - numberOfDays);
    this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    console.log(this.pastdate);
    this.getData();
  }

  DownloadFile(url){

    console.log(url);
    var file = new File([url],"invoice.pdf",{type:"application/pdf"});

  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  getData(){
    const reqpara1 = 
    {
      requesttype: 'getqueueinfonew',
      servicetype:12,
      starttime: this.pastdate,
      endtime: this.today,
      pagenumber: '0',
      svcid:this.svcid
    }
      const as1 = JSON.stringify(reqpara1)
      this.service.getBrands(as1).subscribe
  (res => 
    {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        if(res[0].pagecount[0].hasOwnProperty('noqueues')){
          console.log('No queue');
          this.message = "No Data";
         }
         else{
          this.message = null;
          this.payment = res[1].paymentadvice;
          console.log(this.payment);
         
         }
      //   this.payment = res[1].paymentadvice;
      // console.log(this.payment);
      }

    }
  );
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
  FilterCheck(){

    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '12',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: '0',
      svcid:this.svcid
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this.service.getBrands(as3).subscribe(res => {
      console.log(res);
      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = "No Data";
       }
       else{
         this.message = null;
        this.payment = res[1].paymentadvice;
        console.log(this.payment);
       
       }
      // this.payment = res[1].paymentadvice;
      // console.log(this.payment);
    });
  }

}
