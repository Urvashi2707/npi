import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }
  modalHeader: string;
  modalContent:any;
  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }

}
