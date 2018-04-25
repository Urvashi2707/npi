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
        requesttype: 'getslots',
        reqdate: Date,
        pickup_drop: this.pickup_drop,
        svcid:this.svcid
      }
      const as5 = JSON.stringify(reqpara5)
      this.ServicingService.getSlot(as5).subscribe(res => {
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
  buildArr(theArr: any[]) {
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
      requesttype: 'updatescheduled',
      queueid: this.queueID ,
      puaddress:f.value.pu_address,
      pulat:f.value.pu_lat,
      pulong:f.value.pu_long,
      queuetime:this.pickupdate,
      svcid:this.svcid
    }
    const as2 = JSON.stringify(reqpara2);
    console.log(as2);
    this.ServicingService.AddSerivicng(as2).subscribe(data => {
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
