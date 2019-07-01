import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success-msg',
  templateUrl: './success-msg.component.html',
  styleUrls: ['./success-msg.component.scss']
})
export class SuccessMsgComponent implements OnInit {

  modalHeader: any;
  modalContent:any;


  closeModal() {
    this.activeModal.close();
  }
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.modalContent.queueId)
  }

}



