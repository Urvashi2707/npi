import { Component, OnInit } from '@angular/core';
import {ServerService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import {ServicingService } from '../services/addServicing.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from '../user/success/success.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {

   usr: any = {};
  public countrycode1: string;
  public svcid:string;
  show1 = false;
  show2 = false;
  show3 = true;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  public designation:any = [];
  maxLen: any;
  constructor(private _data:ServerService,private toasterService: ToasterService,private service:ServicingService,private modalService: NgbModal,) { }

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
      }
      else{
        this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      }
      if(sessionStorage.getItem('loginCountryFlag') === '2') {
        this.maxLen = '8';
        this.countrycode1 = "+65";
        console.log("this.maxLen ", this.maxLen);
      }
      if(sessionStorage.getItem('loginCountryFlag') === '1') {
        this.countrycode1 = "+91";
        this.maxLen = '10';
        console.log("this.maxLen ", this.maxLen);
      }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
       }
    this.getProfileInfo();
   }

  UpdatePassword(){
    if (typeof this.usr.newpass=="string" && typeof this.usr.confipass=="string" && this.usr.newpass === this.usr.confipass){
    const reqpara3 = {
      requesttype: 'updatepassword',
      currentpassword:this.usr.oldpass,
      newpassword:this.usr.confipass
    }
      const as3 = JSON.stringify(reqpara3);
      this._data.webServiceCall(as3).subscribe
    (res => {
      console.log(res[0].passwordupdate);
      var updatePasswordFlag = res[0].passwordupdate;
      if(updatePasswordFlag[0].is_success === "1"){
        console.log("success flag");
        this.success("0");
      }
      else{
        console.log("Unsuccess flag");
        this.success("1");
      }
      });
  }
  else{
    console.log("password not same");
  }
  }

  success(res:any) {
    const activeModal = this.modalService.open(SuccessComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Message';
    activeModal.componentInstance.modalContent = res;
  }

  getProfileInfo(){
    console.log(this.svcid)
    const reqpara3 = {
      requesttype: 'getprofile',
      svcid: this.svcid
    }
      const as3 = JSON.stringify(reqpara3);
      this._data.webServiceCall(as3).subscribe
    (res => {
        this.usr = res[0].profile[0];
      });
  }


  onSubmit(f: NgForm){
    const data = {
      requesttype : 'updateprofile',
      name : f.value.name,
      mobile:f.value.mobile1,
      email:f.value.email
    }
    const ua = JSON.stringify(data);
    this._data.webServiceCall(ua).subscribe(res =>{
      console.log(res[0].profileupdate);
      var updateFlag = res[0].profileupdate;
      if(updateFlag[0].is_success === "1"){
        console.log("success flag");
        this.success("0");
      }
      else{
        console.log("Unsuccess flag");
        this.success("1");
      }
    });
  }

}
