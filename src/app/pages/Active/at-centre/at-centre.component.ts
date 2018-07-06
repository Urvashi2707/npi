import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueTableService } from '../../services/queue-table.service';
import { ListService } from '../../services/user.service';
import { Router } from '@angular/router';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUploadComponent } from '../../queue-details/modal-upload/modal-upload.component'
import { DatePipe } from '@angular/common';
import { Modal4Component } from '../../search/modal/modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-at-centre',
  templateUrl: './at-centre.component.html',
  styleUrls: ['./at-centre.component.scss']
})
export class AtCentreComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'License Plate', 'Customer Name', 'Pickup Date', 'ETD', 'Paid/Unpaid', 'Amount','Status', 'Upload'];
  tableData: any[];
  keyValues: any[];
  p:number=1;
  record_count:string;
  dataperpage:string;
  public atcentre : any =[];
  today:string;
  term:string;
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  pastdate:string;
  globalsvcid:string;
  message:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  svcid:string;
  advisorName:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  constructor(private spinner: NgxSpinnerService,private datePipe:DatePipe, private router:Router,private ngbDateParserFormatter: NgbDateParserFormatter,private modalService: NgbModal, private _detailsTable: QueueTableService, private _data: ListService, private _tableService: QueueTableService) {
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      console.log(this.tableData)
      
      // if (this.tableData.length > 0) {
        this.keyValues = ['queueid', 'veh_number', 'cust_name', 'queue_time', 'dropoff_time', 'payment_status', 'queue_total', 'queue_state', 'upload_button'];
      // }
    });
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
  }

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
    this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    console.log(this.globalsvcid);
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

  uploadFiles(data:any){
    console.log(data);
    console.log(data.service_advisor)
    // console.log(this.tableData[event.currentTarget.id].service_status)

  //  console.log(id);
    const activeModal = this.modalService.open(Modal4Component, { size: 'lg', container: 'nb-layout' });

    this.datatopass = {id:data.queueid, queue_exists: "0",amt:data.queue_total, service_status:data.service_status, queue_time:data.queue_time,service_advisor:data.service_advisor};
    this.dataForUpload = { id: sessionStorage.getItem('QueueId'), queue_date: new Date, service_status: data.service_status}
    activeModal.componentInstance.modalHeader = 'Upload File';
    activeModal.componentInstance.modalContent = this.datatopass;

  }
  onSelectDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.dateString = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString);
        }
        

  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  onSelectDate1(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.dateString1 = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString1);
        }
        

  }
  openQDetails(details:any) {

    console.log(details);

    sessionStorage.setItem('QueueId',details.queueid);
    this._detailsTable.queueID = details.queueid;
    // sessionStorage.setItem('QueueId', this.tableData[indexId][this.keyValues[0]])
    // sessionStorage.setItem('QueueTime', this.tableData[indexId][this.keyValues[3]])
    // console.log(this.tableData[indexId][this.keyValues[3]]);
    // this._detailsTable.queueID = this.tableData[indexId][this.keyValues[0]];
    sessionStorage.removeItem('clickedOn');
    this.router.navigate(['/pages/queue-details']);

  }


  // getdetails(){}

  FilterCheck(p:number){
    this.message=" ";
    this.spinner.show();
    this.p = p - 1 ;
     const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '1',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: this.p,
      svcid:this.svcid 
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.webServiceCall(as3).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{

      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
        this.spinner.hide();
       }
       else{

        this.atcentre = res[1].atsvc;
        console.log(this.atcentre);
        this.record_count = res[0].pagecount[0].record_count;
        this.dataperpage = res[0].pagecount[0].pagelimit;
        console.log(this.record_count);
        this.spinner.hide();
        this.record_count = res[0].pagecount[0].record_count;
        this.dataperpage = res[0].pagecount[0].pagelimit;
        console.log(this.record_count);
        this.spinner.hide();
        for (let j = 0; j < this.atcentre.length ; j++){
          if(this.atcentre[j].queue_time != null){
            var queuetime = this.atcentre[j].queue_time;
            var date = queuetime.replace( /\n/g, " " ).split( " " );
            var newDate = this.datePipe.transform(date[0],"d MMM,y");
            var timeString = date[1];
            var H = +timeString.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? "AM" : "PM";
            timeString = h + timeString.substr(2, 3) + ampm;
            this.atcentre[j].newtime = timeString;
            this.atcentre[j].newdate = newDate;
          }
          if(this.atcentre[j].dropoff_time != null){
            var dropofftime = this.atcentre[j].dropoff_time;
            var etd = dropofftime.replace( /\n/g, " " ).split( " " );
            var dropdate = this.datePipe.transform(etd[0],"d MMM,y");
            var timeString1 = etd[1];
            var H1 = +timeString1.substr(0, 2);
            var h1 = (H1 % 12) || 12;
            var ampm1 = H1 < 12 ? "AM" : "PM";
            timeString1 = h1 + timeString1.substr(2, 3) + ampm1;
            this.atcentre[j].droptime = timeString1;
            this.atcentre[j].dropate = dropdate;
          }
       
        
       
      }
    }


}
});
  }
}
