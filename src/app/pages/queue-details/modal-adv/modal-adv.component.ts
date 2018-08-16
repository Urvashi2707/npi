import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ServicingService } from '../../services/addServicing.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { QueueTableService } from '../../services/queue-table.service'
import { ServerService } from '../../services/user.service'
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from '../../user/success/success.component';
@Component({
  selector: 'app-modal-adv',
  templateUrl: './modal-adv.component.html',
  styleUrls: ['./modal-adv.component.scss']
})
export class ModalAdvComponent implements OnInit {

  svcid:string;
  modalHeader:string;
  modalContent:any;
  showAnimation = '0';
  visible = false;
  pickup_card_group: FormGroup;
  queueID:any;
  user:any={};
  public serviceadv: any = [];
  constructor(private activeModal: NgbActiveModal, private _details: QueueTableService, private _data: ServerService, private router: Router) { }

  closeModal() {
    this.activeModal.close();
  } 

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.queueID = sessionStorage.getItem('QueueId');
    console.log(this.modalContent,"model Contetnt");
    this.getAdvisor();
  }

  getAdvisor() {
    const reqpara8 = {
      requesttype: 'getspecificsvcusers',
      usertype: 3,
      svcid:this.svcid
    }
    const as5 = JSON.stringify(reqpara8)
    this._data.webServiceCall(as5).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.serviceadv = res[0].users
        console.log(this.serviceadv);
        for(var i = 0; i < this.serviceadv.length; i++){
          console.log(this.serviceadv[i].first_name)
          if(this.serviceadv[i].first_name === this.modalContent.adv_name){
            this.user.service_advisor = this.serviceadv[i].id;
            
            console.log(this.user.service_advisor , "inside if");
          }
        }
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
    this._data.webServiceCall(as5).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        console.log(res);
        if(res[0].updatestatus[0].is_updated === "1"){
          console.log("updated");
          this.visible = true;
          this.showAnimation = '1';
        }
        else{
          console.log("not updated");
          this.visible = true;
          this.showAnimation = '0';
        }
      }

    });
  }

}
