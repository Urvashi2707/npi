import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import {environment} from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import { ServicingService } from '../../../services/addServicing.service';

@Component({
  selector: 'ngx-modal1',
  templateUrl: './BookingDetails.component.html',
  styleUrls: ['./BookingDetails.component.scss']
})
export class BookingDetails implements OnInit {

  modalHeader: string;
  modalContent:any;
  modalNotes:string;
  service_type:string;
  myFiles: string [] = [];
  sMsg: string = '';
  filename: string;
  requesttype= 'uploadfile';
  estorinvoice = '0';
  disable = true;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  subscription: Subscription;
  uploade_file = environment.upload_file;
  Credit:string;

  constructor(private service:ServicingService,private toasterService: ToasterService,private activeModal: NgbActiveModal,private httpService: HttpClient) { }
  ngOnInit() {
    // console.log(this.modalContent);
    // this.subscription = this.service.getMessage().subscribe(message => { 
    //   this.Credit = message.text;
    //   var show_btn = message.show_btn;
    //   console.log(this.Credit);
    //  });
    this.modalContent.typeodservive = "Drop Off"
  }
  closeModal() {
    this.activeModal.close();
    var credit = JSON.parse(sessionStorage.getItem('credit'));
      // if(credit <= "10000"){
      //   console.log("<=10000");
      //   this.service.sendMessage("909090","1");
      // }
      // else{
      //   console.log(">=10000");
      //   this.service.sendMessage("909090","0");
      // }
  }
  public httpOptions = {
    // headers: new HttpHeaders({'Content-Type':  'multipart/form-data'}),
    withCredentials: true
  };

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

  getFileDetails (e) {
    // console.log (e.target.files); 
    this.disable = false;
    this.filename = e.target.files[0].name;
    // console.log(this.filename);
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
    // console.log(this.myFiles);
    if(this.myFiles.length > 3){
      this.disable = true;
    }
    else {
      this.disable=false;
    }
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

  uploadFiles () {
    const frmData: FormData = new FormData();
    this.disable = true;
    frmData.append('requesttype', this.requesttype);
    frmData.append('queueid', this.modalContent.queue_id);
    frmData.append('dropoffdatetime', this.modalContent.queue_time);
    frmData.append('totalamount', this.modalContent.amt);
    frmData.append('invoiceidvar', this.modalContent.invoiceid);
    frmData.append('estorinvoice', this.estorinvoice);
    for ( var i = 0; i < this.myFiles.length; i++)  { 
      frmData.append('file' + i, this.myFiles[i]);
    }
    const us = JSON.stringify(frmData);
    // console.log(us);
    this.httpService.post(this.uploade_file, frmData,this.httpOptions).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
         this.showToast('default', 'Message', 'File uploaded successfully');
        this.sMsg = data as string;
        // console.log (this.sMsg);
        this.activeModal.close();
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);    // SHOW ERRORS IF ANY.
      }
    );


  

}
} 
