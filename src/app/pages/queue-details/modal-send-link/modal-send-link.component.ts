import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../services/user.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { QueueTableService } from '../../services/queue-table.service';

@Component({
  selector: 'app-modal-send-link',
  templateUrl: './modal-send-link.component.html',
  styleUrls: ['./modal-send-link.component.scss']
})
export class ModalSendLinkComponent implements OnInit {

  public showAnimation: number = 0;
  number_formgroup: FormGroup;
  type: number;
  modalHeader:string;
  constructor(private activeModal: NgbActiveModal, private _data: ServerService, private fb: FormBuilder, private _detailsTable: QueueTableService) {
    this.number_formgroup = this.fb.group({
      mobile_number: [{ value: '', disabled: false}]
    });
    this._detailsTable.clickedID.subscribe(value => {
      if (value == 20) {
        this.type = 1;
      } else {
        this.type = 2;
      }

    })
  }

  ngOnInit() {
    let mobile_number = this.number_formgroup.get('mobile_number');
    mobile_number.setValue('98');
  }
  closeModal(){
    this.activeModal.close();
  }
  onSubmit(f: NgForm) {
    if(sessionStorage.getItem('clickedOn') == '20'){
      this.type = 1;
    }else{
      this.type = 2;
    }
    const reqpara3 = {
      requesttype: 'pic_inv_send',
      mobilenumber: f.value.mobile_number,
      queueid: sessionStorage.getItem('QueueId'),
      type: this.type
    }
    const as3 = JSON.stringify(reqpara3);
    this._data.webServiceCall(as3).subscribe(res => {
      this.showAnimation = 1;
      console.log(res)
    });
  }
}
