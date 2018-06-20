import { Component, OnInit } from '@angular/core';
import {ChauffeurService } from '../../services/chauffeur.service';
import { TitleCasePipe } from '@angular/common';
import {HttpErrorResponse}from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingDetails } from '../modal/BookingDetails/BookingDetails.component';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import { AddEmployee } from '../modal/AddEmployee/AddEmployee.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {

  public selectedBrand: any = [];
  public selectedModel: any = [];
  private Slot: any=[];
  public slot:any = [];
  svcid:string;
  slotcheck = true;
  addressPickup:any;
  addressDropoff:any;
  dontShowModel = false;
  dontShowVariant = false;
  public slothour:string;
  public selectedVariant: any = [];
  public selectedCoordinator: any = [];
  public service_type:any =[];
  private Variant: any=[];
  private Models: any=[];
  model: NgbDateStruct;
  cityid:number;
  CityList:any;
  disableNext = false;
  public registrationNumber:string;
  public mobile1:string;
  public serviceType:string;
  customer:any = [];
  public address :any=[];
  public carinfo:any=[];
  show3  = true;
  show  = false;
  addresstype_pu:string;
  cust_details:any={};
  public pikup_long: string;
  public dropoff_lat: string;
  public dropoff_long: string;
  public pickup_add: string;
  serviceAdv:string;
  sameasvalue:boolean;
  private creName: string[];
  public pickup_drop:number;
  public yourBoolean : string = 'onSpot' ; 
  user:any = {};
  queuetime:string;
  public message:any=[];
  private brands: any=[];
  showAddress = false;
  showAddressDropDown = false;
  pickupdoor:string;
  pickupstreet:string;
  pickuparea:string;
  pickuplandmark:string;
  pickuppincode:string;
  dropofffdoor:string;
  dropoffstreet:string;
  dropoffarea:string;
  pikup_lat:string;
  dropofflandmark:string;
  addresstype_do:string;
  addressdoprevious:string;
  addresspuprevious:string;
  dropoffpincode:string;
  public slot_time:string;
  public mobile2:string;
  public disabled=false;
  public salutation:any;
  public cusEmail:string;
  public cusName:string;
  public notes:string;
  public amt:string;
  public saleexce:string;
  public SaleExceutive:any = [];
  public Coordinator:any = [];
  public amb:boolean = true;
  public Sid:string;
  dateString: string;
  salutation2:string;
  isNewestOnTop = true;
  isHideOnClick = true;
  today: number = Date.now();
  isDuplicatesPrevented = false;
  public globalsvcid:string;
  public selectedsvcid:string;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  showtime = false;
  public startDate;
  public minDate;
  public maxDate;
  public complaint_id:any =[];
  valuedate = new Date();
  countrycode1:string;
  
  constructor(private datePipe:DatePipe,private titlecasePipe:TitleCasePipe,private toasterService: ToasterService,private _data : ChauffeurService,private router: Router,private ngbDateParserFormatter: NgbDateParserFormatter,private modalService: NgbModal) { }

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.service_type  = [
      { id: 1, type: 'Stock Yard' },
      { id: 2, type: 'Test Drive' },
      { id: 3, type: 'Internal Movement' },
      { id: 4, type: 'Home Delivery' },
      { id: 15, type: 'Custody' }
    ];
    this.salutation = [
      { id: 1, type: 'Mr' },
      { id: 2, type: 'Mrs' },
      { id: 3, type: 'Ms' },
    ];
      this.user.salutation = 'Mr';
      this.countrycode1 = "+91";
      this.getBrands();
      this.getCoordinator();
      this.getSaleExceutive();
      // this.getCityList();
      const now = new Date();
      // this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
      this.valuedate = new Date();
      this.startDate = this.model;
      this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
      this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
      this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
  }

  showModal(Id:number) {
    const activeModal = this.modalService.open(AddEmployee, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Employee';
    activeModal.componentInstance.modalContent = Id;
  }
  Addsales() {
    this.router.navigate(['pages/user']);
  }

  getBrands(){
    const reqpara1 = {
           requesttype: 'getallbrands',
           svcid:this.svcid
         }
      const as1 = JSON.stringify(reqpara1)
      this._data.webServiceCall(as1).subscribe
       (res => 
         {
          if(res[0].login === 0){
            sessionStorage.removeItem('currentUser');
            this.router.navigate(['/auth/login']);
          }
          else{
            this.brands=res[0].allbrands;
          }
        });
   }

   data(){
    this.show = true;
    this.disableNext = true;
    var defaultBrand = JSON.parse(sessionStorage.getItem('brandid'));
    console.log(defaultBrand);
     for(let i = 0; i < this.brands.length;i ++){
               if(this.brands[i].brand_id == defaultBrand){
                 this.selectedBrand = this.brands[i].brand_id;
                 console.log(this.selectedBrand);
               }
             }
             this.getModelds(this.selectedBrand);
   }

   private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  buildArr(theArr: any[]){
   var arrOfarr = [];
   for(var i = 0; i < theArr.length ; i+=4) {
       var row = [];
       for(var x = 0; x < 6; x++) {
         var value = theArr[i + x];
           if (!value) {
               break;
           }
           row.push(value);
       }
       arrOfarr.push(row);
   }
    return arrOfarr;
  }

   showLargeModal(res:any) {
    const activeModal = this.modalService.open(BookingDetails, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Booking Details';
    activeModal.componentInstance.modalContent = res;
  }

  check(value: string,time:string) {
    this.slot_time=time;
    this.slothour = value;
    this.slotcheck = false;
 }

   onSelectBrand(brandsId) {
     console.log(brandsId);
    this.selectedBrand = null;
    for (let i = 0; i < this.brands.length; i++) {
     if (this.brands[i].brand_id == brandsId) {
        this.selectedBrand = this.brands[i].brand_id;
      }
    }
    this.getModelds(this.selectedBrand);
  }

 onSelectModel(modelId) {
    this.selectedModel = null;
    for (let i = 0; i < this.Models.length; i++) {
      if (this.Models[i].model_id == modelId) {
        this.selectedModel = this.Models[i];
      }
    }
    this.getVariants(this.selectedModel.model_id);
  }

 onSelectVariant(VariantId) {
   this.selectedVariant = null;
   for (let i = 0; i < this.Models.length; i++) {
     if (this.Variant[i].variant_id == VariantId) {
       this.selectedVariant = this.Variant[i];
     }
   }
  }

  getVariants(VariantId:number){
       const reqpara3 = {
          requesttype: 'getvariants',
          brandid : VariantId
        }
    const as3 = JSON.stringify(reqpara3)
    this._data.webServiceCall(as3).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        this.Variant=res[0].models,
        console.log(this.Variant);
        if(this.Variant.length === 0){
          this.dontShowVariant = true;
        }
        else{
          this.dontShowVariant = false;
        }
      }
    });
  }

  onCoordinator(Id){
    this.selectedCoordinator = null;
     for (let i = 0; i < this.Coordinator.length; i++) {
      if (this.Coordinator[i].id === Id) {
        this.selectedCoordinator = this.Coordinator[i];
        }
    }
  }


  getSaleExceutive(){
     const reqpara8={
      requesttype:'getspecificsvcusers',
      usertype:7,
      svcid:this.svcid
    }
    const as8 = JSON.stringify(reqpara8)
    this._data.webServiceCall(as8).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        this.SaleExceutive = res[0].users
        console.log(this.SaleExceutive);
       }
    });
  }


  getCoordinator(){
    const reqpara7={
      requesttype:'getspecificsvcusers',
      usertype:13,
      svcid:this.svcid
    }
    const as4 = JSON.stringify(reqpara7)
    this._data.webServiceCall(as4).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        this.Coordinator = res[0].users
            }
    });
  }

    getModelds(ModelId:number){
      this.dontShowModel = false;
      this.dontShowVariant = false;
      const reqpara2 = {
          requesttype: 'getmodels',
          brandid : ModelId
          }
      const as2 = JSON.stringify(reqpara2)
      this._data.webServiceCall(as2).subscribe(res => {
        if(res[0].login === 0){
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else{
            this.Models = res[0].models;
            this.getVariants(this.Models[0].model_id)
            console.log(this.Models);
            console.log('model length' + this.Models.length);
            if(this.Models.length === 0){
              this.dontShowModel = true;
            }
            else{
              this.dontShowModel = false;
            }
            if(this.Models.length === 1){
              console.log("model length is 1");
              var model_id = this.Models[0].model_id;
              this.getVariants(model_id);
            }
            else{
              console.log("model length is more than 1");
            }
        }
       });
      }

      getCityList(){
        console.log(this.serviceType);
        if(this.serviceType == '15'){
          const reqpara23 = {
            requesttype:"getcitylist",
            }
          const as23 = JSON.stringify(reqpara23)
          this._data.webServiceCall(as23).subscribe(res => {
            if(res[0].login === 0){
              sessionStorage.removeItem('currentUser');
              this.router.navigate(['/auth/login']);
            }
            else{
              console.log(res);
              this.CityList = res[0].citylist;
              console.log(this.CityList);
            }
           });
        }
       
        }

      sameas(value){
        console.log(value);
        this.sameasvalue = value;
        if (value == true) {
          if (this.user.pickupdoor) {
            this.user.dropofffdoor = this.user.pickupdoor;
            console.log(this.user.dropofffdoor);
            if (this.user.pickupstreet) {
              this.user.dropoffstreet = this.user.pickupstreet;
              console.log(this.user.dropoffstreet);
            }
            if(this.user.pickuparea){
              this.user.dropoffarea = this.user.pickuparea;
              console.log(this.user.dropoffarea);
            }
            if(this.user.pickuplandmark){
              this.user.dropofflandmark = this.user.pickuplandmark;
              console.log(this.user.dropofflandmark);
            }
            if(this.user.pickuppincode){
              this.user.dropoffpincode = this.user.pickuppincode;
              console.log(this.user.pickuppincode);
            }
            if(this.user.picklatlong){
              this.user.droplatlong = this.user.picklatlong;
              console.log(this.user.droplatlong);
            }
            if(this.user.address_typepu){
              this.user.address_typedu = this.user.address_typepu;
              console.log(this.user.address_typedu);
            }
          }
        }
        else {
          this.user.dropofffdoor = null;
          this.user.dropoffstreet = null;
          this.user.dropoffarea = null;
          this.user.dropoffpincode = null;
          this.user.dropofflatlong = null;
          this.user.dropofflandmark  = null;
        }
    }


      modelChanged(event){
        console.log(event);
      }


      onSelectDate(date: NgbDateStruct){
        if (date != null) {
                this.model = date;
                this.dateString = this.ngbDateParserFormatter.format(date);
            }
            this.show3 = true;
            if(this.amb == true){}
            this.getSlot(this.dateString);
          }

      some(value){
        this.amb = value;
      }

      getSlot(Date: string) {
        this.showtime = true;
        if (this.yourBoolean === 'servicing') {
          this.pickup_drop = 0;
        }
        else {
          this.pickup_drop = 1;
        }
        if (Date) {
          const reqpara5 = {
            requesttype: 'getslots',
            reqdate: Date,
            pickup_drop: this.pickup_drop,
            svcid: this.svcid
          }
          const as5 = JSON.stringify(reqpara5)
          this._data.webServiceCall(as5).subscribe(res => {
            if (res[0].login === 0) {
              sessionStorage.removeItem('currentUser');
              this.router.navigate(['/auth/login']);
            }
            else {
              if (res[0].slots.length == 0) {
                this.showToast('default', 'No Slot', 'Sorry !! No Slot Unavailable ');
              }
              else {
                this.slot = res[0].slots;
              }
             }
          });
        }
    }

    getinfowithMobile(){
      console.log(this.cust_details.mobile)
      const reqpara112 =
      {
        requesttype:'getcustinfo_mobilev2',
        mobilenumber:this.cust_details.mobile,
        svcidvar:this.svcid,
        vehnumber:this.registrationNumber
      }
      const as112 = JSON.stringify(reqpara112);
      this._data.webServiceCall(as112).subscribe(data => {
        if (data[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.customer = data;
          if (this.customer[1].custinfo[0].no_records) {
            this.cust_details.mobile = this.user.mobile1
          }
          else {
            this.cust_details = this.customer[1].custinfo[0],
            this.address = this.customer[2].addresses;
            if(this.address[0].hasOwnProperty('no_records')){
              this.showAddress = true;
            }
            else{
                this.showAddressDropDown = true;
                this.addressPickup = this.address[0];
                this.user.pickupdoor = this.addressPickup.doornumber;
                this.user.pickupstreet = this.addressPickup.street;
                this.user.pickuparea = this.addressPickup.area;
                this.user.pickuplandmark = this.addressPickup.landmark;
                this.user.pickuppincode = this.addressPickup.pincode;
                this.user.picklatlong = this.addressPickup.latitude + ',' +this.addressPickup.longitude;
                this.user.address_typepu = this.addressPickup.address_id;
                this.addressDropoff = this.address[1];
                  if(this.addressDropoff != undefined){
                    this.user.dropofffdoor = this.addressDropoff.doornumber;
                    this.user.dropoffstreet = this.addressDropoff.street;
                    this.user.dropoffarea = this.addressDropoff.area;
                    this.user.dropofflandmark = this.addressDropoff.landmark;
                    this.user.dropoffpincode = this.addressDropoff.pincode;
                    this.user.droplatlong = this.addressDropoff.latitude + ',' +this.addressDropoff.longitude;
                    this.user.address_typedu = this.addressDropoff.address_id;
                  }
                  else{
  
                    this.user.dropofffdoor = null ;
                    this.user.dropoffstreet = null;
                    this.user.dropoffarea = null;
                    this.user.dropofflandmark = null;
                    this.user.dropoffpincode = null;
                    this.user.droplatlong = null;
                    this.user.address_typedu = null;
                  }
              console.log(this.addressDropoff);
            }
            this.carinfo = this.customer[4].carinfo[0]
            this.selectedModel = this.carinfo.veh_model_id;
            this.selectedVariant = this.carinfo.veh_submodel_id;
            this.getVariants(this.selectedModel);
            for (let i = 0; i < this.Models.length; i++) {
              if (this.Models[i].id === this.selectedModel) {
                this.selectedModel = this.Models[i].id ;
              }
            }
          }
        }},
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          }
          else {
            console.log("Server-side error occured.");
          }
        });
    }

    changeEditpickupdoor(value:any){
      if (this.sameasvalue == true){
        this.user.dropofffdoor = value;
      }
    }
  
    changeEditupstreet(value:any){
      if (this.sameasvalue == true){
        this.user.dropoffstreet = value;
      }
    }
  
    changeEditpickuparea(value:any){
      if (this.sameasvalue == true){
      this.user.dropoffarea = value;
      }
    }
  
    changeEditpickuplandmark(value:any){
      if (this.sameasvalue == true){
        this.user.dropofflandmark = value;
      }
    }
  
    changeEditpickuppincode(value:any){
      if (this.sameasvalue == true){
        this.user.dropoffpincode = value;
      }
    }
  
    changeEditpickuplatlong(value:any){
      if (this.sameasvalue == true){
       this.user.droplatlong = value;
      }
    }

 

  customerCheck(){
    const reqpara = {
        requesttype: 'getcustinfo_mobile',
        mobilenumber: this.cust_details.mobile,
        svcid:this.svcid
      }
      const as = JSON.stringify(reqpara)
      this._data.webServiceCall(as).subscribe(data => {
        if(data[0].login === 0){
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else{
          if(data[1].custinfo[0].hasOwnProperty('no_records')){
          }
          else{
            this.customer = data,
            this.cust_details = this.customer[1].custinfo[0],
            this.address = this.customer[2].addresses[0]
            this.user.pickloc = this.address.paddy,
            this.user.picklatlong = this.address.plat + ',' + this.address.plong
            this.user.droploc = this.address.daddy,
            this.user.droplatlong = this.address.dlat + ',' + this.address.dlat,
            this.carinfo = this.customer[3].carinfo[0];
          }
        }
      },
       (err: HttpErrorResponse) => {
         if (err.error instanceof Error) {
             console.log("Client-side error occured.");
           }
         else {
           console.log("Server-side error occured.");
           }
       });
      this.show = true;
  }

  onSubmit(f: NgForm) {
    this.disabled =  true;
    console.log(f.value.city);
    console.log(this.serviceType);
    console.log(f.value.servicetype);
    if(f.value.city){
      this.cityid = f.value.city;
    }
    else{
      this.cityid = 0
    }
    if(this.user.time){
      this.slot_time = this.user.time + ':00'
    }
    this.registrationNumber = f.value.num.toUpperCase();
    if(f.value.pickloc){
      this.pickup_add = f.value.pickloc;
      if(f.value.picklatlong){
        let y = f.value.picklatlong.split(/[ ,;]+/);
        this.pikup_lat = y[0];
        this.pikup_long = y[1];
      }
      else {
        this.pikup_lat = "0";
        this.pikup_long = "0";
      }
    }
    else{
      this.pickup_add = "0";
    }
    if(this.serviceType == '1'){
      this.pickup_drop = 6;
    }
    else if (this.serviceType == '2'){
      this.pickup_drop = 7;
    }
    else if (this.serviceType == '3'){
      this.pickup_drop = 4;
    }
    else if (this.serviceType == '4'){
      this.pickup_drop = 5;
    }
    else if(this.serviceType == '15'){
      this.pickup_drop = 15;
    }
    if(this.pickup_drop == 15 || this.pickup_drop == 6){
      this.pickupdoor = f.value.pickupdoor;
      this.pickupstreet = f.value.pickupstreet;
      this.pickuparea = f.value.pickuparea;
      this.pickuplandmark = f.value.pickuplandmark;
      this.pickuppincode = f.value.pickuppincode;
      this.dropofffdoor = f.value.pickupdoor;
      this.dropoffstreet = f.value.pickupstreet;
      this.dropoffarea = f.value.pickuparea;
      this.dropofflandmark = f.value.pickuplandmark;
      this.dropoffpincode = f.value.pickuppincode;
      this.addressdoprevious = "0";
      this.addresspuprevious = "0";
      this.addresstype_do="0";
      this.addresstype_pu="0";
      if(f.value.picklatlong){
        let x = f.value.picklatlong.split(/[ ,;]+/);
        this.pikup_lat = x[0];
        this.pikup_long = x[1];
        this.dropoff_lat = x[0];
        this.dropoff_long = x[1];
      }
    }
    else if (this.pickup_drop == 4){
      this.pickupdoor = f.value.pickupdoor;
      this.pickupstreet = f.value.pickupstreet;
      this.pickuparea = f.value.pickuparea;
      this.pickuplandmark = f.value.pickuplandmark;
      this.pickuppincode = f.value.pickuppincode;
      this.dropofffdoor = f.value.dropofffdoor;
      this.dropoffstreet = f.value.dropoffstreet;
      this.dropoffarea = f.value.dropoffarea;
      this.dropofflandmark = f.value.dropofflandmark;
      this.dropoffpincode = f.value.dropoffpincode;
      this.addressdoprevious = "0";
      this.addresspuprevious = "0";
      this.addresstype_do="0";
      this.addresstype_pu="0";
      if(f.value.picklatlong){
        let x = f.value.picklatlong.split(/[ ,;]+/);
        this.pikup_lat = x[0];
        this.pikup_long = x[1];
      }
      if(f.value.droplatlong){
        let y = f.value.picklatlong.split(/[ ,;]+/);
        this.dropoff_lat = y[0];
        this.dropoff_long = y[1];
      }
    }
    else if (this.pickup_drop == 5 || this.pickup_drop == 7){
      this.pickupdoor = f.value.pickupdoor;
      this.pickupstreet = f.value.pickupstreet;
      this.pickuparea = f.value.pickuparea;
      this.pickuplandmark = f.value.pickuplandmark;
      this.pickuppincode = f.value.pickuppincode;
      this.dropofffdoor = f.value.dropofffdoor;
      this.dropoffstreet = f.value.dropoffstreet;
      this.dropoffarea = f.value.dropoffarea;
      this.dropofflandmark = f.value.dropofflandmark;
      this.dropoffpincode = f.value.dropoffpincode;
      this.addressdoprevious = "0";
      this.addresspuprevious = "0";
      this.addresstype_do="0";
      this.addresstype_pu="0";
      if(f.value.picklatlong){
        let x = f.value.picklatlong.split(/[ ,;]+/);
        this.pikup_lat = x[0];
        this.pikup_long = x[1];
      }
      if(f.value.droplatlong){
        let y = f.value.picklatlong.split(/[ ,;]+/);
        this.dropoff_lat = y[0];
        this.dropoff_long = y[1];
      }
    }
   
  if(f.value.mobile2)
  {
      this.mobile2 = f.value.mobile2;
    }
  else 
  {
    this.mobile2 = "0";
  
  }
  if(f.value.Cus_name)
  {
      this.cusName = f.value.Cus_name;
      this.salutation2 = f.value.salutation1
      console.log(this.cusName);
    }
  else 
  {
    this.cusName = "0";
    this.salutation2 = "0";
    
  }
  if(f.value.mobile1)
  {
      this.mobile1 = f.value.mobile1;
      console.log(this.mobile1);
    }
  else 
  {
    this.mobile1 = "0";
   
  }

  if(f.value.email)
  {
      this.cusEmail = f.value.email;
      console.log(this.cusEmail);
    }
  else 
  {
    this.cusEmail = "0";
    console.log("0");
  }

  if(f.value.notes)
  {
     this.notes = f.value.notes;
  }
  else
  {
    this.notes = "-";
  }

  if(f.value.amt)
  {
     this.amt = f.value.amt;
  }
  else
  {
    this.amt = "0";
  }
  if(this.slot_time)
  {
    
  }
  else {
    this.slot_time = "0";
  } 
  if(f.value.salesExe){
      this.saleexce= f.value.salesExe
  }
  else{
    this.saleexce = "0"
  }

  if(f.value.coordinator){
    this.serviceAdv = f.value.coordinator;
  }
  else{
    this.serviceAdv = "0";
  }

    if(this.dateString){
      this.queuetime = this.dateString + ' ' +this.slot_time
    }
    else{
      this.queuetime =  this.datePipe.transform(this.today,"y-MM-dd h:mm:ss");
    }
    if(this.slot_time != "0" || this.pickup_drop == 15 ){
  const reqpara6 = {
    requesttype: "createbookingv3",
    vehnumber: this.registrationNumber,
    city: this.cityid,
    vehbrand:this.selectedBrand,
    carmodelid: f.value.model,
    carsubmodelid: f.value.variant,
    customername: this.salutation2 +'.'+this.titlecasePipe.transform(this.cusName),
    customermobile1: this.mobile1,
    customermobile2: this.mobile2,
    customeremail: this.cusEmail,
    queuetime: this.queuetime,
    addresspuprevious:this.addresspuprevious,
    doornumberpu:this.pickupdoor,
    streetpu:this.pickupstreet,
    areapu:this.pickuparea,
    landmarkpu:this.pickuplandmark,
    pincodepu:this.pickuppincode,
    addresstypepu:this.addresstype_pu,
    pickuplat:this.pikup_lat,
    pickuplong:this.pikup_long,
    addressdoprevious:this.addressdoprevious,
    doornumberdo:this.dropofffdoor,
    streetdo:this.dropoffstreet,
    areado:this.dropoffarea,
    landmarkdo:this.dropofflandmark,
    pincodedo:this.dropoffpincode,
    addresstypedo:this.addresstype_do,
    droplat:this.dropoff_lat,
    droplong:this.dropoff_long,
    servicetype: this.pickup_drop,
    advisorid: this.serviceAdv,
    creid: this.saleexce,
    assignambassador:this.amb,
    selectedsvcid:this.svcid,
    cfeeclient:this.amt,
    notes:this.notes,
    isconfirmed:"0",
    eavalidcode:"0",
    complaint:["0"]
  
  };

 const ua = JSON.stringify(reqpara6);
 console.log(ua);
  this._data.webServiceCall(ua).subscribe(data => { 
    if(data[0].login === 0){
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['/auth/login']);
    }
    else{
    
        this.message = data[0].queue,
        this.disabled=false;
        this.showLargeModal(this.message[0]);
        console.log(this.message[0].queue_id);
        this.slot_time = "0";
        f.reset();
        this.show = false;
        this.show3 = false;
        this.disabled =  true;
        this.showtime = false;
        this.countrycode1 = "+91";
        this.dateString = null;
        this.yourBoolean = 'servicing';
        this.user.salutation = 'Mr';
        this.dateString = "";
        this.getCoordinator();
        this.disableNext = false;
    }
 
  },
  (err: HttpErrorResponse) =>{
  if (err.error instanceof Error) {
    console.log("Client-side error occured.");
  }
else {
  console.log("Server-side error occured.");
  }
});
    }else{
      this.showToast('alert', 'Message', 'Please select Slot and date');
    }
};

}
