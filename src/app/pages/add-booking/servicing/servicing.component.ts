import { Component, OnInit, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IServicing, custinfo } from '../../model/AddServicing';
import { NgForm } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { ServicingService } from '../../services/addServicing.service';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { defaultIfEmpty } from 'rxjs/operator/defaultIfEmpty';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal1Component } from '../modal/modal1/modal1.component';
import { Modal3Component } from '../modal/modal2/modal2.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from '@angular/router';
import { OnlyNumber } from '../../number.directive';
import { NgClass } from '@angular/common';

interface IModelsList {
  brand_id: number
  model_id: number
  model_name: string
}
@Component({
  selector: 'app-servicing',
  templateUrl: './servicing.component.html',
  styleUrls: ['./servicing.component.scss']
})


export class ServicingComponent implements OnInit {
  public registrationNumber: string;
  public mobile11: string;
  private brands: any = [];
  private Models: any = [];
  private Variant: any = [];
  private cre: any = [];
  private Slot: any = [];
  private Complaints: string[];
  private service_advisor: string[];
  private creName: string[];
  private Svclist: any = [];
  public slot: any = [];
  public vehicle = [];
  public selectedBrand: any = [];
  public selectedModel: any = [];
  public selectedVariant: any = [];
  public servicing_Date: any = [];
  public service_type: any = [];
  public complaint_id: any = [];
  public pikup_lat: string;
  public carinfo: any = [];
  public pikup_long: string;
  public dropoff_lat: string;
  public dropoff_long: string;
  public pickup_add: string;
  public slot_time: string;
  public notes: string;
  droplocation:string;
  public amt: string;
  public Sid: string;
  public droplatlong: string;
  slotcheck = true;
  model: NgbDateStruct;
  dateString: string;
  yourBoolean = 'servicing';
  public pickup_drop: number;
  public mobile2: string;
  public message: any = [];
  public dropadd: string;
  public disabled = false;
  public sameasvalue: boolean;
  public isconfirm: string;
  public address: any = [];
  public serviceadv: any = [];
  public buttondisabled = false;
  itemList = [];
  datecheck = true;
  selectedItems = [];
  settings = {};
  data: any = [];
  public cus: any = {};
  user: any = {};
  customer: any = [];
  cust_details: any = {};
  show1 = false;
  show2 = false;
  show3 = true;
  showstep1 = false;
  showstep2 = false;
  public countrycode1: string;
  brand_id: string;
  valuedate = new Date();
  public amb: boolean = true;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  svcid:string;
  config: ToasterConfig;
  public startDate;
  public minDate;
  public maxDate;
  public salutation:any;
  public globalsvcid:string;
  public selectedsvcid:string;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  slothour:string;
  date: {year: number, month: number};

