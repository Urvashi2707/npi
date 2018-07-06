import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../services/queue-table.service';
import { ListService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  tableData: any[];
  keyValues: any[];
  page: number = 1;
  public upcoming : any =[];
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  message:string;
  dataperpage:string;
  record_count:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  GlobalSvcid:string;
  SvcId:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;

  constructor(private spinner: NgxSpinnerService,
              private datePipe:DatePipe,
              private ngbDateParserFormatter: NgbDateParserFormatter,
              private _detailsTable: QueueTableService, 
              private _data: ListService, 
              private _tableService: QueueTableService, 
              private router: Router) { 
      this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      this.keyValues = ['queueid', 'cust_name', 'veh_number', '(select description from 21N_queue_services where id = 21N_queue.type_service)', 'queue_date', 'queue_time', 'queue_state'];
    });
    const date = new Date();
    this.model1 = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.dateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    var numberOfDays = 1;
    var dt = new Date();
         dt.setDate( dt.getDate() + numberOfDays );
    this.model = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.dateString1 = this.model.year + '-' + this.model.month + '-' + this.model.day;
  }
 
  ngOnInit() {
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
    console.log(this.GlobalSvcid);
    this.FilterCheck(1);
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Open Queue Details Page
  openQDetails(data:any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('clickedOn', '7')
    sessionStorage.setItem('QueueId',data.queueid)
    this._detailsTable.queueID = data.queueid;
    this.router.navigate(['/pages/queue-details']);
  }
  // openQDetails(indexId: any){
  //   sessionStorage.setItem('QueueId',this.tableData[indexId][this.keyValues[0]])
  //   sessionStorage.setItem('clickedOn', '7')
  //   this._detailsTable.queueID = this.tableData[indexId][this.keyValues[0]];
  //   this.router.navigate(['/pages/queue-details']);
  // }

  //On select of startDate
  onSelectStartDate(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.dateString = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString);
        }
      }

      //On select of End Date
  onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.dateString1 = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString1);
        }
       }


       //Upcoming table API call
  FilterCheck(p:number){
    this.spinner.show();
    this.page = p - 1 ;
    this.message = " ";
    const UpcmReqpara = {
      requesttype: 'getqueueinfonew',
      servicetype: '6',
      starttime: this.dateString,
      endtime: this.dateString1,
      pagenumber: this.page,
      svcid:this.SvcId
    }
    const UpReq = JSON.stringify(UpcmReqpara);
    console.log(UpReq);
    this._data.webServiceCall(UpReq).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        if(res[0].pagecount[0].hasOwnProperty('noqueues')){
          console.log('No queue');
          this.message = "No Data" ;
          this.spinner.hide();
         }
         else{
        this.upcoming = res[1].upcoming;
        this.record_count = res[0].pagecount[0].record_count;
        this.dataperpage = res[0].pagecount[0].pagelimit;
        console.log(this.record_count);
        this.spinner.hide();
        for (let j = 0; j < this.upcoming.length ; j++){
          if(this.upcoming[j].queue_date != null){
             var queuedate = this.upcoming[j].queue_date;
            var newDate = this.datePipe.transform(queuedate,"d MMM,y");
            this.upcoming[j].newdate = newDate;
          }
         if(this.upcoming[j].queue_time != null){
          var timeString = this.upcoming[j].queue_time ;
          var H = +timeString.substr(0, 2);
          var h = (H % 12) || 12;
          var ampm = H < 12 ? "AM" : "PM";
          timeString = h + timeString.substr(2, 3) + ampm;
          this.upcoming[j].newtime = timeString;
        }
       }
      }

      }
      // this._detailsTable.setTableData(res, 7);
    });
  }
}
