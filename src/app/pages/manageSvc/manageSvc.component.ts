import { Component, OnInit } from '@angular/core';
import { ServicingService } from '../services/addServicing.service';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { SuccessComponent } from '../user/success/success.component';
import { UpdateSvcComponent } from './modal/UpdateSvc.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manageSvc.component.html',
  styleUrls: ['./manageSvc.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(private titlecasePipe:TitleCasePipe,
              private http: HttpClient, 
              private router: Router, 
              private servicing: ServicingService, 
              private modalService: NgbModal) { }

  //variables
  SearchData: string;
  List: any = [];
  cityList: any = [];
  user: any = {};
  lat: string;
  long: string;
  type_of_job: any = [];
  address2:string;
  svcadmin:string;
  InsuranceUsr:string;
  InsuranceCheck:boolean = false;
  CheckGrpAdmin :boolean;
  GroupAdmin:string;
  SvcId:string;
  key: string = 'name'; 
  reverse: boolean = false;

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.type_of_job = [
      { id: 1, type: 'Service Centre' },
      { id: 2, type: 'Body Shop' },
      { id: 3, type: 'Service Centre / Body Shop' },
      { id: 4, type: 'Showroom' }
    ];
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    this.svcadmin = JSON.parse(sessionStorage.getItem('svcadmin'));
    this.GroupAdmin = JSON.parse(sessionStorage.getItem('groupadmin'));
    if(this.GroupAdmin == "1"){
      this.CheckGrpAdmin = true;
    }
    else{
      this.CheckGrpAdmin = false;
    }
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
    this.getSvcList();
    this.GetCityList();
  }

  //Sort Function
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //show edit Service Centre
  showLargeModal(res: any) {
    const activeModal = this.modalService.open(UpdateSvcComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Edit Service Centre';
    activeModal.componentInstance.modalContent = res;
  }

//Get Service Centre List
  getSvcList() {
    const svcpara = {
        requesttype: 'getsvclist',
        svcid:this.SvcId
      }
    const svcreq = JSON.stringify(svcpara)
    this.servicing.webServiceCall(svcreq).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.List = res[0].svclist;
        }
       });
  }

  //Success Message Modal
  success(res:any) {
    const activeModal = this.modalService.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Message';
    activeModal.componentInstance.modalContent = res;
  }

  //Get City List
  GetCityList() {
    const cityList ={
        requesttype: 'getcitylist',
      }
    const citypara = JSON.stringify(cityList)
    this.servicing.webServiceCall(citypara).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.cityList = res[0].citylist;
          console.log(this.cityList);
        }
      });
  }

  //Submit Form Function
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
    const createsvc = {
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
      svcid:this.SvcId
    }
    const createreq = JSON.stringify(createsvc)
    this.servicing.webServiceCall(createreq).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.getSvcList();
          if(res[0].newsvc[0].created == 1){
            this.success("0");
            f.reset();
          }
          else{
            this.success("1");
          }
          f.reset();
        }
      });
  }
}
