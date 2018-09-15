import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from '@angular/router';
import { ServerService } from '../../services/user.service';
import {environment} from '../../../../environments/environment'

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.scss']
})
export class ModalUploadComponent implements OnInit {

  modalHeader: string;
  modalContent: any;
  service_type: string;
  myFiles: string[] = [];
  sMsg: string = '';
  filename: string;
  requesttype = 'uploadfile';
  estorinvoice = '0';
  disable = true;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  title = 'HI there!';
  content = `I'm cool toaster!`;
  timeout = 5000;
  toastsLimit = 5;
  type = 'default';
  showAnimation = '0';
  public slot: any[];
  showSlot = '0';
  upload_file = environment.upload_file;

  constructor(private toasterService: ToasterService, private activeModal: NgbActiveModal, private httpService: HttpClient, private router: Router, private _data: ServerService) { }
  
  ngOnInit() {
    this.getSlot();
  }
  closeModal() {
    this.activeModal.close();
  }
  public httpOptions = {
    // headers: new HttpHeaders({'Content-Type':  'multipart/form-data'}),
    withCredentials: true
  };


  getSlot(){
    const reqpara5 = {
      requesttype: 'getslots',
      reqdate: new Date(),
      pickup_drop: '1'
    }
    const as5 = JSON.stringify(reqpara5)
    this._data.webServiceCall(as5).subscribe(res => {
      // if (res[0].login === 0) {
      //   sessionStorage.removeItem('currentUser');
      //   this.router.navigate(['/auth/login']);
      // }
      // else {
        this.showSlot = '1';
        this.slot = res[0].slots;
        console.log(this.slot);
      // }


    });
  }
  getFileDetails(e) {
    console.log(e.target.files);
    this.disable = false;
    this.filename = e.target.files[0].name;
    console.log(this.filename);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
    console.log(this.myFiles);
    if (this.myFiles.length > 3) {
      this.disable = true;
    }
    else {
      this.disable = false;
    }
  }

  removefile(file) {
    const index: number = this.myFiles.indexOf(file);
    if (index !== -1) {
      this.myFiles.splice(index, 1);
    }
    if (this.myFiles.length > 0) {
      this.disable = false;
    }
    else {
      this.disable = true;
    }
  }

  uploadFiles() {
    const frmData: FormData = new FormData();

    this.disable = true;
    frmData.append('requesttype', this.requesttype);
    frmData.append('queueid', sessionStorage.getItem('QueueId'));
    frmData.append('dropoffdatetime', this.modalContent.queue_time);
    frmData.append('totalamount', this.modalContent.amt);
    frmData.append('invoiceidvar', this.modalContent.invoiceid);
    frmData.append('estorinvoice', this.modalContent.service_status);
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append('file' + i, this.myFiles[i]);
    }
    const us = JSON.stringify(frmData);
    console.log(us);
    this.httpService.post(this.upload_file, frmData, this.httpOptions).subscribe(
      data => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        // this.showToast('default', 'Message', 'File uploaded successfully');
        this.showAnimation = '1';
        this.sMsg = data as string;
        console.log("File Uploaded");
        console.log(this.sMsg);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);    // SHOW ERRORS IF ANY.
      }
    );
  }
  buildArr(theArr: any[]){
    debugger;
   var arrOfarr = [];
   for(var i = 0; i < theArr.length ; i+=4) {
       var row = [];
       for(var x = 0; x < 6; x++) {
         var value = theArr[i + x];
           if (!value) {
               break;
           }
           row.push(value);
       }
       arrOfarr.push(row);
   }
    return arrOfarr;
  }
  slot_time: string;
  check(value: string) {
    console.log(value);
    this.slot_time = value;
    this.modalContent.queue_time = value;
  }

}
