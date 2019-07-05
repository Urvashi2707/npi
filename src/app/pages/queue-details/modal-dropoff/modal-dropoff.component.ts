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
  show_slot:boolean;
  show_error_message:boolean = false;
  public slot: any[];
  showSlot = '0';

  constructor( private ServicingService: ServicingService,private ngbDateParserFormatter: NgbDateParserFormatter,private toasterService: ToasterService, private activeModal: NgbActiveModal, private httpService: HttpClient, private router: Router, private _data: ServerService) { }

  ngOnInit() {
    this.queueID = sessionStorage.getItem('QueueId');
    // console.log(this.modalContent);
    const now = new Date();
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.startDate = this.model;
    // console.log(this.startDate);
    this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
    // console.log(this.minDate);
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
    // console.log(this.maxDate);
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

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.dateString = this.ngbDateParserFormatter.format(date);
      // console.log(this.dateString);
    }
    
    // this.showToast('default', 'Time', 'Please Select time');
    this.slot = [];
    this.getSlot(this.dateString);
  }
  public pickup_drop: number;
  getSlot(Date: string) {
    this.show_error_message = false;
    this.pickup_drop = 0;
    this.show = false;
    this.slot_time = null;
    var cityId = JSON.parse(sessionStorage.getItem('city_id'));
    if (Date) {
      const reqpara5 = {
        requesttype: 'getslotsv2city',
        reqdate: Date,
        pickup_drop: 1,
        type_service: 1,
        cityid: cityId
      }
      const as5 = JSON.stringify(reqpara5)
      this.ServicingService.webServiceCall(as5).subscribe(res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          if (res[0].slots.length == 0) {
          }
          else {
            this.show_slot = true;
            this.slot = res[0].slots;
          }
        }
      });
    }
  }

public slot_time: string;
check(value: string) {
  // console.log(value);
  this.show_error_message = false;
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
        for (var x = 0; x < 4; x++) {
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
    if(this.slot_time === null || this.dateString === null){
      this.show_error_message = true;
    }
    else{
      if(this.dateString){
        this.pickupdate = this.dateString + ' ' + this.slot_time
      }
      else {
        this.pickupdate = this. modalContent.pu_time;}
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
        this.ServicingService.webServiceCall(as2).subscribe(data => {
          if (data[0].login === 0) {
            sessionStorage.removeItem('currentUser');
            this.router.navigate(['/auth/login']);
          } else {
            if(data[0].updatestatus[0].is_updated === "1"){
              this.visible = true;
              this.showAnimation = '1';
            }
            else{
              this.visible = true;
              this.showAnimation = '0';
            }
            // this.activeModal.close();
      }
    });
      }
    }
}