  public httpOptions = {
    Headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private router: Router,
    private toasterService: ToasterService,
    private ServicingService: ServicingService,
    private http: HttpClient,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private modalService: NgbModal,
    private titlecasePipe:TitleCasePipe) { }


  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    
    this.user.confirm = true;
    this.countrycode1 = "+91";
    this.getBrands();
    this.salutation = [
      { id: 1, type: 'Mr' },
      { id: 2, type: 'Mrs' },
      { id: 3, type: 'Ms' },
    ];
    this.user.salutation = 'Mr';
    this.service_type = [
      { id: 1, type: 'Body Repair' },
      { id: 2, type: 'Servicing' },
      { id: 3, type: 'Both' },
    ];
    this.selectedItems = [];
    this.settings = {
      text: 'Select Complaints*',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      maxHeight: 150
    };
     
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
    this.getAdvisor();
    this.getCre();
    this.getcreadv();
  }

  showLargeModal(res: any, notes: string) {
    const activeModal = this.modalService.open(Modal1Component, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Booking Details';
    activeModal.componentInstance.modalContent = res;
    activeModal.componentInstance.modalNotes = notes;
  }
  showModal(Id:number) {
    const activeModal = this.modalService.open(Modal3Component, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Employee';
    activeModal.componentInstance.modalContent = Id;
  }
  Addcre() {
    this.router.navigate(['pages/user']);
  }
  Addadv() {
    this.router.navigate(['pages/user']);
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

  saverange(value: any) {
    console.log(value);
    if (this.sameasvalue == true) {
      this.user.dropoff_location = value;
      console.log(this.user.dropoff_location);
      if (this.user.picklatlong) {
        this.user.dropofflatlong = this.user.picklatlong;
        console.log(this.user.dropofflatlong);
      }
    }
  }

  eligibiltycheck1(){
    const reqpara0 =
    {
      requesttype: 'geteligibilitycheckstepone',
      customerMobileNumber:this.user.mobile1,
      vehicleRegNumber:this.registrationNumber,
      typeofservice:1
    }
    console.log(reqpara0);
    const as0 = JSON.stringify(reqpara0);
    this.ServicingService.check(as0).subscribe(
      res => {
        console.log(res[0].eligible);
        console.log(res[0].eligible[0].eligible);
        const eligible = res[0].eligible[0].eligible;
        if(JSON.parse(eligible)){
          console.log("true");
          this.showstep1 = true;
        }
        else{
          console.log("false");
          this.showstep2 = true;
          this.showToast('Message', 'Not Eligible ', 'Customer is not Eligible for step 2');
        }
      }
    )
  }

  skip(){
    this.showToast('Message', 'Skip Message', 'Customer will not be eligilble for any benefits');
    this.showstep2 = true;
  }


  eligibiltycheck2(){
    const reqpara01 =
    {
      requesttype: 'geteligibilitychecksteptwo',
      customerMobileNumber:this.user.mobile1,
      vehicleRegNumber:this.registrationNumber,
      typeofservice:1,
      policynumber:this.user.policy,
      vinnumber:this.user.vin
    }
    console.log(reqpara01);
    const as01 = JSON.stringify(reqpara01);
    this.ServicingService.check(as01).subscribe(
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

  getBrands() {
    const reqpara1 =
      {
        requesttype: 'getbrands',
        svcid:this.svcid
      }
    const as1 = JSON.stringify(reqpara1)
    this.ServicingService.getBrands(as1).subscribe
      (res => {
        console.log(res[0].login);
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.brands = res[0].brands,
            this.selectedBrand = this.brands[0].brand_id;
            this.getModelds(this.selectedBrand);
         
        }

      }
      );
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

  some(value) {
    console.log(value);
    this.amb = value;
    console.log(this.amb);

  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    console.log(this.selectedItems.length);
  }

  OnItemDeSelect(item: any) {
    console.log(item),
      console.log(this.selectedItems);

  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }


  onSelectModel(modelId) {
    // this.selectedModel = null;
    for (let i = 0; i < this.Models.length; i++) {
      if (this.Models[i].model_id == modelId) {
        this.selectedModel = this.Models[i];
      }
    }
    console.log(this.selectedModel);
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
    console.log(this.selectedVariant);
  }

  getVariants(VariantId: number) {
    const reqpara3 = {
      requesttype: 'getvariants',
      brandid: VariantId
    }
    const as3 = JSON.stringify(reqpara3)
    this.ServicingService.getVariant(as3).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Variant = res[0].models,
          console.log(this.Variant);
      }

    });
  }

  getModelds(ModelId: number) {
    const reqpara2 = {
      requesttype: 'getmodels',
      brandid: this.selectedBrand
    }
    const as2 = JSON.stringify(reqpara2)
    this.ServicingService.getModels(as2).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Models = res[0].models,
          console.log(this.Models);


      }

    });
  }

  getDefault() {
    const reqpara2 = {
      requesttype: 'getmodels',
      brandid: 39
    }
    const as2 = JSON.stringify(reqpara2)
    this.ServicingService.getModels(as2).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Models = res[0].models,
          console.log(this.Models);


      }

    });
  }

  getcreadv() {
    const reqpara4 = {
      requesttype: 'getcreadv',
      svcid:this.svcid
    }
    const as4 = JSON.stringify(reqpara4)
    this.ServicingService.getCre(as4).subscribe(res => {
      console.log(res[0].login === 0);
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Svclist = res[0].svclist[0].id;
        console.log(this.Svclist)
        this.creName = res[1].cre;
        this.service_advisor = res[2].advisor
        this.itemList = res[3].complaints
      }

    });
  }

  getSlot(Date: string) {
    if (this.yourBoolean === 'servicing' || this.yourBoolean === 'onlypickup') {
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
        svcid:this.svcid
      }
      const as5 = JSON.stringify(reqpara5)
      this.ServicingService.getSlot(as5).subscribe(res => {
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
            console.log(this.slot);
          }


        }


      });
    }

  }

  doPickup() {
    console.log(this.dateString)
    console.log('drop')
    if (this.dateString.length > 0) {
      const reqpara10 = {
        requesttype: 'getslots',
        reqdate: this.dateString,
        pickup_drop: 0,
        svcid:this.svcid
      }
      const as10 = JSON.stringify(reqpara10)
      this.ServicingService.getSlot(as10).subscribe(res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.Slot = res[0],
            console.log(this.Slot);
          this.slot = res[0].slots;
          console.log(this.slot);
        }


      });
    }
  }

  doDrop() {
    console.log(this.dateString)
    console.log('drop')
    if (this.dateString.length > 0) {
      const reqpara11 = {
        requesttype: 'getslots',
        reqdate: this.dateString,
        pickup_drop: 1,
        svcid:this.svcid
      }
      const as11 = JSON.stringify(reqpara11)
      this.ServicingService.getSlot(as11).subscribe(res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.Slot = res[0],
            console.log(this.Slot);
          this.slot = res[0].slots;
          console.log(this.slot);
        }


      });
    }
    else{
      console.log('no date');
    }
  }

  onBlurMethod(value: string) {
    this.registrationNumber = value.toUpperCase()
  }

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.dateString = this.ngbDateParserFormatter.format(date);
      console.log(this.dateString);
    }
    this.show3 = true;
    console.log(this.amb);
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


  someFunction() {
    // console.log(this.user.registrationNumber);

    const reqpara = {
      requesttype: 'getcustinfo',
      vehnumber: this.registrationNumber,
      mobilenumber: this.user.mobile1,
      svcid:this.svcid
    }
    const as = JSON.stringify(reqpara)
    // console.log(as);

    this.ServicingService.getCustinfo(as).subscribe(data => {
      if (data[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.customer = data
        if (this.customer[1].custinfo[0].no_records) {
          console.log('no records');
          this.cust_details.mobile = this.user.mobile1
        }
        else {
          this.cust_details = this.customer[1].custinfo[0],
            this.address = this.customer[2].addresses[0]
          this.user.pickuploc = this.address.paddy,
            this.user.picklatlong = this.address.plat + ',' + this.address.plong
          this.user.dropoff_location = this.address.daddy,
            this.user.dropofflatlong = this.address.dlat + ',' + this.address.dlat,
            this.carinfo = this.customer[3].carinfo[0]
          // console.log(this.carinfo);
          this.selectedModel = this.carinfo.veh_model_id;
          this.selectedVariant = this.carinfo.veh_submodel_id;
          console.log(this.selectedModel);
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
          console.log("Client-side error occured.");
        }
        else {
          console.log("Server-side error occured.");
        }
      }
    );

    this.showstep2 = true;

  }

  secondcheck() {
    this.show2 = true;
  }

  sameas(value) {
    console.log(value);
    this.sameasvalue = value;
    if (value == true) {

      if (this.user.pickuploc) {
        this.user.dropoff_location = this.user.pickuploc;
        console.log(this.user.dropoff_location);
        if (this.user.picklatlong) {
          this.user.dropofflatlong = this.user.picklatlong;
          console.log(this.user.dropofflatlong);
        }
      }
    }
    else {
      this.user.dropoff_location = null ;
      this.user.dropofflatlong = null ;
    }

  }

  check(value: string,time:string) {
    console.log(time);
    this.slothour = value;
    this.slot_time = time;
    this.slotcheck = false;
  }


  getCre() {
    const reqpara7 = {
      requesttype: 'getspecificsvcusers',
      usertype: 2,
      svcid:this.svcid
    }
    const as4 = JSON.stringify(reqpara7)
    this.ServicingService.getVariant(as4).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {

        this.cre = res[0].users
        console.log(this.cre);
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
    this.ServicingService.getVariant(as5).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {

        this.serviceadv = res[0].users
        console.log(this.serviceadv);
      }

    });
  }


  onSubmit(f: NgForm) {
    console.log(f.value.confirm);
    if (f.value.confirm) {
      this.isconfirm = "1";
    }
    else {
      this.isconfirm = "0";
    }
    this.disabled = true;
    this.registrationNumber = f.value.num.toUpperCase();
    console.log(this.registrationNumber);

    if (this.user.time) {
      this.slot_time = this.user.time + ':00'
    }
    else {
      if (!this.slot_time) {
      }
    }

    if (f.value.droplatlong) {
      let x = f.value.droplatlong.split(/[ ,;]+/);
      console.log(x);
      this.dropoff_lat = x[0];
      this.dropoff_long = x[1];
    }
    else{
      this.dropoff_lat = "0";
      this.dropoff_long = "0";
    }

    if (f.value.picklatlong) {
      let y = f.value.picklatlong.split(/[ ,;]+/);
      console.log(y);
      this.pickup_add = f.value.pickuploc;
      this.pikup_lat = y[0];
      this.pikup_long = y[1];
    }
    else {
      this.pickup_add = f.value.droploc;
      if (f.value.droplatlong){
        this.pikup_lat = this.dropoff_lat;
        this.pikup_long = this.dropoff_long;
      }
      else{
        this.pikup_lat = "0";
      this.pikup_long = "0";
      }
      
    }

    if (f.value.mobile2) {
      this.mobile2 = f.value.mobile2;
      console.log(this.mobile2);
    }
    else {
      this.mobile2 = "0";
      console.log("0");
    }

    if (f.value.notes) {
      this.notes = f.value.notes;
    }
    else {
      this.notes = "-";
    }
    if(f.value.droploc){
      this.droplocation = f.value.droploc
    }
    else{
      if(f.value.pickuploc){
        this.droplocation = f.value.pickuploc
      }
      else{
        this.droplocation = "0";
      }
    }

    if (f.value.amt) {
      this.amt = f.value.amt;
    }
    else {
      this.amt = "0";
    }
    if (this.slot_time) {

    }
    else {
      this.slot_time = "0";
    }
    
    if (this.yourBoolean === 'servicing' || this.yourBoolean === 'onlypickup') {
      this.pickup_drop = 0;
      console.log(this.pickup_drop);
    }
    else {
      this.pickup_drop = 1;
      console.log(this.pickup_drop);
    }

    for (var i = 0; i < this.selectedItems.length; i++) {
      this.complaint_id.push(this.selectedItems[i].id);
    }
    if(this.selectedItems.length == 0)
    {
      this.complaint_id = ["0"];
    }
    console.log(this.complaint_id);

    const reqpara6 = {
      requesttype: "createbooking",
      vehnumber: this.registrationNumber,
      vehbrand: this.selectedBrand,
      carmodelid: f.value.model,
      carsubmodelid: f.value.variant,
      customername: f.value.salutation1 +'.'+this.titlecasePipe.transform(f.value.Cus_name),
      customermobile1: f.value.mobile1,
      customermobile2: this.mobile2,
      customeremail: f.value.email,
      queuetime: this.dateString + ' ' + this.slot_time,
      pickuplocationaddress: this.pickup_add,
      pickuplat: this.pikup_lat,
      pickuplong: this.pikup_long,
      droplocationaddress: this.droplocation,
      droplat: this.dropoff_lat,
      droplong: this.dropoff_long,
      servicetype: this.pickup_drop,
      advisorid: f.value.ServiceAdvisor,
      creid: f.value.creName,
      assignambassador: this.amb,
      selectedsvcid: this.svcid,
      cfeeclient: this.amt,
      notes: this.notes,
      isconfirmed: this.isconfirm,
      complaint: this.complaint_id
    };

    const ua = JSON.stringify(reqpara6);
    console.log(ua);
    this.ServicingService.AddSerivicng(ua).subscribe(data => {
      if (data[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      } else {
        this.message = data[0].queue,
          this.disabled = false;
        this.showLargeModal(this.message[0], this.notes);
        console.log(this.message[0].queue_id);
        // f.reset();
        this.slot_time = "0";
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.showstep2 = false;
        this.pickup_drop = 0;
       
        f.reset();
        this.countrycode1 = "+91";
        this.dateString = null;
        this.yourBoolean = 'servicing';
        this.user.salutation = 'Mr';
        this.user.confirm = true;
        this.datecheck = false;
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
  };



}

