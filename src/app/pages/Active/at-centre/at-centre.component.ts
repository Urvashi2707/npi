import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from '../../search/modal/searchModal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-at-centre',
  templateUrl: './at-centre.component.html',
  styleUrls: ['./at-centre.component.scss']
})
export class AtCentreComponent implements OnInit {

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
    const date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
    this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
  }

  ngOnInit() {
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

  //File Upload Function 
  UploadFiles(data:any){
    const activeModal = this.modalService.open(SearchModalComponent, { size: 'lg', container: 'nb-layout' });
    this.datatopass = {id:data.queueid, queue_exists: "0",amt:data.queue_total, service_status:data.service_status, queue_time:data.queue_time,service_advisor:data.service_advisor};
    this.dataForUpload = { id: sessionStorage.getItem('QueueId'), queue_date: new Date, service_status: data.service_status}
    activeModal.componentInstance.modalHeader = 'Upload File';
    activeModal.componentInstance.modalContent = this.datatopass;
  }

      //On select of End Date
  onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.EndDateString = this.ngbDateParserFormatter.format(date);
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
           }
      }

      //Open Queue Details Page
  openQDetails(details:any) {
    sessionStorage.setItem('QueueId',details.queueid);
    this._detailsTable.queueID = details.queueid;
    sessionStorage.removeItem('clickedOn');
    this.router.navigate(['/pages/queue-details']);

  }


  //AtCenter table API call

  FilterCheck(p:number){
    this.MessageNoData = null;
    this.spinner.show();
    this.page = p - 1 ;
     const AtCentreReq = {
      requesttype: 'getqueueinfonew',
      servicetype: '1',
      starttime: this.StrtDateString,
      endtime: this.EndDateString,
      pagenumber: this.page,
      svcid:this.SvcId 
    }
    const ReqAtCentre = JSON.stringify(AtCentreReq);
    this._data.webServiceCall(ReqAtCentre).subscribe(res => {
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
        this.atcentre = res[1].atsvc;
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        this.spinner.hide();
        this._tableService.DateTimeFormat(this.atcentre);
        // this._tableService.DateFormat(this.atcentre);
        // this._tableService.TimeFormat(this.atcentre);
}
}
});
  }
}
