
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ServicingService } from '../../services/addServicing.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pickup',
  templateUrl: './modal-pickup.component.html',
  styleUrls: ['./modal-pickup.component.scss']
})
export class ModalPickupComponent implements OnInit {

  modalContent:any;
  pickup_card_group: FormGroup;
  queueID:any;
  showAnimation = '0';
  visible = false;
  valuedate = new Date();
  modalHeader:string;
  public startDate;
  public minDate;
  public maxDate;
  public globalsvcid:string;
  public selectedsvcid:string;
  public show = false;
  pickupdate:string;
  svcid:string;
  show_slot:boolean;
  show_error_message:boolean = false;

  constructor(private activeModal: NgbActiveModal,private router: Router, private fb: FormBuilder, private ngbDateParserFormatter: NgbDateParserFormatter, private ServicingService: ServicingService,) { 
    this.pickup_card_group = this.fb.group({
      QID: [{value: '', disable: false}]
    })
  }
  model: NgbDateStruct;
  dateString: string;
  public slot: any = [];

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.dateString = this.ngbDateParserFormatter.format(date);
    }
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
        pickup_drop: 0,
        type_service: 0,
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
            // console.log(this.slot);
          }
        }
      });
    }
  }
  
  public slot_time: string;
  check(value: string) {
    this.slot_time = value;
    this.show=true;
  }

  closeModal() {
    this.activeModal.close();
  }

  buildArr(theArr: any[]) {
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

  ngOnInit() {
    this.queueID = sessionStorage.getItem('QueueId');
    const now = new Date();
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.startDate = this.model;
    this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
  }

  onSubmit(f: NgForm){
    if(this.slot_time === null || this.dateString === null){
      this.show_error_message = true;
    }
    if(this.dateString){
      this.pickupdate = this.dateString + ' ' + this.slot_time
    }
    else {
      this.pickupdate = this. modalContent.pu_time
    }
    if(this.modalContent.service = "pickup"){
      const reqpara2 = {
        requesttype: 'updatescheduled',
        queueid: this.queueID ,
        puaddress:f.value.pu_address,
        pulat:f.value.pu_lat,
        pulong:f.value.pu_long,
        queuetime:this.pickupdate,
        svcid:this.svcid
      }
      const as2 = JSON.stringify(reqpara2);
      this.ServicingService.webServiceCall(as2).subscribe(data => {
        if (data[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        } 
        else {
          if(data[0].updatestatus[0].is_updated === "1"){
            this.visible = true;
            this.showAnimation = '1';
          }
          else{
            this.visible = true;
            this.showAnimation = '0';
          }
        }
  });
    }
    else{
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
        } 
        else {
          this.activeModal.close();
    }
  });
    }

  }
}

