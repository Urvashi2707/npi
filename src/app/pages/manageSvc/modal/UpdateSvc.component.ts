import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import {ServicingService } from '../../services/addServicing.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl:'./UpdateSvc.component.html',
  styleUrls: ['./UpdateSvc.component.scss']
})
export class UpdateSvcComponent {
  public visible = false;
   private visibleAnimate = false;
   modalHeader: string;
   modalContent:any;
   service_type:string;
   public user:any;
   public message : any;
   public show1 = false;

   constructor(private titlecasePipe:TitleCasePipe,
              private activeModal: NgbActiveModal,
              private _data:ServicingService,
              private router:Router){}

   closeModal() {
    this.activeModal.close();
  }

   public show(): void {
     this.visible = true;
     setTimeout(() => this.visibleAnimate = true, 100);
   }

   public hide(): void {
     this.visibleAnimate = false;
     setTimeout(() => this.visible = false, 300);
   }

   public onContainerClicked(event: MouseEvent): void {
     if ((<HTMLElement>event.target).classList.contains('modal')) {
       this.hide();
     }
   }

   //update service centre function
   onSubmit(f: NgForm) {
    const updatesvc = {
      requesttype: 'updatesvcinfo',
      servicecentreid: this.modalContent.id,
      svc_name:this.titlecasePipe.transform(this.modalContent.svc_name),
      address_1: this.modalContent.address_1,
      address_2: this.modalContent.address_2,
      pin_code:this.modalContent.pin_code,
      svc_lat:this.modalContent.svc_lat,
      svc_long: this.modalContent.svc_long,
      bank_name: this.modalContent.bank_name,
      bank_account_name:this.modalContent.bank_account_name,
      bank_account_number: this.modalContent.bank_account_number,
      bank_ifsc_code:this.modalContent.bank_ifsc_code
    };
    const svcreq = JSON.stringify(updatesvc);
    this._data.webServiceCall(svcreq).subscribe(data => {
      if(data){
        this.message = data
      }
    });
    this.activeModal.close();
  }

}

