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
@Component({
  selector: 'app-at-centre',
  templateUrl: './at-centre.component.html',
  styleUrls: ['./at-centre.component.scss']
})
export class AtCentreComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'License Plate', 'Customer Name', 'Pickup Date', 'ETD', 'Paid/Unpaid', 'Amount','Status', 'Upload'];
  tableData: any[];
  keyValues: any[];
  today:string;
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  pastdate:string;
  globalsvcid:string;
  message:string;
  svcid:string;
  advisorName:string;

  constructor(private datePipe:DatePipe, private router:Router,private ngbDateParserFormatter: NgbDateParserFormatter,private modalService: NgbModal, private _detailsTable: QueueTableService, private _data: ListService, private _tableService: QueueTableService) {
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      console.log(this.tableData)
      
      // if (this.tableData.length > 0) {
        this.keyValues = ['queueid', 'veh_number', 'cust_name', 'queue_time', 'dropoff_time', 'payment_status', 'queue_total', 'queue_state', 'upload_button'];
      // }
    });
    var date = new Date();
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.today)
    var numberOfDays = 5;
    var days = date.setDate(date.getDate() - numberOfDays);
    this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    console.log(this.pastdate);
  }

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
    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '1',
      starttime: this.pastdate,
      endtime: this.today,
      pagenumber: '0',
      svcid:this.svcid 
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.createUser(as3).subscribe(res => {
      console.log(res);
      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
       }
       else{
         this.advisorName = res[1].service_advisor;
         console.log(this.advisorName );

         this._detailsTable.setTableData(res, 4);
       }
    });
  }
  datatopass:any;
  dataForUpload: any;

  uploadFiles(event : any,data:any){
    console.log(data);
    console.log(data.service_advisor)
    console.log(this.tableData[event.currentTarget.id].service_status)

  //  console.log(id);
    const activeModal = this.modalService.open(Modal4Component, { size: 'lg', container: 'nb-layout' });

    this.datatopass = {id:data.queueid, queue_exists: "0", service_status:data.service_status, queue_time:data.queue_time,service_advisor:data.service_advisor};
    this.dataForUpload = { id: sessionStorage.getItem('QueueId'), queue_date: new Date, service_status: this.tableData[event.currentTarget.id].service_status}
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

  onSelectDate1(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.dateString1 = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString1);
        }
        

  }
  openQDetails(indexId: any) {

    console.log(indexId);

    sessionStorage.setItem('QueueId', this.tableData[indexId][this.keyValues[0]])
    sessionStorage.setItem('QueueTime', this.tableData[indexId][this.keyValues[3]])
    console.log(this.tableData[indexId][this.keyValues[3]]);
    this._detailsTable.queueID = this.tableData[indexId][this.keyValues[0]];
    sessionStorage.removeItem('clickedOn');
    this.router.navigate(['/pages/queue-details']);

  }


  // getdetails(){}

  FilterCheck(){
    this.message=" ";

    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '1',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: '0',
      svcid:this.svcid 
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.createUser(as3).subscribe(res => {
      console.log(res);
      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
       }
       else{

        this.advisorName = res[1].service_advisor;
        console.log(this.advisorName );

         this._detailsTable.setTableData(res, 4);
       }
    });
  }
  

}
