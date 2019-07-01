import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { SuccessMsgComponent } from '../success-msg/success-msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { ServicingService } from '../../services/addServicing.service';
import {environment} from '../../../../environments/environment'

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent implements OnInit {

  vehicle_details:any = {};
  cust_details: any = {};
  amt_details:any = {};
  service_details:any = {};
  svc_id:string;
  allbrand_list:any = [];
  insuranceFlag:boolean;
  models_list:any = [];
  variant_list:any = [];
  filename:any;
  myFiles: string [] = [];
  BtnDisable:boolean;
  user_list:any = [];
  file_error_msg:boolean = false;
  salutation:any = [];
  user_id:string;
  countrycode1:string;
  mobile_length:boolean =false;
  upload_file = environment.upload_file;

  constructor(private router: Router,
    private http:HttpClient,
    private modalService: NgbModal,
    private ServicingService: ServicingService,) { }

  ngOnInit() {
    this.countrycode1 = "+91";
    this.user_id = JSON.parse(sessionStorage.getItem("userId"));
    if(JSON.parse(sessionStorage.getItem('insurance')) == "1"){
      this.insuranceFlag = true;
    }
    else{
      this.insuranceFlag = false;
    }
    if(sessionStorage.getItem('selectedsvc')){
      this.svc_id = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svc_id = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.getAllBrands();
    this.salutation = [
      { id: 1, type: 'Mr' },
      { id: 2, type: 'Mrs' },
      { id: 3, type: 'Ms' },
    ];
    this.cust_details.salutation = 'Mr';
    this.getUserList();
  }

  public httpOptions = {
    withCredentials: true
  };

onSelectBrand(brandId) {
    for (let i = 0; i < this.allbrand_list.length; i++) {
     if (this.allbrand_list[i].brand_id == brandId) {
        this.vehicle_details.brand = this.allbrand_list[i].brand_id;
      }
    }
    // console.log( this.vehicle_details.brand);
    this.getModels(this.vehicle_details.brand);
  }

  checkMobile(ev){
    this.BtnDisable = false;
    this.file_error_msg = false;
    console.log(ev.target.value);
    if(ev.target.value.length == 10){
      // this.mobile_length = true;
    }
  }



  onSelectModel(model_id){
    for (let i = 0; i < this.models_list.length; i++) {
      if (this.models_list[i].model_id == model_id) {
        this.vehicle_details.model = this.models_list[i];
      }
    }
    this.getVariants(this.vehicle_details.model);
  }

  getVariants(variant_id){
    const reqpara3 = {
      requesttype: 'getvariants',
      brandid: variant_id
    }
    const as3 = JSON.stringify(reqpara3)
    this.ServicingService.webServiceCall(as3).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.variant_list = res[0].models
      }
    });
  }

  getModels(brand_id){
    const reqpara2 = {
      requesttype: 'getmodels',
      brandid: brand_id
    }
    const as2 = JSON.stringify(reqpara2)
    this.ServicingService.webServiceCall(as2).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.models_list = res[0].models;
        if(this.models_list.length === 1){
          var model_id = this.models_list[0].model_id;
          this.getVariants(model_id);
        }
     }
    });
  }

  getFileDetails (e) {
    this.BtnDisable = false;
    // console.log(e);
    this.filename = e.target.files[0].name;
    for (var i = 0; i < e.target.files.length; i++) { 
      this.myFiles.push(e.target.files[i]);
    }
    if(this.myFiles.length > 3){
      this.BtnDisable = true;
    }
    else {
      this.BtnDisable=false;
    }
  }

  removefile(file) {
    const index: number = this.myFiles.indexOf(file);
    if (index !== -1) {
        this.myFiles.splice(index, 1);
    } 
    if(this.myFiles.length > 0 ){
      this.BtnDisable = false;
    }
    else{
      this.BtnDisable = true;
    }
  }

  getAllBrands() {
    const reqpara1 ={
        requesttype: 'getallbrands',
        svcid:this.svc_id
      }
    const as1 = JSON.stringify(reqpara1)
    this.ServicingService.webServiceCall(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.allbrand_list = res[0].allbrands;
        }
      });
  }

  getUserList(){
    this.user_list = [];
    // this.userDisable = [];
    const List1 = {
      requesttype: 'getuserlist',
      servicecentreid:this.svc_id,
    }
      const ListReq1 = JSON.stringify(List1);
         this.ServicingService.webServiceCall(ListReq1).subscribe
    (res =>  {
        for(var i = 0; i < res[0].userlist.length; i++ ){
          if(res[0].userlist[i].isenabled == '1'){
          this.user_list.push(res[0].userlist[i])
        }
      else{
          // this.userDisable.push(res[0].userlist[i]);
        }
      }
    });
  }

  onSubmit(f: NgForm){
    console.log(f.value.mobile1);
    var mobile = f.value.mobile1.toString().length
    if(mobile < 10){
      this.BtnDisable = true;
      this.mobile_length = true;
      this.file_error_msg = true;
    }
    else{
      this.BtnDisable = false;
      const frmData: FormData = new FormData();
      if(f.value.inv === undefined){
        var inv = "0"
      } 
      else{
          inv = f.value.inv;
      }
    
        frmData.append('requesttype', 'createbooking_paymentgw');
        frmData.append('vehnumber', f.value.num);
        frmData.append('vehbrand', f.value.brand);
        frmData.append('carmodelid', f.value.model);
        frmData.append('carsubmodelid', f.value.variant);
        frmData.append('customername', f.value.salutation1 +'.'+ f.value.Cus_name);
        frmData.append('customermobile1',f.value.mobile1);
        frmData.append('customeremail',f.value.email);
        frmData.append('advisorid',f.value.ServiceAdvisor);
        frmData.append('creid', this.user_id);
        frmData.append('svcid',"1183");
        frmData.append('amount',f.value.amt);
        frmData.append('description',f.value.description);
        frmData.append('invoiceid',f.value.inv);
        for ( var i = 0; i < this.myFiles.length; i++)  { 
          frmData.append('file' + i, this.myFiles[i]);
        }
        const us = JSON.stringify(frmData);
        // console.log(frmData)
        this.http.post(this.upload_file, frmData,this.httpOptions).subscribe(
          data => {
            console.log("coming here");
            if(data[0].queue[0].queue_exists === "0"){
              console.log("queue 0")
              this.success(data[0].queue[0].queue_id,"0");
              this.myFiles = [];
              f.reset();
            }
            else{
              console.log("queue 1")
              this.success(data[0].queue[0].queue_id,"1");
              this.myFiles = [];
              f.reset();
            }
          },
          (err: HttpErrorResponse) => {
            console.log (err.message);  
          });
    }
 }

  success(queueId,res:any) {
    var dataTopass = {queueId: queueId,res:res}
    const activeModal = this.modalService.open(SuccessMsgComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Message';
    activeModal.componentInstance.modalContent = dataTopass;
  }

}
