import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuccessComponent } from '../../user/success/success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSendLinkComponent } from '../../queue-details/modal-send-link/modal-send-link.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  tableData: any[];
  SearchData:string;
  RecordCount:string;
  DataPerPage:string;
  page:number;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  public paused : any =[];
  MessageNoData:string;
  key: string = 'queueid'; 
  reverse: boolean = false;
  StrtDateString: string;
  EndDateString: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  status:any= [];
  user:any = {};
  SvcId:string;
  sort_dir = false;

  constructor(private spinner: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private modalService: NgbModal,
    private _data: ServerService,
    private router: Router) { }

  ngOnInit() {
    this.status = [
      { id: 2, type: 'Cancelled' },
      { id: 1, type: 'Completed' },
      { id: 3, type: 'Pending' },
      // {id: 4, type: 'Completed'}
    ];
    this.user.status = this.status[2].id;
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    const date = new Date();
    this.model = {day:date.getUTCDate(),month:date.getUTCMonth() + 1,year: date.getUTCFullYear() };
    this.EndDateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    var dt = new Date();
         dt.setDate( dt.getDate() - 5 );
    this.model1 = { day: dt.getUTCDate(), month: dt.getUTCMonth() + 1, year: dt.getUTCFullYear()};
    this.StrtDateString = this.model1.year + '-' + this.model1.month + '-' + this.model1.day;
    this.FilterCheck(1);
  }

    //On select of startDate
    onSelectStartDate(date: NgbDateStruct){
      if (date != null) {
              this.model1 = date;
              this.StrtDateString = this.ngbDateParserFormatter.format(date);
              // localStorage.setItem('paused_startDate',JSON.stringify(this.model1));
          }
        }
  
        //On select of End Date
        onSelectEndDate(date: NgbDateStruct){
          if (date != null) {
                  this.model = date;
                  this.EndDateString = this.ngbDateParserFormatter.format(date);
                  // localStorage.setItem('paused_endDate',JSON.stringify(this.model));
              }
             }


             sort(key:any){
              this.sort_dir = true;
              this.key = key;
                this.reverse = !this.reverse;
                let arr =  this.tableData ;
                for(var i = 0; i < arr.length; i++){
                  for(var k in arr[i]) {
            
                      if (isNaN(arr [i][k]) == false){
                        arr[i][k] = parseFloat(arr[i][k]);
                            }
                        }
                  }
                  // console.log("date",typeof(arr[1]['creationdatetime']));
                  // console.log("amount",typeof(arr[1]['amount']));
                  // console.log("ref",typeof(arr[1]['first_name']));
                  // console.log("app",typeof(arr[1]['mobile']));
                  // console.log("ref",typeof(arr[1]['veh_number']));
                  // console.log("app",typeof(arr[1]['status']));

                  if(key == "amount" || key == "mobile"){
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
                  else if(key == "veh_number"){
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
                  }
                  }

  FilterCheck(p:number) {
    this.spinner.show();
    this.page = p - 1 ;
    this.MessageNoData= "";
    const ComReq = {
      requesttype: 'getqueueinfonewadd',
      servicetype: '19',
      starttime: this.StrtDateString,
      endtime: this.EndDateString,
      pagenumber: this.page,
      svcid:this.SvcId,
      type:this.user.status
    }
   const testparm =  {
      requesttype: "getqueueinfonewadd",
      servicetype: "19",
      starttime: "2018-12-06",
      endtime: "2018-12-19",
      pagenumber: "0",
      svcid: "975",
      type:1
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
        this.tableData = res[1].payment_gw_status;
        this.RecordCount = res[0].pagecount[0].record_count;
        this.DataPerPage = res[0].pagecount[0].pagelimit;
        this.tableData.reverse();
        this.spinner.hide();
       }}
    });
  }

  sendPaymentLink(Customer_Number,queueid) {
    // console.log(Customer_Number);
    sessionStorage.setItem('QueueId',queueid);
    const activeModal = this.modalService.open(ModalSendLinkComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Send Payment Link';
    activeModal.componentInstance.modalContent = Customer_Number;
  }

 

}
