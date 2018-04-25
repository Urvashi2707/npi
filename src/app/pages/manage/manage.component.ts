import { Component, OnInit } from '@angular/core';
import { ServicingService } from '../services/addServicing.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { OnlyNumber } from './../number.directive';
import { SuccessComponent } from '../user/success/success.component';
import { Modal2Component } from './modal/modal.component';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})



export class ManageComponent implements OnInit {

  constructor(private titlecasePipe:TitleCasePipe,private http: HttpClient, private router: Router, private servicing: ServicingService, private modalService: NgbModal) { }
  public term: string;
  public List: any = [];
  public cityList: any = [];
  public model = [];
  user: any = {};
  public lat: string;
  public long: string;
  type_of_job: any = [];
  public address2:string;
  public salutation:any;
  svcadmin:string;
  checksvcadmin :boolean;
  checkgrpadmin :boolean;
  groupadmin:string;
  public globalsvcid:string;
  public selectedsvcid:string;
  svcid:string;
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
    this.type_of_job = [
      { id: 1, type: 'Service Centre' },
      { id: 2, type: 'Body Shop' },
      { id: 3, type: 'Service Centre / Body Shop' },
      { id: 4, type: 'Showroom' }
    ];
    this.salutation = [
      { id: 1, type: 'Mr' },
      { id: 2, type: 'Mrs' },
      { id: 3, type: 'Ms' },
    ];
    
    this.svcadmin = JSON.parse(sessionStorage.getItem('svcadmin'));
    console.log(this.svcadmin);
    this.groupadmin = JSON.parse(sessionStorage.getItem('groupadmin'));
    console.log(this.groupadmin);
    if(this.groupadmin == "1"){
      this.checkgrpadmin = true;
    }
    else{
      this.checkgrpadmin = false;
    }
   
    this.getList();
    this.getCity();
  }

  showLargeModal(res: any) {
    const activeModal = this.modalService.open(Modal2Component, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Edit Service Centre';
    activeModal.componentInstance.modalContent = res;
  }



  getList() {
    const reqpara1 =
      {
        requesttype: 'getsvclist',
        svcid:this.svcid
      }
    const as1 = JSON.stringify(reqpara1)
    this.servicing.getBrands(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.List = res[0].svclist;
          console.log(this.List);
        }

      }
      );
  }
  success(res:any) {
    const activeModal = this.modalService.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Message';
    activeModal.componentInstance.modalContent = res;
  }

  getCity() {
    const reqpara1 =
      {
        requesttype: 'getcitylist',
      }
    const as1 = JSON.stringify(reqpara1)
    this.servicing.getBrands(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.cityList = res[0].citylist;
          console.log(this.cityList);
        }

      }
      );
  }
  onSubmit(f: NgForm) {
    if (f.value.latlong) {
      let y = f.value.latlong.split(/[ ,;]+/);
      console.log(y);
      this.lat = y[0];
      this.long = y[1];
    }
    else{
      this.lat = "0";
      this.long = "1";
    }
    if(f.value.add2){
      this.address2 = f.value.add2
    }
    else{
      this.address2 = "0";
    }
    console.log(f.value);
    const reqpara3 = {
      requesttype: 'insert_svc',
      svc_name:this.titlecasePipe.transform( f.value.svcname),
      address_1: f.value.add1,
      address_2: this.address2,
      pin_code: f.value.pincode,
      city_id: f.value.city,
      capacity: f.value.capacity,
      type_of_job: f.value.job,
      svc_lat: this.lat,
      svc_long: this.long,
      bank_name: f.value.bank_name,
      bank_branch: f.value.bank_branch,
      bank_pincode: f.value.bank_pincode,
      bank_account_name: f.value.bank_account_name,
      bank_account_number: f.value.bank_account_number,
      bank_ifsc_code: f.value.bank_ifsc_code,
      svcid:this.svcid
    }
    console.log(reqpara3);
    const as3 = JSON.stringify(reqpara3)
    console.log(as3);
    this.servicing.getBrands(as3).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          console.log(res);
          this.getList();
          if(res[0].newsvc[0].created == 1){
            console.log('created');
            this.success("0");
            f.reset();
          }
          else{
            console.log('not created');
            this.success("1");
          }
          f.reset();
        }

      }
      );
  }
}
