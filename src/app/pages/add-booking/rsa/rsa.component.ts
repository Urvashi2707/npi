import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { BookingDetails } from '../modal/BookingDetails/BookingDetails.component';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { ServicingService } from '../../services/addServicing.service';
@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html',
  styleUrls: ['./rsa.component.scss']
})
export class RsaComponent implements OnInit {

  public selectedBrand: any = [];
  public selectedModel: any = [];
  public selectedVariant: any = [];
  private brands: any = [];
  private Models: any = [];
  private Variant: any = [];
  show3 = true;
  message=[];
  public mobile2: string;
  private cre: any = [];
  public serviceadv: any = [];
  registrationNumber:string;
  private serviceType: string[];
  private TowingTruck: string[];
  private creName: string[];
  cust_details:any={};
  servicetypeid:string;
  public slot_time: string;
  public address: any = [];
  public carinfo: any = [];
  ea_respondID:string;
  itemList = [];
  slotcheck = true;
  datecheck = true;
  dateString:string;
  customer: any = [];
  showstep1 = false;
  public amb: boolean = true;
  showstep2 = false;
  private service_advisor: string[];
  showstep3 = false;
  pikup_lat:string;
  dropoff_lat:string;
  dropoff_long:string;
  dropoff:string;
  public svc: boolean = true;
  public yourBoolean : string = 'onSpot' ; 
  user:any = {};
  pikup_long:string;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  svcid:string;
  notes:string;
  amt:string;
  hideDropoff:boolean = true;
  showsvclist:boolean;
  config: ToasterConfig;
  public startDate;
  public minDate;
  public maxDate;
  model: NgbDateStruct;
  public salutation:any;
  public globalsvcid:string;
  public selectedsvcid:string;
  showtime = false;
  position = 'toast-top-full-width';
  animationType = 'fade';
  pickup_add:string;
  disabledNext = false;
  timeout = 5000;
  public slot: any = [];
  public pickup_drop: number;
  private Svclist: any = [];
  toastsLimit = 5;
  slothour:string;
  countrycode1:string;
  rsaType:any=[];
  scv:string;
  TowingTypes:any = [];
  OnSpotTypes:any= [];
  constructor(     private modalService: NgbModal, private titlecasePipe:TitleCasePipe, private ngbDateParserFormatter: NgbDateParserFormatter,private http: HttpClient, private spinner: NgxSpinnerService, private toasterService: ToasterService, private router: Router,private ServicingService: ServicingService,) { }


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
    const now = new Date();
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.startDate = this.model;
    // console.log(this.startDate);
    this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
    // console.log(this.minDate);
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
    // console.log(this.maxDate);
   
