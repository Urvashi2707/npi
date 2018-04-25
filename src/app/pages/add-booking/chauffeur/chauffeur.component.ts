import { Component, OnInit } from '@angular/core';
import {ChauffeurService } from '../../services/chauffeur.service';
import { TitleCasePipe } from '@angular/common';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpRequest} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal1Component } from '../modal/modal1/modal1.component';
import {Router} from '@angular/router';
import { NgClass } from '@angular/common';
import { Modal3Component } from '../modal/modal2/modal2.component';
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
public slothour:string;
  public selectedVariant: any = [];
  public selectedCoordinator: any = [];
  public service_type:any =[];
  private Variant: any=[];
  private TowingTruck: string[];
  private Models: any=[];
  model: NgbDateStruct;
  public registrationNumber:string;
  public mobile1:string;
  public serviceType:string;
  customer:any = [];
  public address :any=[];
  public carinfo:any=[];
  show3  = true;
  show  = false;
  cust_details:any={};
  
  private creName: string[];
  public pickup_drop:number;
  public yourBoolean : string = 'onSpot' ; 
  user:any = {};
  public message:any=[];
  private brands: any=[];
  public pikup_lat:string;
  public pikup_long:string;
  public dropoff_lat:string;
  public dropoff_long:string;
  public pickup_add:string;
  public dropadd:string;
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
  isDuplicatesPrevented = false;
  public globalsvcid:string;
  public selectedsvcid:string;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  public startDate;
  public minDate;
  public maxDate;
  public complaint_id:any =[];
  // public svcid:string;
  countrycode1:string;
  
  constructor(private titlecasePipe:TitleCasePipe,private toasterService: ToasterService,private _data : ChauffeurService,private router: Router,private ngbDateParserFormatter: NgbDateParserFormatter,private modalService: NgbModal) { }

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
    this.service_type  = [
      { id: 1, type: 'Stock Yard' },
      { id: 2, type: 'Test Drive' },
      { id: 3, type: 'Internal Movement' },
      { id: 4, type: 'Home Delivery' },
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
  const now = new Date();
  this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  this.startDate = this.model;
  console.log(this.startDate);
  this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
  console.log(this.minDate);
  this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
  console.log(this.maxDate);
  this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
  console.log(this.globalsvcid);
  }

  showModal(Id:number) {
    const activeModal = this.modalService.open(Modal3Component, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Employee';
    activeModal.componentInstance.modalContent = Id;
  }
  Addsales() {
    this.router.navigate(['pages/user']);
  }

  getBrands(){
    const reqpara1 = 
         {
           requesttype: 'getbrands',
           svcid:this.svcid
         }
      const as1 = JSON.stringify(reqpara1)
      this._data.getBrands(as1).subscribe
       (res => 
         {
          if(res[0].login === 0){
            sessionStorage.removeItem('currentUser');
            this.router.navigate(['/auth/login']);
          }
          else{
            this.brands=res[0].brands,
            console.log('Brands')
            console.log(this.brands);
            this.selectedBrand = this.brands[0].brand_id;
            console.log(this.selectedBrand);
            this.getModelds(this.selectedBrand);
          }
          
         }
       );
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
    // debugger;
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
    const activeModal = this.modalService.open(Modal1Component, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Booking Details';
    activeModal.componentInstance.modalContent = res;
  }

  check(value: string,time:string) {
    console.log(value);
    this.slot_time=time;
    this.slothour = value;
    this.slotcheck = false;

    }

   onSelectBrand(brandsId) {
    this.selectedBrand = null;
    for (let i = 0; i < this.brands.length; i++) {
     if (this.brands[i].brand_id == brandsId) {
        this.selectedBrand = this.brands[i].brand_id;
      }
    }
    // console.log(this.selectedBrand);
    this.getModelds(this.selectedBrand);
  }

 onSelectModel(modelId) {
    this.selectedModel = null;
    for (let i = 0; i < this.Models.length; i++) {
      if (this.Models[i].model_id == modelId) {
        this.selectedModel = this.Models[i];
      }
    }
    console.log(this.selectedModel);
    this.getVariants(this.selectedModel.model_id);
  }

 onSelectVariant(VariantId) {
   this.selectedVariant = null;
   for (let i = 0; i < this.Models.length; i++) {
     if (this.Variant[i].variant_id == VariantId) {
       this.selectedVariant = this.Variant[i];
     }
   }
   console.log(this.selectedVariant);
  }

  getVariants(VariantId:number){
    const reqpara3 = {
        requesttype: 'getvariants',
        brandid : VariantId
        }
    const as3 = JSON.stringify(reqpara3)
    this._data.getVariant(as3).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        this.Variant=res[0].models,
        console.log(this.Variant);
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
    console.log(this.selectedCoordinator);
  }


  getSaleExceutive(){

    const reqpara8={
      requesttype:'getspecificsvcusers',
      usertype:7,
      svcid:this.svcid
    }
    const as8 = JSON.stringify(reqpara8)
    this._data.getVariant(as8).subscribe(res => {
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
    this._data.getVariant(as4).subscribe(res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{

        this.Coordinator = res[0].users
        console.log(this.Coordinator);
     

      }
     
    });
  }

    getModelds(ModelId:number){
      const reqpara2 = {
          requesttype: 'getmodels',
          brandid : ModelId
          }
      const as2 = JSON.stringify(reqpara2)
      this._data.getModels(as2).subscribe(res => {
        if(res[0].login === 0){
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else{
          this.Models = res[0].models ,
            console.log(this.Models);
        }
        
        
          });
      }

      sameas(value){
        console.log(value);
        if(value == true){
          if(this.user.pickloc){
            this.user.droploc = this.user.pickloc;
            console.log(this.user.droploc);
            if(this.user.picklatlong){
              this.user.droplatlong = this.user.picklatlong;
              console.log(this.user.droplatlong);
            }
          }
        }
        else{

          this.user.droploc = null;
          this.user.droplatlong = null;

        }
    
      }


      modelChanged(event){
        console.log(event);
      }


      onSelectDate(date: NgbDateStruct){
        if (date != null) {
                this.model = date;
                this.dateString = this.ngbDateParserFormatter.format(date);
                console.log(this.dateString);
            }
            this.show3 = true;
            if(this.amb == true){
              // this.showToast('default', 'Time', 'Please Select time');
            }
            
            this.getSlot(this.dateString);

      }

      some(value){
        console.log(value);
        this.amb = value;
        console.log(this.amb);
        
      }

      getSlot(Date: string) {
        if (this.yourBoolean === 'servicing') {
          this.pickup_drop = 0;
          console.log(this.pickup_drop);
        }
        else {
          this.pickup_drop = 1;
          console.log(this.pickup_drop);
        }
        if (Date) {
          const reqpara5 = {
            requesttype: 'getslots',
            reqdate: Date,
            pickup_drop: this.pickup_drop,
            svcid: this.svcid
          }
          const as5 = JSON.stringify(reqpara5)
          this._data.getSlot(as5).subscribe(res => {
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
                // this.showToast('default', 'Select Slot', 'Please Select Slot');
                console.log(this.slot);
              }
    
    
            }
    
    
          });
        }
    
      }


  someFunction(){
    console.log(this.registrationNumber);
    const reqpara = {
        requesttype: 'getcustinfo',
        vehnumber: this.registrationNumber,
      }
      const as = JSON.stringify(reqpara)
      this._data.getCustinfo(as).subscribe(data => {
        if(data[0].login === 0){
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else{
          if(data[1].custinfo[0].hasOwnProperty('no_records')){

          }
          else {
            this.customer = data,
        this.cust_details = this.customer[1].custinfo[0];
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
         }
       );

       this.show = true;

  }

  customerCheck(){
    console.log('correctaaa');
    console.log(this.registrationNumber);
    const reqpara = {
        requesttype: 'getcustinfo_mobile',
        mobilenumber: this.cust_details.mobile,
        svcid:this.svcid
      }
      const as = JSON.stringify(reqpara)
      this._data.getCustinfo(as).subscribe(data => {
        if(data[0].login === 0){
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else{
          if(data[1].custinfo[0].hasOwnProperty('no_records')){

          }
          else{
            console.log(data);
            this.customer = data,
            this.cust_details = this.customer[1].custinfo[0],
            this.address = this.customer[2].addresses[0]
            this.user.pickloc = this.address.paddy,
            this.user.picklatlong = this.address.plat + ',' + this.address.plong
            this.user.droploc = this.address.daddy,
            this.user.droplatlong = this.address.dlat + ',' + this.address.dlat,
            this.carinfo = this.customer[3].carinfo[0]
            console.log(this.carinfo);
            console.log(this.cust_details.first_name)
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
         }
       );

       this.show = true;
  }

  onSubmit(f: NgForm) {
    this.disabled =  true;
    if(this.user.time){
      this.slot_time = this.user.time + ':00'
    }
    // this.svcid = sessionStorage.getItem('svcid')
    console.log(f.value.servicetype)
    this.registrationNumber = f.value.num.toUpperCase();
    console.log(this.registrationNumber);

    if(f.value.pickloc){
      this.pickup_add = f.value.pickloc;
      if(f.value.picklatlong){
        let y = f.value.picklatlong.split(/[ ,;]+/);
        console.log(y);
        // this.pickup_add = f.value.pickloc;
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

  if(f.value.droploc)
  {
    this.dropadd = f.value.droploc;
    if(f.value.droplatlong){
      let x = f.value.droplatlong.split(/[ ,;]+/);
      console.log(x);
      this.dropoff_lat = x[0];
      this.dropoff_long = x[1];
    }
    else{
      this.dropoff_lat = "0";
      this.dropoff_long ="0";
    }
   
  }
  else{
    if(f.value.pickloc) {
      this.dropadd = f.value.pickloc;
      this.dropoff_lat = this.pikup_lat;
      this.dropoff_long = this.pikup_long;
    }
    else{
      this.dropadd = "0";
      this.dropoff_lat = "0";
      this.dropoff_long = "0";
    }
   
  }
  if(f.value.mobile2)
  {
      this.mobile2 = f.value.mobile2;
      console.log(this.mobile2);
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

  if(f.value.servicetype == '1'){
    this.pickup_drop = 6;
  }
  else if (f.value.servicetype == '2'){
    this.pickup_drop = 7;
  }
  else if (f.value.servicetype == '3'){
    this.pickup_drop = 4;
  }
  else if (f.value.servicetype == '4'){
    this.pickup_drop = 5;
  }
  else{
    this.pickup_drop = 0;
  }
  if(f.value.salesExe){
      this.saleexce= f.value.salesExe
  }
  else{
    this.saleexce = "0"
  }

  const reqpara6 = {
    requesttype:"createbooking",
    vehnumber: this.registrationNumber,
    vehbrand:this.selectedBrand,
    carmodelid: f.value.model,
    carsubmodelid: f.value.variant,
    customername: this.salutation2 +'.'+this.titlecasePipe.transform(this.cusName),
    customermobile1: this.mobile1,
    customermobile2: this.mobile2,
    customeremail: this.cusEmail,
    queuetime: this.dateString + ' ' +this.slot_time,
    pickuplocationaddress: this.pickup_add,
    pickuplat:this.pikup_lat,
    pickuplong: this.pikup_long,
    droplocationaddress: this.dropadd,
    droplat: this.dropoff_lat,
    droplong: this.dropoff_long,
    servicetype: this.pickup_drop,
    advisorid: f.value.coordinator,
    creid: this.saleexce,
    assignambassador:this.amb,
    selectedsvcid:this.svcid,
    cfeeclient:this.amt,
    notes:this.notes,
    isconfirmed:"0",
    complaint:this.complaint_id,
  
  };

 const ua = JSON.stringify(reqpara6);
 console.log(ua);
  this._data.createChauffeur(ua).subscribe(data => { 
    if(data[0].login === 0){
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['/auth/login']);
    }
    else{
    
        this.message = data[0].queue,
        this.disabled=false;
        this.showLargeModal(this.message[0]);
        console.log(this.message[0].queue_id);
        // f.reset();
        f.controls.num.reset();
        f.controls.servicetype.reset();
        f.controls.model.reset();
        f.controls.variant.reset();
        f.controls.coordinator.reset();
        f.controls.cormob.reset();
        f.controls.dp.reset();
        f.controls.notes.reset();
        f.controls.pickloc.reset();
        f.controls.picklatlong.reset();
        if(f.controls.droploc){
          f.controls.droploc.reset();
          f.controls.droplatlong.reset();
        }
       
       
       
        if(f.value.mobile2){
          f.controls.mobile2.reset();
        }
       
       
        if(f.controls.Cus_name){
          f.controls.Cus_name.reset();
          f.controls.email.reset();
          f.controls.salutation1.reset();
          f.controls.mobile1.reset();
        }
       if(f.controls.salesExe){
        f.controls.salesExe.reset();
       }
        
        if(f.value.amt){
          f.controls.amt.reset();
        }
      
        if(f.controls.time){
          f.controls.time.reset();
        }

        if(f.controls.slot){
          f.controls.slot.reset();
        }
        
       
        this.slot_time = "0";
        this.show = false;
        this.show3 = false;
        this.disabled =  true;
        this.dateString = "";
        this.getCoordinator();
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
//  f.reset();
};

}
