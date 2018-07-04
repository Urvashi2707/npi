import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { QueueTableService } from '../services/queue-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ServicingService } from '../services/addServicing.service';
import {Modal4Component} from './modal/modal.component';
import { DatePipe } from '@angular/common';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpRequest} from '@angular/common/http';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private datePipe:DatePipe,private toasterService: ToasterService,private modalService: NgbModal,private _detailsTable: QueueTableService,private service:ServicingService,private http:HttpClient,private router:Router) { }

  public vehnumber : string;
  public report : any=[];
  public upload:string;
  isNewestOnTop = true;

  searchText:string;

  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  public globalsvcid:string;
  public selectedsvcid:string;
  svcid:string;

  key: string = 'id'; 
  reverse: boolean = false;

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
    // this.vehnumber = "";
    this.getData();
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  openQDetails(indexId: any){
    console.log(indexId)
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('QueueId',indexId)
    this._detailsTable.queueID = indexId;
    this.router.navigate(['/pages/queue-details']);
  }

  showModal(res:any) {
    const activeModal = this.modalService.open(Modal4Component, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = res.upload_button;
    activeModal.componentInstance.modalContent = res;
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
  getData(){
    this.vehnumber = "";
    this.vehnumber = sessionStorage.getItem('search')
    const reqpara1 = 
    {
      requesttype: 'getsearch',
      vehnumber_mobile:this.vehnumber,
      servicecentre_id:this.svcid
    }
      const as1 = JSON.stringify(reqpara1)
      this.service.webServiceCall(as1).subscribe
  (res => 
    {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        this.report = res[0].vehqueues;
        this.upload = this.report[0].upload_button,
        console.log(this.upload),
        console.log(this.report);
        for (let j = 0; j <  this.report.length ; j++){
          if( this.report[j].queue_date != null){
             var queuedate =  this.report[j].queue_date;
            var newDate = this.datePipe.transform(queuedate,"d MMM,y");
            this.report[j].newdate = newDate;
          }
         if( this.report[j].queue_time != null){
          var timeString =  this.report[j].queue_time ;
          var H = +timeString.substr(0, 2);
          var h = (H % 12) || 12;
          var ampm = H < 12 ? "AM" : "PM";
          timeString = h + timeString.substr(2, 3) + ampm;
          this.report[j].newtime = timeString;
          
         }
         
         }
      }

    }
  );
  }

}
