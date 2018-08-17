import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { NgForm } from '@angular/forms';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from '@angular/router';
import { ServerService } from '../../services/user.service'
import { ServicingService } from '../../services/addServicing.service';
@Component({
  selector: 'app-modal-dropoff',
  templateUrl: './modal-dropoff.component.html',
  styleUrls: ['./modal-dropoff.component.scss']
})
export class ModalDropoffComponent implements OnInit {

  modalContent:any;
  modalHeader:string;
  valuedate = new Date();
  pickup_card_group: FormGroup;
  queueID:any;
  public startDate;
  dateString: string;
  public minDate;
  public maxDate;
  public globalsvcid:string;
  public selectedsvcid:string;
  public show = false;
  pickupdate:string;
  svcid:string;
  model: NgbDateStruct;
  service_type: string;
  myFiles: string[] = [];
  sMsg: string = '';
  filename: string;
  requesttype = 'uploadfile';
  estorinvoice = '0';
  disable = true;
  isNewestOnTop = true;
  isHideOnClick = true;
  showAnimation = '0';
  visible = false;
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
  // showAnimation = '0';
  public slot: any[];
  showSlot = '0';

  constructor( private ServicingService: ServicingService,private ngbDateParserFormatter: NgbDateParserFormatter,private toasterService: ToasterService, private activeModal: NgbActiveModal, private httpService: HttpClient, private router: Router, private _data: ServerService) { }

  ngOnInit() {
    this.queueID = sessionStorage.getItem('QueueId');
    console.log(this.modalContent);
    const now = new Date();
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.startDate = this.model;
    console.log(this.startDate);
    this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
    console.log(this.minDate);
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
    console.log(this.maxDate);
    if(sessionStorage.getItem('selectedsvc')){
      // console.log(sessionStorage.getItem('selectedsvc'));
      this.svcid = sessionStorage.getItem('selectedsvc');
      // console.log(this.svcid);
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      // console.log(this.svcid);
    }
   
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
  // model: NgbDateStruct;
  // dateString: string;
 
  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.dateString = this.ngbDateParserFormatter.format(date);
      console.log(this.dateString);
    }
    
    // this.showToast('default', 'Time', 'Please Select time');
    this.slot = [];
    this.getSlot(this.dateString);
  }
  public pickup_drop: number;
  getSlot(Date: string) {
    this.pickup_drop = 0;
      console.log(this.pickup_drop);
    if (Date) {
      const reqpara5 = {
        requesttype: 'getslotsv2',
        reqdate: Date,
        pickup_drop: this.pickup_drop,
        type_service:0,
        svcid:this.svcid
      }
      const as5 = JSON.stringify(reqpara5)
      this.ServicingService.webServiceCall(as5).subscribe(res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          if (res[0].slots.length == 0) {
            // this.showToast('default', 'No Slot', 'Sorry !! No Slot Unavailable ');
          }
          else {
            this.slot = res[0].slots;
            // this.showToast('default', 'Select Slot', 'Please Select Slot');
            console.log(this.slot);
          }
        }
      });
    }
  }

public slot_time: string;
check(value: string) {
  console.log(value);
  this.slot_time = value;
  this.show=true;
}
  closeModal() {
    this.activeModal.close();
  }

  buildArr(theArr: any) {
    var arrOfarr = [];
    if (theArr.length > 0) {
      for (var i = 0; i < theArr.length; i += 4) {
        var row = [];
        for (var x = 0; x < 6; x++) {
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


  onSubmit(f: NgForm){
    console.log(f.value);
    console.log(this.dateString);
    if(this.dateString){
      this.pickupdate = this.dateString + ' ' + this.slot_time
    }
    else {
      this.pickupdate = this. modalContent.pu_time
    }
    const reqpara2 = {
      requesttype: 'updatedropoff',
      queueid: this.queueID ,
      doaddress:f.value.do_address,
      dolat:f.value.dropofflat,
      dolong:f.value.dropofflong,
      doqueuetime:this.pickupdate,
      svcid:this.svcid
    }
    const as2 = JSON.stringify(reqpara2);
    console.log(as2);
    this.ServicingService.webServiceCall(as2).subscribe(data => {
      if (data[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      } else {
        console.log(data);
        this.activeModal.close();
  }
});
  }
}
