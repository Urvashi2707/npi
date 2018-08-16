import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import {ServicingService } from '../../services/addServicing.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from '../../user/success/success.component';

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
   cityList:any;

   constructor(private titlecasePipe:TitleCasePipe,
              private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private _data:ServicingService,
              private router:Router){
                this.GetCityList();
              }

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

      //Success Modal
      success(res:any) {
        const activeModal = this.modalService.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalHeader = 'Message';
        activeModal.componentInstance.modalContent = res;
      }

   //update service centre function
   onSubmit(f: NgForm) {
     console.log(this.modalContent);
     if(this.modalContent.type_of_shop === "Service Centre"){
      var TypeOfShop = "1"
     }
     else if(this.modalContent.type_of_shop === "Body Shop"){
      TypeOfShop = "2"
     }
     else if(this.modalContent.type_of_shop === "Service Centre / Body Shop"){
      TypeOfShop = "3"
     }
     else{
      TypeOfShop = "4"
     }
     if(f.value.add2){
       var add2 = f.value.add2;
     }
     else{
        add2 = "0";
     }
     console.log(this.modalContent.cityid);
    const updatesvc = {
      requesttype: 'updatesvcinfo',
      servicecentreid: this.modalContent.id,
      svc_name:this.titlecasePipe.transform(this.modalContent.name),
      address_1: this.modalContent.address1,
      address_2: add2,
      pin_code:this.modalContent.pincode,
      city_id:this.modalContent.cityid,
      capacity:this.modalContent.capacity,
      type_of_job:TypeOfShop,
      svc_lat:this.modalContent.svc_lat,
      svc_long: this.modalContent.svc_long,
      bank_name: this.modalContent.bank_name,
      bank_branch:this.modalContent.bank_address,
      bank_pincode:this.modalContent.bank_pincode,
      bank_account_name:this.modalContent.bank_account_name,
      bank_account_number: this.modalContent.bank_account_number,
      bank_ifsc_code:this.modalContent.bank_ifsc_code
    };
    const svcreq = JSON.stringify(updatesvc);
    this._data.webServiceCall(svcreq).subscribe(data => {
      if(data[0].svcupdated[0].updated === "1"){
        this.message = data;
        this.success("0");
      }
      else{
        this.success("1");
      }
    });
    this.activeModal.close();
  }

  GetCityList() {
    const cityList ={
        requesttype: 'getcitylist',
      }
    const citypara = JSON.stringify(cityList)
    this._data.webServiceCall(citypara).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.cityList = res[0].citylist;
          console.log(this.cityList);
          for(var i = 0 ; i < this.cityList.length;i++){
            if(this.cityList[i].cityname === this.modalContent.city){
              console.log(this.cityList[i].cityname);
              this.modalContent.cityid = this.cityList[i].cityid;
              console.log(this.modalContent.cityid);
            }
          }
        }
      });
  }

}

