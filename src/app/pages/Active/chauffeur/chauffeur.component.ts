import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { QueueTableService } from '../../services/queue-table.service';
import { ListService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {

  pickup_headings: String[] = ['ID', 'Customer', 'License Plate','PickUp Location','Drop-off Location','Started At','Chauffer Name', 'Chauffeur No', 'Service'];
  tableData: any[];
  keyValues: any[];
  today:string;
  public chauffeur : any =[];
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  term:string;
  key: string = 'queueid'; 
  reverse: boolean = false; 
  model1: NgbDateStruct;
  pastdate:string;
  message:string;
  globalsvcid:string;
  svcid:string;
  constructor(private datePipe:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter,private _detailsTable: QueueTableService, private _data: ListService, private _tableService: QueueTableService, private router: Router) { 
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      this.keyValues = ['queueid', 'cust_name', 'veh_number', 'pickup_address', 'dropoff_address', '(select starttime from 21N_queue_chauffer where queueid = 21N_queue.id)', 'amb_name', 'amb_number', 'queue_state'];
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
      servicetype: '5',
      starttime: this.pastdate,
      endtime: this.today,
      pagenumber: '0',
      svcid:this.svcid 
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.createUser(as3).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{

      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
       }
       else{

        this.chauffeur = res[1].activechauf;
        console.log(this.chauffeur)
       }
    }
      // this._detailsTable.setTableData(res, 6);
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
  // openQDetails(indexId: any){
  //   sessionStorage.setItem('QueueId',this.tableData[indexId][this.keyValues[0]]);
  //   sessionStorage.removeItem('clickedOn');
  //   this._detailsTable.queueID = this.tableData[indexId][this.keyValues[0]];
  //   this.router.navigate(['/pages/queue-details']);
    
  // }
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
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  FilterCheck(){
    this.message = " ";

    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '5',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: '0',
      svcid:this.svcid 
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.createUser(as3).subscribe(res => {
      console.log(res);
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{

      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
       }
       else{

        this.chauffeur = res[1].activechauf;
        console.log(this.chauffeur)
       }
    }
    });
  }
}
