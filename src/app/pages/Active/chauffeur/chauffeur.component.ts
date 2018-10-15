import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {

  //variables
  tableData: any[];
  page:number=1;
  RecordCount:string;
  DataPerPage:string;
  chauffeur : any =[];
  EndDateString: string;
  StartDateString: string;
  model: NgbDateStruct;
  SearchData:string;
  key: string = 'queueid'; 
  reverse: boolean = false; 
  model1: NgbDateStruct;
  MessageNoData:string;
  GlobalSvcId:string;
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
    const date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
    this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.StartDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
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
      this.StartDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    }
    else if(localStorage.getItem('startDate') == null){
      console.log("Start Date Changed");
      var EndDate = JSON.parse(localStorage.getItem('endDate'));
      this.model = JSON.parse(localStorage.getItem('endDate'));
    }
    else if(localStorage.getItem('endDate') == null){
      console.log("End Date Changed");
      var StartDate = JSON.parse(localStorage.getItem('startDate'));
      this.model1 = JSON.parse(localStorage.getItem('startDate'));
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
      this.StartDateString = this.ngbDateParserFormatter.format(StartDate);
    }

    window.onbeforeunload = function(e) {
      console.log("page refreshed");
      localStorage.removeItem('startDate');
      localStorage.removeItem('endDate');
    };

  }

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.GlobalSvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    this.FilterCheck(1);
  }


 


    //On select of End Date
    onSelectEndDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.EndDateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('endDate',JSON.stringify(this.model));
        }
}

     //On select of startDate
    onSelectStartDate(date: NgbDateStruct){
      if (date != null) {
            this.model1 = date;
            this.StartDateString = this.ngbDateParserFormatter.format(date);
            localStorage.setItem('startDate',JSON.stringify(this.model1));
        }
    }


  img(event){
    event.target.src = '../../../assets/images/profile.svg';
  }

//Open Queue Details Page
  openQDetails(details:any) {
    sessionStorage.setItem('QueueId',details.queueid);
    this._detailsTable.queueID = details.queueid;
    sessionStorage.removeItem('clickedOn');
    this.router.navigate(['/pages/queue-details']);
}

 //Sort
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Chauffeur table API call
  FilterCheck(p:number){
    this.MessageNoData = null;
    this.spinner.show();
    this.page = p - 1 ;
    const ChaufReq = {
      requesttype: 'getqueueinfonew',
      servicetype: '5',
      starttime: this.StartDateString,
      endtime: this.EndDateString,
      pagenumber:this.page,
      svcid:this.SvcId 
    }
    const ActiveChauf = JSON.stringify(ChaufReq);
    this._data.webServiceCall(ActiveChauf).subscribe(res => {
      console.log(res);
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
          this.chauffeur = res[1].activechauf;
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        this.spinner.hide();
        this._tableService.DateFormat(this.chauffeur);
        this._tableService.TimeFormat(this.chauffeur);
       }
    }
    });
  }
  
}
