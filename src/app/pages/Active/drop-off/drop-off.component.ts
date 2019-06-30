import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-drop-off',
  templateUrl: './drop-off.component.html',
  styleUrls: ['./drop-off.component.scss']
})
export class DropOffComponent implements OnInit {

  //variables
  tableData: any[];
  SearchData:string;
  p:number=1;
  RecordCount:string;
  DataPerPage:string;
  dropoff : any =[];
  key: string = 'queueid'; 
  reverse: boolean = false; 
  EndDateString: string;
  StartDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  MessageNoData:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  GlobalSvcid:string;
  SvcId:string;

  constructor(private spinner: NgxSpinnerService,
                private ngbDateParserFormatter: NgbDateParserFormatter,
                private _detailsTable: QueueTableService,
                private _data: ServerService, 
                private _tableService: QueueTableService, 
                private router: Router) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
    });
    var prev_url = this._tableService.getPreviousUrl();
    var curr_url = this._tableService.getCurrentUrl();
    console.log("prev url",prev_url);
    console.log("current url",curr_url);
    if(curr_url === '/pages/queue-details' && prev_url === '/pages/Active/drop-off'){
      console.log("inside if previous url");
      // localStorage.removeItem('startDate');
      // localStorage.removeItem('endDate');
    }
    else{
      console.log("inside else previous url");
      localStorage.removeItem('dp_off_startDate');
      localStorage.removeItem('dp_off_endDate');
    }
  
   
    if(localStorage.getItem('dp_off_startDate') == null && localStorage.getItem('dp_off_endDate') == null){
      const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var dt = new Date();
           dt.setDate( dt.getDate() - 5 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.StartDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    }
    else if(localStorage.getItem('dp_off_startDate') == null){
      var EndDate = JSON.parse(localStorage.getItem('dp_off_endDate'));
      this.model = JSON.parse(localStorage.getItem('dp_off_endDate'));
      this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
      var dt = new Date();
               dt.setDate( dt.getDate() - 5 );
          this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
          this.StartDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    }
    else if(localStorage.getItem('dp_off_endDate') == null){
      var StartDate = JSON.parse(localStorage.getItem('dp_off_startDate'));
      this.model1 = JSON.parse(localStorage.getItem('dp_off_startDate'));
      this.StartDateString = this.ngbDateParserFormatter.format(StartDate);
      const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    }
    else{
      var EndDate = JSON.parse(localStorage.getItem('dp_off_endDate'));
      var StartDate = JSON.parse(localStorage.getItem('dp_off_startDate'));
      this.model1 = JSON.parse(localStorage.getItem('dp_off_startDate'));
      this.model = JSON.parse(localStorage.getItem('dp_off_endDate'));
      this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
      this.StartDateString = this.ngbDateParserFormatter.format(StartDate);
    }
    window.onbeforeunload = function(e) {
      localStorage.removeItem('dp_off_startDate');
      localStorage.removeItem('dp_off_endDate');
    };
  }

  ngOnInit() {
    var prev_url = this._tableService.getPreviousUrl();
    var curr_url = this._tableService.getCurrentUrl();
    console.log("prev url",prev_url);
    console.log("current url",curr_url);
    if(prev_url === '/pages/queue-details' && curr_url === '/pages/Active/drop-off'){
      console.log("inside if previous url");
      // localStorage.removeItem('startDate');
      // localStorage.removeItem('endDate');
    }
    else{
      console.log("inside else previous url");
      localStorage.removeItem('dp_off_startDate');
      localStorage.removeItem('dp_off_endDate');
    }
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.GlobalSvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
    this.FilterCheck(1);
  }

    //On select of startDate
  onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.EndDateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('dp_off_endDate',JSON.stringify(this.model));
        }
  }

  //sort
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //On select of startDate
  onSelectStartDate(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.StartDateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('dp_off_startDate',JSON.stringify(this.model1));
        }
    }

   //Open Queue Details Page     
  openQDetails(details:any) {
    sessionStorage.setItem('QueueId',details.queueid);
    this._detailsTable.queueID = details.queueid;
    sessionStorage.removeItem('clickedOn');
    this.router.navigate(['/pages/queue-details']);
}

//Dropoff table API call

img(event){
    event.target.src = '../../../assets/images/profile.svg';
  }

  FilterCheck(p:number){
    this.MessageNoData = null ;
    this.spinner.show();
    this.p = p - 1 ;
    var DropReq;
    if(this.InsuranceCheck){
       DropReq = {
        requesttype: 'getqueueinfonewfpi',
        servicetype: '3',
        starttime: this.StartDateString,
        endtime: this.EndDateString,
        pagenumber: this.p,
        svcid:this.SvcId 
      }
    }
    else{
       DropReq = {
        requesttype: 'getqueueinfonew',
        servicetype: '3',
        starttime: this.StartDateString,
        endtime: this.EndDateString,
        pagenumber: this.p,
        svcid:this.SvcId 
      }
    }

    const DropOffReq = JSON.stringify(DropReq);
    this._data.webServiceCall(DropOffReq).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
         if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        this.MessageNoData = 'No Data';
        this.spinner.hide();
       }
       else{
        this.dropoff = res[1].activedropoff;
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        this.spinner.hide();
        }
  }
    });
      }
      

      ngOnDestroy(){
        var prev_url = this._tableService.getPreviousUrl();
        var curr_url = this._tableService.getCurrentUrl();
        console.log(prev_url);
        console.log(curr_url);
        // if(prev_url === '/pages/queue-details' && curr_url === '/pages/Active/drop-off'){
        //   console.log("inside if previous url");
        //   localStorage.removeItem('startDate');
        //   localStorage.removeItem('endDate');
        // }
        // else{
        //   console.log("inside else previous url");
        // }
      }

    }
