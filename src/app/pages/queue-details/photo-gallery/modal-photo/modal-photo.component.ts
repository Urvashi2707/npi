import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal-photo.component.html',
  styleUrls: ['./modal-photo.component.scss']
})
export class ModalPhotoComponent implements OnInit {

  photoLink: String = 'http://m.21north.in:7410/images/';
  constructor(private activeModal: NgbActiveModal) { }

  modalContent : string;
  ngOnInit() {
  }
  closeModal() {
    this.activeModal.close();
  }

}
