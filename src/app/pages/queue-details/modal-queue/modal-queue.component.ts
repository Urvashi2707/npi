import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { QueueTableService } from '../../services/queue-table.service'
import { ServerService } from '../../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-queue',
  templateUrl: './modal-queue.component.html',
  styleUrls: ['./modal-queue.component.scss']
})
export class ModalQueueComponent implements OnInit {

  games: any[];
  selectedGame: Object = {};
  errorMsg: String = "";
  svcid:string;
  constructor(private activeModal: NgbActiveModal, private _details: QueueTableService, private _data: ServerService, private router: Router) { }

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
    this.games = this._details.cancelReasons;
  }
  cancelBooking(reasonID : any){
    const reqpara3 = {
      requesttype: 'cancelqueue',
      queueid: sessionStorage.getItem('QueueId'),
      reasonid: reasonID,
      svcid:this.svcid
    }
    const as3 = JSON.stringify(reqpara3);
    this._data.webServiceCall(as3).subscribe(res => {
      const check = res.valueOf();
      const cancel = check[0].deletestatus;
      if(cancel[0].is_delete == '1'){
        sessionStorage.removeItem('QueueId');
        this.activeModal.close();
        this.router.navigate(['/pages/cancelled']);
      console.log('deleted')
      }else{
        this.errorMsg = "Some error occured";
        // this.activeModal.close();
      }
    });
    console.log(reasonID);
  }

}
