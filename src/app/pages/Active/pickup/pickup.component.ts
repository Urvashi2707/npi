import { Component, OnInit } from '@angular/core';
import { NgbDateStruct,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {

  //variables
  tableData: any[];
  SearchData:string;
  RecordCount:string;
  DataPerPage:string;
  pickup : any =[];
  page:number=1;
  EndDateString: string;
  StartDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  MessageNoData:string;
  GlobalSvcId:string;
  SvcId:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  key: string = 'id'; 
  reverse: boolean = false;

  constructor(private spinner: NgxSpinnerService,
                private ngbDateParserFormatter: NgbDateParserFormatter,
                private _detailsTable: QueueTableService,
                private _data: ServerService, 
                private _tableService: QueueTableService, 
                private router: Router) {

    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
    });
    const date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
    this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.StartDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
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
    this.FilterCheck(1);
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
  }

  //sort
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
 
 //On select of endDate
  onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.EndDateString = this.ngbDateParserFormatter.format(date);
        }
      }

       //On select of startDate
      onSelectStartDate(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.StartDateString = this.ngbDateParserFormatter.format(date);
        }

      }
//Open Queue Details Page

  img(event){
    console.log(event);
    event.target.src = '../../../assets/images/profile.svg';
    console.log("image broken");
  }

  openQDetails(indexId: any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('QueueId',indexId)
    this._detailsTable.queueID = indexId;
    this.router.navigate(['/pages/queue-details']);
  }
//Pickup table API call
  FilterCheck(p:number){
    this.MessageNoData=" ";
    this.spinner.show();
    this.page = p - 1 ;
    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '0',
      starttime: this.StartDateString,
      endtime: this.EndDateString,
      pagenumber:this.page,
      svcid:this.SvcId 
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
        this.MessageNoData = 'No Data';
        this.spinner.hide();
       }
       else{
        this.pickup = res[1].activepickup;
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        this.spinner.hide();
        // this._tableService.DateFormat(this.pickup);
        // this._tableService.TimeFormat(this.pickup);
        this._tableService.DateTimeFormat(this.pickup);
        console.log(this.pickup);
    }
  }
});
  }
}

