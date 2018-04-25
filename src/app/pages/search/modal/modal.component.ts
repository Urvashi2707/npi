import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ServicingService } from '../../services/addServicing.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { OnlyNumber } from '../../number.directive';;
import { HttpErrorResponse } from '@angular/common/http/src/response';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class Modal4Component implements OnInit {

  constructor(private toasterService: ToasterService,private router:Router,private activeModal: NgbActiveModal,private ServicingService:ServicingService, private ngbDateParserFormatter: NgbDateParserFormatter,private http:HttpClient) { }
  modalHeader: string;
  modalContent:any;
  service_type:string;
  public vehnumber : string;
  public report : any=[];
  public upload:string;
  myFiles: string [] = [];
  sMsg: string = '';
  filename: string;
  requesttype= 'uploadfilev2';

  est = '0';
  inv = '1';
  disable = true;
  model: NgbDateStruct;
  dateString: string;

  public serviceadv: any = [];

  public slot:any = [];
  isNewestOnTop = true;
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
  public slot_time:string;
  invoiceDate:string;
  estDate:string;
  showAnimation = '0';
  public startDate;
  public minDate;
  public maxDate;
  visible = false;

  public details:any=[];
  queuetime:string;
  svcid:string;
  
  ngOnInit() {
    console.log(this.modalContent);
   
    if(sessionStorage.getItem('selectedsvc')){
      // console.log(sessionStorage.getItem('selectedsvc'));
      this.svcid = sessionStorage.getItem('selectedsvc');
      // console.log(this.svcid);
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      // console.log(this.svcid);
    }

    this.modalContent.amt = 0;
    const now = new Date();
    this.startDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    // this.startDate = this.model;
    console.log(this.startDate);
    this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
    console.log(this.minDate);
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
    console.log(this.maxDate);
    this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    console.log(this.globalsvcid);

    this.getAdvisor();
    this.getDetails()
    // console.log(this.serviceadv.length);
  
  }
  public httpOptions = {
    // headers: new HttpHeaders({'Content-Type':  'multipart/form-data'}),
    withCredentials: true
  };
  onSelectDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.dateString = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString);
        }
        // this.showToast('default', 'Time', 'Please Select time');
        this.slot = [];
        this.getSlot(this.dateString);
      }
  
  setDefaultDate(): NgbDateStruct {
        var startDate = new Date();
        let startYear = startDate.getFullYear().toString();
        let startMonth = startDate.getMonth() + 1; 
        let startDay = "1";

        return this.ngbDateParserFormatter.parse(startYear + "-" + startMonth.toString() + "-" + startDay);
}
  closeModal() {
    this.activeModal.close();
  }
 check(value: string,time:string) {
    console.log(value);
    this.queuetime = value;
    this.modalContent.queue_time=time;
    
    }
    buildArr(theArr: any[]){
      var arrOfarr = [];
      if(theArr.length > 0){
       for(var i = 0; i < theArr.length ; i+=4) {
         var row = [];
         for(var x = 0; x < 4; x++) {
           var value = theArr[i + x];
             if (!value) {
                 break;
             }
             row.push(value);
         }
         arrOfarr.push(row);
     }
      }
     
       return arrOfarr;
     }
  getSlot(Date:string){
      if(Date){
      const reqpara5 = {
        requesttype: 'getslots',
        reqdate:Date,
        pickup_drop:1,
        svcid:this.globalsvcid
        }
    const as5 = JSON.stringify(reqpara5)
    this.ServicingService.getSlot(as5).subscribe(res => { 
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        if(res[0].slots.length == 0){
          // this.showToast('default', 'No Slot', 'Sorry !! No Slot Unavailable ');
        }
        else{
          this.slot = res[0].slots;
          // this.showToast('default', 'Select Slot', 'Please Select Slot');
          console.log(this.slot);
        }
          
         
      }
      
          
        });
    }

    }

    getFileDetails (e) {
      console.log (e.target.files);
      this.disable = false;
      this.filename = e.target.files[0].name;
      console.log(this.filename);
      for (var i = 0; i < e.target.files.length; i++) { 
        this.myFiles.push(e.target.files[i]);
      }
      console.log(this.myFiles);
      if(this.myFiles.length > 3){
        this.disable = true;
      }
      else {
        this.disable=false;
      }
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
    removefile(file) {
      const index: number = this.myFiles.indexOf(file);
      if (index !== -1) {
          this.myFiles.splice(index, 1);
      } 
      if(this.myFiles.length > 0 ){
        this.disable = false;
      }
      else{
        this.disable = true;
      }
    }


    getDetails(){
      const reqpara10 = {
        requesttype: 'getqueuebasichistory',
        queueidvar: sessionStorage.getItem('QueueId'),
      }
      const as10 = JSON.stringify(reqpara10)
      this.ServicingService.getVariant(as10).subscribe(res => {
        this.details = res;
        console.log('details')
        console.log(this.details);
    })}

    getAdvisor() {
      const reqpara8 = {
        requesttype: 'getspecificsvcusers',
        usertype: 3,
        svcid:this.svcid
      }
      const as5 = JSON.stringify(reqpara8)
      this.ServicingService.getVariant(as5).subscribe(res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
  
          this.serviceadv = res[0].users
          console.log(this.serviceadv);
          // console.log(this.serviceadv.length);
          if(this.modalContent.hasOwnProperty('advName'))
          {
            console.log(this.modalContent.advName);
            for (let i = 0; i < this.serviceadv.length; i++) {
              if (this.serviceadv[i].first_name === this.modalContent.advName) {
                this.modalContent.service_advisor = this.serviceadv[i].id ;
                console.log(this.modalContent.service_advisor)
              }
            }
          }

          if(this.modalContent.hasOwnProperty('service_advisor'))
          {
            console.log(this.modalContent.service_advisor);
            for (let i = 0; i < this.serviceadv.length; i++) {
              if (this.serviceadv[i].first_name === this.modalContent.service_advisor) {
                this.modalContent.service_advisor = this.serviceadv[i].id ;
                console.log(this.modalContent.service_advisor)
              }
            }
          }
        }
  
      });
    }

  
    uploadFilesInv () {
      const frmData: FormData = new FormData();

      if(this.dateString){
        this.invoiceDate = this.dateString;

      }
      else{
        this.invoiceDate = this.modalContent.queue_date;
      }

      if(!this.queuetime){
       this.queuetime = this.modalContent.queue_time
      }
      
      this.disable = true;
      frmData.append('requesttype', this.requesttype);
      frmData.append('queueid', this.modalContent.id);
      frmData.append('dropoffdatetime', this.invoiceDate + " " + this.queuetime );
      frmData.append('totalamount', this.modalContent.amt);
      frmData.append('invoiceidvar', this.modalContent.invoiceid);
      frmData.append('estorinvoice', this.inv);
      frmData.append('notes',this.modalContent.notes);
      frmData.append('advisor',this.modalContent.service_advisor);

      for ( var i = 0; i < this.myFiles.length; i++)  { 
        frmData.append('file' + i, this.myFiles[i]);
      }
      const us = JSON.stringify(frmData);
      console.log(us);
      this.http.post('http://m.21north.in/notify/uploadfile.php', frmData,this.httpOptions).subscribe(
        data => {
          // SHOW A MESSAGE RECEIVED FROM THE WEB API.
          //  this.showToast('default', 'Message', 'File uploaded successfully');
          this.sMsg = data as string;
          console.log (this.sMsg);
          if(data[0].queueupdate[0].queue_updated == 1)
          {
             
              this.visible = true;
              this.showAnimation = '1';
            this.getData();
            // this.activeModal.close();
          }
          else{
            this.visible = true;
            this.showAnimation = '0';
            // this.activeModal.close();
          }
          
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);    // SHOW ERRORS IF ANY.
        }
      );
  
  
    
  
  }

  uploadFilesEst () {
    const frmData: FormData = new FormData();

    if(this.dateString){
      this.estDate = this.dateString;

    }
    else{
      this.estDate = this.modalContent.queue_date;
    }
    if(!this.queuetime){
      this.queuetime = this.modalContent.queue_time
     }
    this.disable = true;
    frmData.append('requesttype', this.requesttype);
    frmData.append('queueid', this.modalContent.id);
    frmData.append('dropoffdatetime', this.estDate + " " + this.queuetime);
    frmData.append('totalamount', this.modalContent.amt);
    frmData.append('invoiceidvar', this.modalContent.invoiceid);
    frmData.append('estorinvoice', this.est);
    frmData.append('notes',this.modalContent.notes);
    frmData.append('advisor',this.modalContent.service_advisor);

    for ( var i = 0; i < this.myFiles.length; i++)  { 
      frmData.append('file' + i, this.myFiles[i]);
    }
    const us = JSON.stringify(frmData);
    console.log(us);
    this.http.post('http://m.21north.in/notify/uploadfile.php', frmData,this.httpOptions).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        //  this.showToast('default', 'Message', 'File uploaded successfully');
        this.sMsg = data as string;
        console.log (this.sMsg);
        if(data[0].queueupdate[0].queue_updated == 1)
        {
          
          this.visible = true;
          this.showAnimation = '1';
          this.getData();
          // this.activeModal.close();
        }
        else{
          this.visible = true;
          this.showAnimation = '0';
          // this.activeModal.close();
        }
        
        // this.activeModal.close();
        // this.getData();
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);    // SHOW ERRORS IF ANY.
      }
    );


  

}

getData(){
  this.vehnumber = sessionStorage.getItem('search')
  const reqpara1 = 
  {
    requesttype: 'getsearch',
    vehnumber_mobile:this.vehnumber
  }
    const as1 = JSON.stringify(reqpara1)
    this.ServicingService.getBrands(as1).subscribe
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
    }

  }
);
}

}
