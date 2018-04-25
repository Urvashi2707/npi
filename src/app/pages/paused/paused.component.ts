import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueTableService } from '../services/queue-table.service';
import { ListService } from '../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-paused',
  templateUrl: './paused.component.html',
  styleUrls: ['./paused.component.scss']
})
export class PausedComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'Customer Name', 'License Plate','Slot','CRE','Reason'];
  tableData: any[];
  keyValues: any[];
  today:string;
  message:string;
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  pastdate:string;
  globalsvcid:string;
  svcid:string;
  constructor(private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private _detailsTable: QueueTableService, private _data: ListService, private _tableService: QueueTableService, private router: Router) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;

      console.log(this.tableData);

      this.keyValues = ['queueid', 'cust_name', 'veh_number', 'queue_time', 'cre_name', '(select description from 21N_queue_pause_reasons where id = (select reasonid from 21N_queue_pause_reasons_list where queueid = 21N_queue.id order by id desc limit 1))'];

    });
    var date = new Date();
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.today)
    var numberOfDays = 1;

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
      servicetype: '7',
      starttime: this.pastdate,
      endtime: this.today,
      pagenumber: '0',
      svcid:this.svcid
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.createUser(as3).subscribe(res => {
      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
        }
       else{
         this._detailsTable.setTableData(res, 8);
       }
    });
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
  openQDetails(indexId: any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('QueueId',this.tableData[indexId][this.keyValues[0]])
    this._detailsTable.queueID = this.tableData[indexId][this.keyValues[0]];
    this.router.navigate(['/pages/queue-details']);
  }
  FilterCheck(){
    this.message = " ";
    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '7',
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
       this.message = "No Data" ;
      }
      else{
        this._detailsTable.setTableData(res, 8);
      }
  
    });
  }
}
