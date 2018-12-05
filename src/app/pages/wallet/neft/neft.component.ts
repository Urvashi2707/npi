import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { QueueTableService } from '../../services/queue-table.service';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import {  NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'app-neft',
  templateUrl: './neft.component.html',
  styleUrls: ['./neft.component.scss']
})
export class NeftComponent implements OnInit {

  // variable
  show_neft:boolean = false;
  SearchData:string;
  page: number = 1;
  tableData: any[];
  RecordCount:string;
  public neft : any =[];
  EndDateString: string;
  StrtDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  MessageNoData:string;
  DataPerPage:string;
  key: string = 'creationdatetime'; 
  reverse = true;
  SvcId:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  sort_dir = false;


  constructor(private spinner: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter, 
    private _detailsTable: QueueTableService, 
    private _data: ServerService, 
    private _tableService: QueueTableService, 
    private router: Router) { }

  ngOnInit() {
    this.sort_dir = false;
    const date = new Date();
      this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
      this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
      var dt = new Date();
           dt.setDate( dt.getDate() - 7 );
      this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
      this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
    this.FilterCheck(1);
  }

  //sort function
//   sort(key) {  
//     let arr = this.neft;
//     this.ascending = !this.ascending;
//     arr.sort(this.dynamicSort(key,this.ascending));
// }

dynamicSort(property,sortDir) {
    return function (a,b) {
        if(sortDir == true){
            var sortOrder = 1;
            var result = (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0;
            return result * sortOrder;
        }
        else{
            sortOrder = 2
            var result = (a[property].toLowerCase() < b[property].toLowerCase()) ? 1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? -1 : 0;
            return result * sortOrder;
        }
    }
}

sort(key:any){
  this.sort_dir = true;
  this.key = key;
    this.reverse = !this.reverse;
    let arr = this.neft;
    for(var i = 0; i < arr.length; i++){
      for(var k in arr[i]) {

          if (isNaN(arr [i][k]) == false){
            arr[i][k] = parseInt(arr[i][k]);
                }
            }
      }
      // console.log("date",typeof(arr[1]['creationdatetime']));
      // console.log("amount",typeof(arr[1]['amount']));
      // console.log("ref",typeof(arr[1]['reference_number']));
      // console.log("app",typeof(arr[1]['isapproved']));
      if(key == "amount" || key == "isapproved"){
        // console.log("amount","isapproved","clicked");
        if(this.reverse == true){
          arr.sort(function(a, b) {
            return a[key] - b[key];
        });
        }
        else{
          arr.sort(function(a, b) {
            return b[key] - a[key];
        });
        }
      }
      else if(key == "reference_number"){
        if(this.reverse == true){
          arr.sort(function(a, b) {
            var titleA = a[key], titleB = b[key];
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
        }
        else{
          arr.sort(function(a, b) {
            var titleA = a[key], titleB = b[key];
            if (titleA < titleB) return 1;
            if (titleA > titleB) return -1;
            return 0;
        });
        }
      }
      else{
        if(this.reverse == true){
          arr.sort(function(a, b) {
            var titleA = a[key].toLowerCase(), titleB = b[key].toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
        }
        else{
          arr.sort(function(a, b) {
            var titleA = a[key].toLowerCase(), titleB = b[key].toLowerCase();
            if (titleA < titleB) return 1;
            if (titleA > titleB) return -1;
            return 0;
        });
        }
  //  console.log("ref","date","clicked");
      }
      }

 

  FilterCheck(p:number) {
    this.spinner.show();
    this.spinner.show();
    this.page = p - 1 ;
    this.MessageNoData= "";
    const ComReq = {
      requesttype: 'getqueueinfonew',
      servicetype: '18',
      starttime: this.StrtDateString,
      endtime: this.EndDateString,
      pagenumber: this.page,
      svcid:this.SvcId
    }
    const ComRq = JSON.stringify(ComReq);
    this._data.webServiceCall(ComRq).subscribe(res => {
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
        this.neft = res[1].prepaid_approve;
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        this.spinner.hide();
       }}
    });
  }

}
