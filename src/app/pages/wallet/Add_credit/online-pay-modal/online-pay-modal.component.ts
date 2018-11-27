import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-online-pay-modal',
  templateUrl: './online-pay-modal.component.html',
  styleUrls: ['./online-pay-modal.component.scss']
})
export class OnlinePaySuccessModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }

  modalHeader: string;
  modalContent:any;


  ngOnInit() {
  }

  

  closeModal() {
    this.activeModal.close();
  }

}
