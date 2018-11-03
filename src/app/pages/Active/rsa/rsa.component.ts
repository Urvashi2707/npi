import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from '../../search/modal/searchModal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html',
  styleUrls: ['./rsa.component.scss']
})
export class RsaComponent implements OnInit {

  //variables
  tableData: any[];
  page:number=1;
  RecordCount:string;
  DataPerPage:string;
  atcentre : any =[];
  SearchData:string;
  EndDateString: string;
  StrtDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  GlobalSvcId:string;
  MessageNoData:string;
  InsuranceUsr:string;
  public upcoming : any =[];
  InsuranceCheck:boolean = false;
  SvcId:string;
  key: string = 'queueid'; 
  reverse: boolean = false;

  constructor(private spinner: NgxSpinnerService, 
    private router:Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private modalService: NgbModal, 
    private _detailsTable: QueueTableService, 
    private _data: ServerService, 
    private _tableService: QueueTableService) {
this._tableService.clickedID.subscribe(value => {
this.tableData = _tableService.table_data;
});
var prev_url = this._tableService.getPreviousUrl();
var curr_url = this._tableService.getCurrentUrl();
console.log("prev url",prev_url);
console.log("current url",curr_url);
if(curr_url === '/pages/queue-details' && prev_url === '/pages/Active/rsa'){
  console.log("inside if previous url");
  // localStorage.removeItem('startDate');
  // localStorage.removeItem('endDate');
}
else{
  console.log("inside else previous url");
  localStorage.removeItem('rsa_startDate');
  localStorage.removeItem('rsa_endDate');
}

if(localStorage.getItem('rsa_startDate') == null && localStorage.getItem('rsa_endDate') == null){
  console.log("not changed");
  const date = new Date();
  this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
  this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
  var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
  this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
  this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
}
else if(localStorage.getItem('rsa_startDate') == null){
  var EndDate = JSON.parse(localStorage.getItem('rsa_endDate'));
  this.model = JSON.parse(localStorage.getItem('rsa_endDate'));
  this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
  var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
}
else if(localStorage.getItem('rsa_endDate') == null){
  var StartDate = JSON.parse(localStorage.getItem('rsa_startDate'));
  this.model1 = JSON.parse(localStorage.getItem('rsa_startDate'));
  this.StrtDateString = this.ngbDateParserFormatter.format(StartDate);
  const date = new Date();
this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
}
else{
  var EndDate = JSON.parse(localStorage.getItem('rsa_endDate'));
  var StartDate = JSON.parse(localStorage.getItem('rsa_startDate'));
  this.model1 = JSON.parse(localStorage.getItem('rsa_startDate'));
  this.model = JSON.parse(localStorage.getItem('rsa_endDate'));
  this.EndDateString = this.ngbDateParserFormatter.format(EndDate);
  this.StrtDateString = this.ngbDateParserFormatter.format(StartDate);
}
window.onbeforeunload = function(e) {
  localStorage.removeItem('rsa_startDate');
  localStorage.removeItem('rsa_endDate');
};
}

ngOnInit() {
  var prev_url = this._tableService.getPreviousUrl();
  var curr_url = this._tableService.getCurrentUrl();
  console.log("prev url",prev_url);
  console.log("current url",curr_url);
  if(prev_url === '/pages/queue-details' && curr_url === '/pages/Active/rsa'){
    console.log("inside if previous url");
    // localStorage.removeItem('startDate');
    // localStorage.removeItem('endDate');
  }
  else{
    console.log("inside else previous url");
    localStorage.removeItem('rsa_startDate');
    localStorage.removeItem('rsa_endDate');
  }
  this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
  if(sessionStorage.getItem('selectedsvc')){
    this.SvcId = sessionStorage.getItem('selectedsvc');
  }
  else{
    this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
  }
  this.GlobalSvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
  if(this.InsuranceUsr == "1"){
    this.InsuranceCheck = true;
  }
  else{
    this.InsuranceCheck = false;
   }
  this.FilterCheck(1);
}
datatopass:any;
dataForUpload: any;

    //On select of End Date
    onSelectEndDate(date: NgbDateStruct){
      if (date != null) {
              this.model = date;
              this.EndDateString = this.ngbDateParserFormatter.format(date);
              localStorage.setItem('rsa_endDate',JSON.stringify(this.model));
          }
       }
  
    sort(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
  
      //On select of startDate
    onSelectStartDate(date: NgbDateStruct){
      if (date != null) {
              this.model1 = date;
              this.StrtDateString = this.ngbDateParserFormatter.format(date);
              localStorage.setItem('startDate',JSON.stringify(this.model1));
             }
        }
  
        //Open Queue Details Page
    openQDetails(details:any) {
      sessionStorage.setItem('QueueId',details.queueid);
      this._detailsTable.queueID = details.queueid;
      sessionStorage.removeItem('clickedOn');
      this.router.navigate(['/pages/queue-details']);
   }

     //RSA table API call
     FilterCheck(p:number){
      this.spinner.show();
      this.page = p - 1 ;
      this.MessageNoData = null;
      const UpcmReqpara = {
        requesttype: 'getqueueinfonew',
        servicetype: '16',
        starttime: this.StrtDateString,
        endtime: this.EndDateString,
        pagenumber: this.page,
        svcid:this.SvcId
      }
      const UpReq = JSON.stringify(UpcmReqpara);
      this._data.webServiceCall(UpReq).subscribe(res => {
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
          this.upcoming = res[1].activersa;
          this.RecordCount = res[0].pagecount[0].record_count;
          this.DataPerPage = res[0].pagecount[0].pagelimit;
          this.spinner.hide();
          this._tableService.DateFormat(this.upcoming);
          this._tableService.TimeFormat(this.upcoming);
        }
      }
    });
    }

    ngOnDestroy(){
      var prev_url = this._tableService.getPreviousUrl();
        var curr_url = this._tableService.getCurrentUrl();
        console.log(prev_url);
        console.log(curr_url);
        // if(prev_url === '/pages/queue-details' && curr_url === '/pages/Active/rsa'){
        //   console.log("inside if previous url");
        //   localStorage.removeItem('startDate');
        //   localStorage.removeItem('endDate');
        // }
        // else{
        //   console.log("inside else previous url");
        // }
    }

}
