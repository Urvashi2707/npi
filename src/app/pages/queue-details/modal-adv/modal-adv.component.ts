import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ServicingService } from '../../services/addServicing.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { QueueTableService } from '../../services/queue-table.service'
import { ListService } from '../../services/user.service'
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-adv',
  templateUrl: './modal-adv.component.html',
  styleUrls: ['./modal-adv.component.scss']
})
export class ModalAdvComponent implements OnInit {

  svcid:string;
  modalHeader:string;
  modalContent:any;
  pickup_card_group: FormGroup;
  queueID:any;
  user:any={};
  public serviceadv: any = [];
  constructor(private activeModal: NgbActiveModal, private _details: QueueTableService, private _data: ListService, private router: Router) { }

  closeModal() {
    this.activeModal.close();
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
    this.queueID = sessionStorage.getItem('QueueId');
    console.log(this.modalContent);
    this.getAdvisor();
  }

  getAdvisor() {
    const reqpara8 = {
      requesttype: 'getspecificsvcusers',
      usertype: 3,
      svcid:this.svcid
    }
    const as5 = JSON.stringify(reqpara8)
    this._data.getUserList(as5).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {

        this.serviceadv = res[0].users
        console.log(this.serviceadv);
      }

    });
  }

  saveadv(){
    console.log(this.user.service_advisor);
    const reqpara8 = {
      requesttype: 'updateadv',
      queueid: this.queueID ,
      advid:this.user.service_advisor,
      svcid:this.svcid
    }
    const as5 = JSON.stringify(reqpara8)
    this._data.getUserList(as5).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        console.log(res);
      }

    });
  }

}