    this.TowingTruck =  ['Flat bed', 'Winch'];
    this.serviceType =  ['Flat Tyre', 'Jump Start', 'Lock out','Out of Gas','Others'];
    this.creName = ['Rohnit','Mohit','Nitin','Add CRE'];
    this.countrycode1 = "+91";
    this.getBrands();
    this.getAdvisor();
    this.getCre();
    this.getcreadv();
    this.salutation = [
      { id: 1, type: 'Mr' },
      { id: 2, type: 'Mrs' },
      { id: 3, type: 'Ms' },
    ];
    this.user.salutation = 'Mr';
    this.getRSATypes();
    // this.getSvcList();
  }

  public opt={
    headers: new HttpHeaders().set('x-auth-token', JSON.stringify(localStorage.getItem('token')))
  }

  // getModelds(ModelId: number) {
  //   const reqpara2 = {
  //     requesttype: 'getmodels',
  //     brandid: this.selectedBrand
  //   }
  //   const as2 = JSON.stringify(reqpara2)
  //   this.ServicingService.getModels(as2).subscribe(res => {
  //     if (res[0].login === 0) {
  //       sessionStorage.removeItem('currentUser');
  //       this.router.navigate(['/auth/login']);
  //     }
  //     else {
  //       this.Models = res[0].models,
  //         console.log(this.Models);


  //     }

  //   });
  // }
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

  getSlot(Date: string) {
    this.showtime = true;
    if (this.yourBoolean === 'servicing' || this.yourBoolean === 'onlypickup') {
      this.pickup_drop = 0;
      // console.log(this.pickup_drop);
    }
    else {
      this.pickup_drop = 1;
      // console.log(this.pickup_drop);
    }
    if (Date) {
      const reqpara5 = {
        requesttype: 'getslots',
        reqdate: Date,
        pickup_drop: this.pickup_drop,
        svcid:this.svcid
      }
      const as5 = JSON.stringify(reqpara5)
      this.ServicingService.webServiceCall(as5).subscribe(res => {
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
            // this.showToast('default', 'Time', 'Please Select time');
            // console.log(this.slot);
          }


        }


      });
    }

  }

  getBrands() {
    const reqpara1 =
      {
        requesttype: 'getbrands',
        svcid:this.svcid
      }
    const as1 = JSON.stringify(reqpara1)
    this.ServicingService.webServiceCall(as1).subscribe
      (res => {
        // console.log(res[0].login);
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.brands = res[0].brands,
            this.selectedBrand = this.brands[0].brand_id;
            console.log(this.selectedBrand);
            this.getModelds(this.selectedBrand);
         
        }

      }
      );
  }

  check(value: string,time:string) {
    // console.log(time);
    this.slothour = value;
    this.slot_time = time;
    this.slotcheck = false;
  }

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.dateString = this.ngbDateParserFormatter.format(date);
      // console.log(this.dateString);
    }
    this.show3 = true;
    // console.log(this.amb);
    if(this.amb == true || this.datecheck == true){
      //  this.showToast('default', 'Time', 'Please Select time');
    }
   
    this.slot = [];
    this.getSlot(this.dateString);
  }

  setDefaultDate(): NgbDateStruct {
    var startDate = new Date();
    let startYear = startDate.getFullYear().toString();
    let startMonth = startDate.getMonth() + 1;
    let startDay = "1";

    return this.ngbDateParserFormatter.parse(startYear + "-" + startMonth.toString() + "-" + startDay);
  }

  getcreadv() {
    const reqpara4 = {
      requesttype: 'getcreadv',
      svcid:this.svcid
    }
    const as4 = JSON.stringify(reqpara4)
    this.ServicingService.webServiceCall(as4).subscribe(res => {
      // console.log(res[0].login === 0);
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Svclist = res[0].svclist[0].id;
        // console.log(this.Svclist)
        this.creName = res[1].cre;
        this.service_advisor = res[2].advisor
        this.itemList = res[3].complaints
      }

    });
  }

  getAdvisor() {
    const reqpara8 = {
      requesttype: 'getspecificsvcusers',
      usertype: 3,
      svcid:this.svcid
    }
    const as5 = JSON.stringify(reqpara8)
    this.ServicingService.webServiceCall(as5).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {

        this.serviceadv = res[0].users
        // console.log(this.serviceadv);
      }

    });
  }

  getCre() {
    const reqpara7 = {
      requesttype: 'getspecificsvcusers',
      usertype: 2,
      svcid:this.svcid
    }
   
    const as4 = JSON.stringify(reqpara7)
    this.ServicingService.webServiceCall(as4).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
     
        this.cre = res[0].users
        // console.log(this.cre);
      }

    });
  }
  buildArr(theArr: any[]) {
    var arrOfarr = [];
    if (theArr.length > 0) {
      for (var i = 0; i < theArr.length; i += 4) {
        var row = [];
        for (var x = 0; x < 4; x++) {
          var value = theArr[i + x];
          if (!value) {
            break;
          }
          row.push(value);
        }
        arrOfarr.push(row);
      }
    }

    return arrOfarr;
  }

  onSelectModel(modelId) {
    // this.selectedModel = null;
    for (let i = 0; i < this.Models.length; i++) {
      if (this.Models[i].model_id == modelId) {
        this.selectedModel = this.Models[i];
      }
    }
    // console.log(this.selectedModel);
    // this.getVariants(this.selectedModel.model_id);
    this.getVariants(this.selectedModel);
  }

  onSelectVariant(VariantId) {
    // this.selectedVariant = null;
    for (let i = 0; i < this.Models.length; i++) {
      if (this.Variant[i].variant_id == VariantId) {
        this.selectedVariant = this.Variant[i];
      }
    }
    // console.log(this.selectedVariant);
  }

  getVariants(VariantId: number) {
    const reqpara3 = {
      requesttype: 'getvariants',
      brandid: VariantId
    }
    const as3 = JSON.stringify(reqpara3)
    this.ServicingService.webServiceCall(as3).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Variant = res[0].models
          // console.log(this.Variant);
      }

    });
  }

  getModelds(ModelId: number) {
    const reqpara2 = {
      requesttype: 'getmodels',
      brandid: this.selectedBrand
    }
    const as2 = JSON.stringify(reqpara2)
    this.ServicingService.webServiceCall(as2).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Models = res[0].models
          // console.log(this.Models);
         }

    });
  }

  getSvcList() {
    console.log(this.selectedBrand)
    const reqpara22 = {
      requesttype: 'getrsasvcentres',
      brandid: this.selectedBrand,
      cityid:JSON.parse(sessionStorage.getItem('city_id'))
    }
    const as22 = JSON.stringify(reqpara22)
    this.ServicingService.getModels(as22).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        console.log(res);
        this.Svclist = res[0].svclist;
          // console.log(this.Models);
         }

    });
  }

  getRSATypes(){
    const reqpara21 = {
      requesttype: 'getrsasvctypes',
      
    }
    const as21= JSON.stringify(reqpara21)
    this.ServicingService.webServiceCall(as21).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
       console.log(res);
       this.rsaType = res[0].rsasvc;
       console.log(this.rsaType.length)
       for(var i = 0; i < res[0].rsasvc.length; i++ ){
        if(res[0].rsasvc[i].isonspot == '0'){
        this.TowingTypes.push(res[0].rsasvc[i]);
        // console.log(this.TowingTypes);
       
        }
      
      else if (res[0].rsasvc[i].isonspot == '1') {
        this.OnSpotTypes.push(res[0].rsasvc[i]);
        // console.log(this.OnSpotTypes);
       
      }
      
    }
      }
      console.log(this.TowingTypes);
      console.log(this.OnSpotTypes);
    });
  }

  public opt1={
    headers: new HttpHeaders({'x-auth-token': sessionStorage.getItem('token'),'x-auth-user':sessionStorage.getItem('auth-user'),'Content-Type':  'application/json'})
    }
  eligibiltycheck1(){
    if(this.user.onSpotType){
      this.servicetypeid = this.user.onSpotType;
    }
    else if (this.user.towingTruckType){
      this.servicetypeid = this.user.towingTruckType;
    }
    this.spinner.show();
    const reqpara0 =
    {
      customerMobileNumber:this.user.mobile1,
      vehicleRegNumbe:this.registrationNumber,
      typeofservice:this.servicetypeid
    }
    // console.log(reqpara0);
    const as0 = JSON.stringify(reqpara0);
    this.http.post('https://plsuat.europassistance.in:444/checkInitialEligibility',as0,this.opt1).subscribe(
      res => {
        // console.log(res['message']);
        if (res['message'] === 'policy is not valid'){
          this.spinner.hide();
          this.someFunction();
          this.showToast('Message', 'Policy Message', 'Policy is not valid');
          this.showstep3 = true;
          this.disabledNext = true;
          this.ea_respondID = "0";
        }
        else if (res['message'] === 'policy is valid'){
          this.spinner.hide();
          this.someFunction();
          this.showToast('Message', 'Policy Message', 'Policy is valid');
        this.showstep2 = true;
        this.disabledNext = true;
        this.ea_respondID = res['responseId'];
        }
        else{
          this.spinner.hide();
          this.someFunction();
          this.showToast('Message', 'Policy Message', 'Something went wrong');
          this.showstep3 = true;
          this.disabledNext = true;
          this.showstep3 = true;
          this.ea_respondID = "0";
        }
        
      },(err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.spinner.hide();
          this.someFunction();
          this.showToast('Message', 'Policy Message', 'Something went wrong');
          console.log("Client-side error occured.");
          this.disabledNext = true;
          this.showstep3 = true;
          this.ea_respondID = "0";
        }
        else {
          this.spinner.hide();
          this.someFunction();
          this.showToast('Message', 'Policy Message', 'Something went wrong');
          console.log("Server-side error occured.");
          this.disabledNext = true;
          this.ea_respondID = "0";
          this.showstep3 = true;
        }
      }
    );
    
    
  }

  some(value){
    console.log(value);
    if(value == true){
      this.hideDropoff = false;
    this.showsvclist = true;
    this.getSvcList();
    }
    else{
      this.hideDropoff = true;
      this.showsvclist = false;
    }
    
  }

  skip(){
    this.showToast('Message', 'Skip Message', 'Customer will not be eligilble for any benefits');
    this.showstep2 = true;
  }
  someFunction() {
    const reqpara = {
     requesttype: 'getcustinfo',
     vehnumber: this.registrationNumber,
     mobilenumber: this.user.mobile1,
     svcid:this.svcid
   }
   const as = JSON.stringify(reqpara)
 this.ServicingService.webServiceCall(as).subscribe(data => {
     if (data[0].login === 0) {
       sessionStorage.removeItem('currentUser');
       this.router.navigate(['/auth/login']);
     }
     else {
       this.customer = data
       if (this.customer[1].custinfo[0].no_records) {
         // console.log('no records');
         this.cust_details.mobile = this.user.mobile1
       }
       else {
         this.cust_details = this.customer[1].custinfo[0],
        //    this.address = this.customer[2].addresses[0]
        //  this.user.pickuploc = this.address.paddy,
        //    this.user.picklatlong = this.address.plat + ',' + this.address.plong
        //  this.user.dropoff_location = this.address.daddy,
        //    this.user.dropofflatlong = this.address.dlat + ',' + this.address.dlat,
           this.carinfo = this.customer[3].carinfo[0];
           console.log(this.carinfo);
         this.selectedModel = this.carinfo.veh_model_id;
         this.selectedVariant = this.carinfo.veh_submodel_id;
         // console.log(this.selectedModel);
         this.getVariants(this.selectedModel);
         for (let i = 0; i < this.Models.length; i++) {
           if (this.Models[i].id === this.selectedModel) {
             this.selectedModel = this.Models[i].id ;
           }
         }
       }

     }


   },
     (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
         // console.log("Client-side error occured.");
       }
       else {
         // console.log("Server-side error occured.");
       }
     }
   );

   // this.showstep3 = true;

 }
 showLargeModal(res: any, notes: string) {
  const activeModal = this.modalService.open(BookingDetails, { size: 'lg', container: 'nb-layout' });
  activeModal.componentInstance.modalHeader = 'Booking Details';
  activeModal.componentInstance.modalContent = res;
  activeModal.componentInstance.modalNotes = notes;
}
  eligibiltycheck2(){
    if(this.user.onSpotType){
      this.servicetypeid = this.user.onSpotType;
    }
    else if (this.user.towingTruckType){
      this.servicetypeid = this.user.towingTruckType;
    }
    const reqpara01 =
    {
      requesttype: 'geteligibilitychecksteptwo',
      customerMobileNumber:this.user.mobile1,
      vehicleRegNumber:this.registrationNumber,
      typeofservice:this.servicetypeid,
      policynumber:this.user.policy,
      vinnumber:this.user.vin
    }
    console.log(reqpara01);
    const as01 = JSON.stringify(reqpara01);

    this.ServicingService.Finalcheck(as01).subscribe(

      res => {
        console.log(res[0].eligible);
        console.log(res[0].eligible[0].eligible);
        const eligible = res[0].eligible[0].eligible;
        if(JSON.parse(eligible)){
          console.log("true");
          this.showstep2 = true;
        }
        else{
          console.log("false");
          this.showstep2 = true;
        }
      }
    )
  }

  // getVariants(VariantId: number) {
  //   const reqpara3 = {
  //     requesttype: 'getvariants',
  //     brandid: VariantId
  //   }
  //   const as3 = JSON.stringify(reqpara3)
  //   this.ServicingService.getVariant(as3).subscribe(res => {
  //     if (res[0].login === 0) {
  //       sessionStorage.removeItem('currentUser');
  //       this.router.navigate(['/auth/login']);
  //     }
  //     else {
  //       this.Variant = res[0].models,
  //         console.log(this.Variant);
  //     }

  //   });
  // }

  // getcustinfo(){
  //   const reqpara = {
  //     requesttype: 'getcustinfo',
  //     vehnumber: this.registrationNumber,
  //     mobilenumber: this.user.mobile1,
  //     svcid:this.svcid
  //   }
    
  // }

  onSubmit(f: NgForm) {
    this.registrationNumber = f.value.num.toUpperCase();
    if (f.value.mobile2) {
      this.mobile2 = f.value.mobile2;
    }
    else {
      this.mobile2 = "0";
    }

    if(f.value.custloc){
      this.pickup_add = f.value.custloc;
    }
    else{
      this.pickup_add = f.value.dropoff;
    }

    if(f.value.custlatlong){
      let y = f.value.custlatlong.split(/[ ,;]+/);
      this.pickup_add = f.value.custloc;
      this.pikup_lat = y[0];
      this.pikup_long = y[1];
    }
    else if(f.value.dropofflatlong){
      let x = f.value.dropofflatlong.split(/[ ,;]+/);
        this.dropoff = f.value.dropoff;
        this.pikup_lat = x[0];
        this.pikup_long = x[1];
    }
    else {
      this.pikup_lat = "0";
        this.pikup_long = "0";
    }

    if(f.value.dropofflatlong){
      let x = f.value.dropofflatlong.split(/[ ,;]+/);
      
      this.dropoff_lat = x[0];
      this.dropoff_long = x[1];
    }
    else if (f.value.custlatlong){
      let y = f.value.custlatlong.split(/[ ,;]+/);
      
      this.dropoff_lat = y[0];
      this.dropoff_long = y[1];
    }
    else{
      this.dropoff_lat = "0";
      this.dropoff_long = "0";
    }

    if (f.value.notes) {
      this.notes = f.value.notes;
    }
    else {
      this.notes = "-";
    }
   

    if (f.value.amt) {
      this.amt = f.value.amt;
    }
    else {
      this.amt = "0";
    }
    if(f.value.svc1){
      this.scv = this.user.svc1;
    }
    else{
      this.scv = this.svcid;
    }
    if(f.value.serviceType){
      this.servicetypeid = f.value.serviceType;
    }
    else if (f.value.TowingTruck){
      this.servicetypeid = f.value.TowingTruck;
    }
    if(f.value.dropoff){
        this.dropoff = f.value.dropoff;
    }
    else {
      this.dropoff = f.value.custloc;
      if(f.value.dropofflatlong){
        let x = f.value.dropofflatlong.split(/[ ,;]+/);
        this.dropoff_lat = x[0];
        this.dropoff_long = x[1];
    }
    else{
      
    }
  }
  if(this.slot_time != "0"){
    const reqp = {
      requesttype :'createbookingrsa',
      vehnumber : this.registrationNumber,
      vehbrand:this.selectedBrand,
      carmodelid:f.value.model,
      carsubmodelid:f.value.variant,
      customername: f.value.salutation1 +'.'+this.titlecasePipe.transform(f.value.Cus_name),
      customermobile1: f.value.mobile1,
      customermobile2: this.mobile2,
      customeremail:f.value.email,
      queuetime:this.dateString + ' ' + this.slot_time,
      pickuplocationaddress:this.pickup_add ,
      pickuplat:this.pikup_lat ,
      pickuplong:this.pikup_long,
      droplocationaddress: this.dropoff,
      droplat: this.dropoff_lat,
      droplong:this.dropoff_long,
      servicetype:this.servicetypeid,
      advisorid:"0",
      creid:"0",
      selectedsvcid:this.scv,
      cfeeclient:this.amt,
      notes:this.notes
    };
    const rep1= JSON.stringify(reqp);
    console.log(rep1);
    this.ServicingService.webServiceCall(rep1).subscribe(data => {
      if (data[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      } else {
        this.message = data[0].queue;
        this.showLargeModal(this.message[0], this.notes);
        this.slot_time = "0";
        f.reset();
        this.show3 = false;
        this.showstep2 = false;
        this.showstep3 = false;
        this.showtime = false;
        this.pickup_drop = 0;
        this.countrycode1 = "+91";
        this.dateString = null;
        this.user.salutation = 'Mr';
        this.yourBoolean = 'onSpot';
        this.user.confirm = true;
        this.datecheck = false;
        this.disabledNext = false;
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
}
else {
  this.showToast('alert', 'Message', 'Please select Slot and date');
}
}
}

