import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import {ServicingService } from '../../../services/addServicing.service';
import {NgbModal,NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.scss']
})
export class Modal3Component implements OnInit {

  constructor(private titlecasePipe:TitleCasePipe,private activeModal: NgbActiveModal,private _data:ServicingService) {
    // this.modalContent.permission="Coordinator";
   }
  modalHeader: string;
  modalContent:any;
  modalId:number;
  desingnation:string;
  public svcid:string;
  public salutation:any;
  ngOnInit() {
    console.log(this. modalContent);
    if(sessionStorage.getItem('selectedsvc')){
      // console.log(sessionStorage.getItem('selectedsvc'));
      this.svcid = sessionStorage.getItem('selectedsvc');
      // console.log(this.svcid);
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      // console.log(this.svcid);
    }
    
    this.salutation = [
      { id: 1, type: 'Mr' },
      { id: 2, type: 'Mrs' },
      { id: 3, type: 'Ms' },
    ];
    // this.modalContent.salutation = this.salutation[0].type;
    if(this. modalContent == 1){
      this.desingnation="Cre";
    }
    else if (this. modalContent == 2){
      this.desingnation="Service Advisor";
    }
    else if (this. modalContent == 3){
      this.desingnation="Coordinator";
    }
    else {
      this.desingnation="Sales Executive";
    }
    
  }
  closeModal() {
    this.activeModal.close();
  }
  onSubmit(f: NgForm) {
    console.log(f.value.id);
    if(this.modalContent == 4 ){
      console.log(this.modalContent);
      var reqpara3 = {
        requesttype:'createuser',
        servicecentreid:JSON.parse(this.svcid),
        usertype:7,
        username:f.value.salutation1+'.'+f.value.name,
        mobilenumber:f.value.mobile1,
        email:f.value.email
      }
    }
    else if (this.modalContent == 3 ){
      console.log(this.modalContent);
      var reqpara3 = {
        requesttype:'createuser',
        servicecentreid:JSON.parse(this.svcid),
        usertype:13,
        username:f.value.salutation1+'.'+f.value.name,
        mobilenumber:f.value.mobile1,
        email:f.value.email
      }
    }
    else if (this.modalContent == 2 ){
      console.log(this.modalContent);
      var reqpara3 = {
        requesttype:'createuser',
        servicecentreid:JSON.parse(this.svcid),
        usertype:3,
        username:f.value.salutation1+'.'+f.value.name,
        mobilenumber:f.value.mobile1,
        email:f.value.email
      }
    }
    else {
      console.log(this.modalContent);
      var reqpara3 = {
        requesttype:'createuser',
        servicecentreid:JSON.parse(this.svcid),
        usertype:2,
        username:f.value.salutation1+'.'+f.value.name,
        mobilenumber:f.value.mobile1,
        email:f.value.email
      }
    }

  
    const as3 = JSON.stringify(reqpara3);
    this._data.getBrands(as3).subscribe(res =>{
      console.log(res);
      f.reset();
      this.activeModal.close();
    });
       }
}
