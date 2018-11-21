import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from '../../../services/user.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { QueueTableService } from '../../../services/queue-table.service';

@Component({
  selector: 'app-online-pay-modal',
  templateUrl: './online-pay-modal.component.html',
  styleUrls: ['./online-pay-modal.component.scss']
})
export class OnlinePayModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
