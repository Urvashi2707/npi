import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueTableService } from '../services/queue-table.service';
import { ListService } from '../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {


  pickup_headings: String[] = ['ID', 'Customer Name', 'License Plate',  'Payment Status','Amount', 'Rating'];
  term:string;
  p: number = 1;
    tableData: any[];
  keyValues: any[];
  today: string;
  page:any = [];
  loading: boolean;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  record_count:string;
  public completed : any =[];
  dateString: string;
  startpage:number;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  message:string;
  dataperpage:string;
  key: string = 'queueid'; 
  isNewestOnTop = true;
  isHideOnClick = true;
  config: ToasterConfig;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  reverse: boolean = false;
  pastdate: string;
  globalsvcid:string;
  svcid:string;
  constructor(private toasterService: ToasterService,private spinner: NgxSpinnerService,private datePipe: DatePipe, private ngbDateParserFormatter: NgbDateParserFormatter, private _detailsTable: QueueTableService, private _data: ListService, private _tableService: QueueTableService, private router: Router) {
    this._tableService.clickedID.subscribe(value => {
      this.tableData = _tableService.table_data;
      this.keyValues = ['queueid', 'cust_name', 'veh_number', 'payment_status', 'queue_total', 'rating'];
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
    this.FilterCheck(1);
    // const reqpara3 = {
    //   requesttype: 'getqueueinfonew',
    //   servicetype: '9',
    //   starttime: this.pastdate,
    //   endtime: this.today,
    //   pagenumber: '0',
    //   svcid:this.svcid
    // }
    // const as3 = JSON.stringify(reqpara3);
    // console.log(as3);
    // this._data.createUser(as3).subscribe(res => {
    //   if(res[0].login === 0){
    //     sessionStorage.removeItem('currentUser');
    //     this.router.navigate(['/auth/login']);
    //   }
    //   else{

    //   if(res[0].pagecount[0].hasOwnProperty('noqueues')){
    //     console.log('No queue');
    //     this.message = 'No Data';
    //    }
    //    else{

    //     this.completed = res[1].completed;
    //     console.log(this.completed)
    //     this.page = res[0].pagecount;
    //     console.log(this.page[0].record_count);
    //    }}
    // });

  }

  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  onSelectDate(date: NgbDateStruct) {
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
  onSelectDate1(date: NgbDateStruct) {
    if (date != null) {
      this.model1 = date;
      this.dateString1 = this.ngbDateParserFormatter.format(date);
      console.log(this.dateString1);
    }
  }
  openQDetails(data:any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('QueueId',data.queueid)
    this._detailsTable.queueID = data.queueid;
    this.router.navigate(['/pages/queue-details']);
  }
  // openQDetails(indexId: any) {
  //   sessionStorage.removeItem('clickedOn');
  //   sessionStorage.setItem('QueueId', this.tableData[indexId][this.keyValues[0]])
  //   this._detailsTable.queueID = this.tableData[indexId][this.keyValues[0]];
  //   this.router.navigate(['/pages/queue-details']);
  // }

  FilterCheck(p:number) {
    this.loading = true;
    this.spinner.show();
    this.p = p - 1 ;
    this.message= "";
    const reqpara3 = {
      requesttype: 'getqueueinfonew',
      servicetype: '9',
      starttime: this.dateString1,
      endtime: this.dateString,
      pagenumber: this.p,
      svcid:this.svcid
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

      if(res[0].pagecount[0].hasOwnProperty('noqueues')){
        console.log('No queue');
        this.message = 'No Data';
        this.spinner.hide();
       }
       else{
        this.loading = false;
        this.completed = res[1].completed;
        this.record_count = res[0].pagecount[0].record_count;
        this.dataperpage = res[0].pagecount[0].pagelimit;
        console.log(this.record_count);
        this.spinner.hide();
       }}
      // this._detailsTable.setTableData(res, 10);
    });
  }
}
