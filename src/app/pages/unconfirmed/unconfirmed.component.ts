import { Component, OnInit } from '@angular/core';
import {ServicingService } from '../services/addServicing.service';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { QueueTableService } from '../services/queue-table.service';
import {ConfirmModalComponent} from './modal/confirmModal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-unconfirmed',
  templateUrl: './unconfirmed.component.html',
  styleUrls: ['./unconfirmed.component.scss']
})

export class UnconfirmedComponent implements OnInit {

  //variables
  unconfirmed : any =[];
  SearchData:string;
  today:string;
  page:number=1;
  RecordCount:string;
  DataPerPage:string;
  EndDateString: string;
  StrtDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  key: string = 'queueid'; 
  reverse: boolean = false;
  MessageNoData:string;
  GlobalSvcId:string;
  SvcId:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;

  constructor(private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              private router:Router,
              private _tableService: QueueTableService, 
              private service:ServicingService ) { }

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
    this.GlobalSvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    const date = new Date();
    this.model1 = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    var dt = new Date();
         dt.setDate( dt.getDate() + 25 );
    this.model = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    console.log("pehle se",this.model);
    console.log(localStorage.getItem('startDate'));
    if(localStorage.getItem('startDate') == null && localStorage.getItem('endDate') == null){
      console.log("not changed");
      const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var dt = new Date();
             dt.setDate( dt.getDate() - 5 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    }
    else if(localStorage.getItem('startDate') == null){
      console.log("Start Date Changed");
      var EndDate = JSON.parse(localStorage.getItem('endDate'));
      this.model = JSON.parse(localStorage.getItem('endDate'));
      this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
    }
    else if(localStorage.getItem('endDate') == null){
      console.log("End Date Changed");
      var StartDate = JSON.parse(localStorage.getItem('startDate'));
      this.model1 = JSON.parse(localStorage.getItem('startDate'));
      this.StrtDateString = this.ngbDateParserFormatter.format(StartDate);
    }
    else{
      console.log("both changed");
      console.log(localStorage.getItem('startDate'));
      console.log(localStorage.getItem('endDate'));
      var EndDate = JSON.parse(localStorage.getItem('endDate'));
      var StartDate = JSON.parse(localStorage.getItem('startDate'));
      this.model1 = JSON.parse(localStorage.getItem('startDate'));
      this.model = JSON.parse(localStorage.getItem('endDate'));
      this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
      this.StrtDateString = this.ngbDateParserFormatter.format(StartDate);
    }
    window.onbeforeunload = function(e) {
      console.log("page refreshed");
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
    };
    this.FilterCheck(1);
  }
  //call Confirm Modal
  ShowConfirmModal(res:any,page) {
    const activeModal = this.modalService.open(ConfirmModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Confirmed Booking';
    activeModal.componentInstance.modalContent = res;
    activeModal.result.then(() => { 
      console.log('When user closes');
      this.FilterCheck(page);
    }, () => { console.log('Backdrop click')})
  }
//sort function
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
 //On select of endDate
  onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.EndDateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('startDate',JSON.stringify(this.model1));
        }
      }
 //On select of startDate
  onSelectStartDate(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.StrtDateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('endDate',JSON.stringify(this.model));
        }
      }

//Unconfirmed table API call
  FilterCheck(p:number){
    this.unconfirmed=[];
    this.spinner.show();
    this.page = p - 1 ;
   this.MessageNoData = null;
    const UnconfirmReq = {
      requesttype: 'getqueueinfonew',
      servicetype: '13',
      starttime: this.StrtDateString,
      endtime: this.EndDateString,
      pagenumber: this.page,
      svcid:this.SvcId
    }
    const UnconfirmRq = JSON.stringify(UnconfirmReq);
    this.service.webServiceCall(UnconfirmRq).subscribe(res => {
      this.MessageNoData = null ;
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
          this.unconfirmed = res[1].unconfirmed;
          this.RecordCount = res[0].pagecount[0].record_count;
          this.DataPerPage = res[0].pagecount[0].pagelimit;
          this.spinner.hide();
          this._tableService.DateFormat(this.unconfirmed);
          this._tableService.TimeFormat(this.unconfirmed);
         }
      }
     });
  }

  ngOnDestroy(){
    var prev_url = this._tableService.getPreviousUrl();
    var curr_url = this._tableService.getCurrentUrl();
    console.log(prev_url);
    console.log(curr_url);
    if(prev_url === '/pages/queue-details' && curr_url === '/pages/unconfirmed'){
      console.log("inside if previous url");
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
    }
  
    else{
      console.log("inside else previous url");
    }
  }

}
