import { Component, OnInit } from '@angular/core';
import { QueueTableService } from '../services/queue-table.service';
import { ServerService } from '../services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-cre-reports',
  templateUrl: './cre-reports.component.html',
  styleUrls: ['./cre-reports.component.scss']
})
export class CreReportsComponent implements OnInit {

  SvcId:String;
  GlobalSvcId:String;
  message:string;
  SearchData:string;
  CreReports:any =[];

  constructor(private spinner: NgxSpinnerService,
                private _detailsTable: QueueTableService, 
                private _data: ServerService, 
                private _tableService: QueueTableService, 
                private router: Router) {}

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.GlobalSvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    this.GetCreData();
  }

  GetCreData(){
    const reqpara3 = {
      requesttype: 'getcrereports',
      svcid:this.SvcId
    }
    const as3 = JSON.stringify(reqpara3);
    console.log(as3);
    this._data.webServiceCall(as3).subscribe(res => {
      console.log(res);
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{

      if(res[0].cre_report[0].hasOwnProperty('no records')){
        console.log('No queue');
        this.message = 'No Data';
        this.spinner.hide();
       }
       else{
       console.log(res);
       this.CreReports = res[0].cre_report;
        this.spinner.hide();
       }}
    });
  }

}

