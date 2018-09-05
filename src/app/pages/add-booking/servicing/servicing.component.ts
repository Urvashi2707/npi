import { Component, OnInit,ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { ServicingService } from '../../services/addServicing.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {NgbModal,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BookingDetails } from '../modal/BookingDetails/BookingDetails.component';
import { AddEmployee } from '../modal/AddEmployee/AddEmployee.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TestserviceService } from '../../../testservice.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core'; 
import {} from '@types/googlemaps';

declare var google: any;
@Component({
  selector: 'app-servicing',
  templateUrl: './servicing.component.html',
  styleUrls: ['./servicing.component.scss'],
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
  cityID:string;
  public selectedBrand: any = [];
  public selectedModel: any = [];
  public selectedVariant: any = [];
  public servicing_Date: any = [];
  public service_type: any = [];
  public complaint_id: any = [];
  public pikup_lat: string;
  public carinfo: any = [];
  counter:number = 0;
  public pikup_long: string;
  public dropoff_lat: string;
  public dropoff_long: string;
  public pickup_add: string;
  public slot_time: string;
  public notes: string;
  droplocation:string;
  showAddress = false;
  disableNext = false;
  showAddressDropDown = false;
  pickupdoor:string;
  pickupstreet:string;
  pickuparea:string;
  pickuplandmark:string;
  pickuppincode:string;
  dropofffdoor:string;
  advisorId:string;
  dropoffstreet:string;
  dropoffarea:string;
  dropofflandmark:string;
  addresstype_do:string;
  addressdoprevious:string;
  addresspuprevious:string;
  dropoffpincode:string;
  public amt: string;
  public Sid: string;
  public droplatlong: string;
  slotcheck = true;
  model: NgbDateStruct;
  dateString: string;
  addresstype_pu:string;
  svcList:any;
  yourBoolean = 'servicing';
  public pickup_drop: number;
  public mobile2: string;
  public message: any = [];
  public dropadd: string;
  public disabled = false;
  editAddress = false;
  public sameasvalue: boolean = false;
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
  showEditAddress = false;
  cust_details: any = {};
  show1 = false;
  show2 = false;
  show3 = true;
  showtime = false;
  ea_respondID : string;
  message1:string;
  showstep1 = false;
  showstep2 = false;
  showstep3 = false;
  public countrycode1: string;
  brand_id: string;
  public List: any = [];
  private cityList:any;
  selectedCity:string;
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
  insurance_tied:any = [];
  north21_tied: any= []
  addressPickup:any;
  addressDropoff:any;
  insuranceFlag:boolean=false;
  public salutation:any;
  public globalsvcid:string;
  public selectedsvcid:string;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  slothour:string;
  citylist:any = [];
  public lat: number = 51.678418;
  public lng: number = 7.809007;
  public latitude: number;
  public longitude: number;
  label:string ="a";
  // public lat: number = 12.993544199999999;
  // public lng: number = 77.66068589999999;
  public zoom: number = 16;
  @ViewChild('pickupsearchplace') pickupsearchplace:ElementRef;
  @ViewChild('pickupsearchplaceFill') pickupsearchplaceFill: ElementRef;
  @ViewChild('pickupsearchplaceLandmark') pickupsearchplaceLandmark: ElementRef;
  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;
  addresstype = [
    {
      "id": "1",
      "type_of_address": "Home"
    },
    {
      "id": "2",
      "type_of_address": "Work"
    }
  ];
    


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
    private titlecasePipe:TitleCasePipe,
    private activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService, private testServ:TestserviceService,
    public ngZone: NgZone
    ) { 
      this.cityList = [];
      this.getCity();
      // this.lat= 12.993544199999999;
      // this.lng= 77.66068589999999;
    }


  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('insurance')) == "1"){
      this.insuranceFlag = true;
    }
    else{
      this.insuranceFlag = false;
    }
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.user.confirm = true;
    this.countrycode1 = "+91";
    this.getAllBrands();
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
      text: 'Select Complaints',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      maxHeight: 150
    };
    const date = new Date();
    this.model = {year: date.getUTCFullYear(),month:date.getUTCMonth() + 1,day:date.getUTCDate() };
    this.dateString = this.model.year + '-' + this.model.month + '-' + this.model.day;
    this.startDate = this.model;
    this.minDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() - 1 };
    this.maxDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() + 15};
    this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    this.getAdvisor();
    this.getCre();
    this.getcreadv();
   }

public opt1={
  headers: new HttpHeaders({'x-auth-token': sessionStorage.getItem('token'),'x-auth-user':sessionStorage.getItem('auth-user'),'Content-Type':  'application/json'})
  }

  receiveMessage($event) {
    this.message1 = $event
  }

  showLargeModal(res: any, notes: string) {
    const activeModal = this.modalService.open(BookingDetails, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Booking Details';
    activeModal.componentInstance.modalContent = res;
    activeModal.componentInstance.modalNotes = notes;
  }

  showModal(Id:number) {
    const activeModal = this.modalService.open(AddEmployee, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Employee';
    activeModal.componentInstance.modalContent = Id;
    activeModal.result.then(() => { 
      this.spinner.show();
      if(Id == 1){
        this.getCre();
      }
      else if(Id == 2){
        this.getAdvisor();
      }
    }, () => {})
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

  pickUpSearch(e){
    let autocomplete = new google.maps.places.Autocomplete(this.pickupsearchplace.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
        }
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        this.zoom = 20;
        console.log(this.latitude, this.longitude);
        console.log(autocomplete.getPlace());
      })
    });
    this.pickupsearchplaceFill.nativeElement.value = this.pickupsearchplace.nativeElement.value;
  }

  changepickupdoor(value:any){
    this.user.dropofffdoor = value;
    if (this.sameasvalue == true){
      this.user.dropofffdoor = value;
    }
  }

  onCity(id){
    this.GetSVCList(this.selectedBrand,this.user.city);
  }

  markerDragEnd(e){
    console.log(e);
  }

public getCity() {
    const reqpara1 ={
        requesttype: 'getcitylist',
      }
    const as1 = JSON.stringify(reqpara1)
    this.ServicingService.webServiceCall(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.cityList = res[0].citylist;
        }
      });
  }

  changepickupstreet(value:any){
    this.user.dropoffstreet = value;
    if (this.sameasvalue == true){
      this.user.dropoffstreet = value;
    }
  }

  changepickuparea(value:any){
    this.user.dropoffarea = value;
    if (this.sameasvalue == true){
    this.user.dropoffarea = value;
    }
  }

  changepickuplandmark(value:any){
    this.user.dropofflandmark = value;
    if (this.sameasvalue == true){
      this.user.dropofflandmark = value;
    }
  }

  changepickuppincode(value:any){
    this.user.dropoffpincode = value;
    if (this.sameasvalue == true){
      this.user.dropoffpincode = value;
    }
  }

  changepickuplatlong(value:any){
    this.user.droplatlong = value;
    if (this.sameasvalue == true){
     this.user.droplatlong = value;
    }
  }

  saverange(value: any) {
    if (this.sameasvalue == true) {
      this.user.dropoff_location = value;
      if (this.user.picklatlong) {
        this.user.dropofflatlong = this.user.picklatlong;
      }
    }
  }

  eligibiltycheck1(){
    this.spinner.show();
    const reqpara0 = {
      customerMobileNumber:this.user.mobile1,
      vehicleRegNumbe:this.registrationNumber,
      typeofservice:1
    }
    const as0 = JSON.stringify(reqpara0);
    this.http.post('https://plsuat.europassistance.in:444/checkInitialEligibility',as0,this.opt1).subscribe(
      res => {
        if (res['message'] === 'policy is not valid'){
          this.spinner.hide();
          this.getinfowithMobile();
          this.disableNext = true;
          this.showToast('Message', 'Policy Message', 'Policy is not valid');
          this.showstep3 = true;
          this.ea_respondID = "0";
        }
        else if (res['message'] === 'policy is valid'){
          this.spinner.hide();
          this.getinfowithMobile();
          this.disableNext = true;
          this.showToast('Message', 'Policy Message', 'Policy is valid');
        this.showstep2 = true;
        this.ea_respondID = res['responseId'];
        }
        else{
          this.spinner.hide();
          this.getinfowithMobile();
          this.showstep3 = true;
          this.disableNext = true;
          this.ea_respondID = "0";
        }
      },(err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.spinner.hide();
          this.getinfowithMobile();
          this.disableNext = true;
          this.ea_respondID = "0";
        }
        else {
          this.spinner.hide();
          this.getinfowithMobile();
          this.disableNext = true;
          this.ea_respondID = "0";
        }
      });
      this.getCity();
  }

  skip(){
    this.showToast('Message', 'Skip Message', 'Customer will not be eligilble for any benefits');
    this.showstep3 = true;
  }


  eligibiltycheck2(){
    const reqpara01 ={
      customerMobileNumber:this.user.mobile1,
      vehicleRegNumber:this.registrationNumber,
      policyNumber:this.user.policy,
      vin:this.user.vin,
      typeofservice:1,
      }
    const as01 = JSON.stringify(reqpara01);
    this.http.post('https://plsuat.europassistance.in:444/checkFinalEligibility',as01,this.opt1).subscribe(
        res => {
      });
  }

  EditAddress(){
    this.editAddress = true;
  }

  changeEditdropOffdoor(value:any){
    this.counter ++;
    this.editAddress = true;
    if (this.sameasvalue == true){
      this.user.pickupdoor = value;
    }
  }

  changeEditdropOffstreet(value:any){
    this.counter ++;
    this.editAddress = true;
    if (this.sameasvalue == true){
      this.user.pickupstreet = value;
    }
  }

  changeEditdropOffparea(value:any){
    this.counter ++;
    this.editAddress = true;
    if (this.sameasvalue == true){
    this.user.pickuparea = value;
    }
  }

  changeEditdropOfflandmark(value:any){
    this.counter ++;
    this.editAddress = true;
    if (this.sameasvalue == true){
      this.user.pickuplandmark = value;
    }
  }

  changeEditdropOffpincode(value:any){
    this.counter ++;
    this.editAddress = true;
    if (this.sameasvalue == true){
      this.user.pickuppincode = value;
    }
  }

  changeEditdropOfflatlong(value:any){
    this.counter ++;
    this.editAddress = true;
    if (this.sameasvalue == true){
     this.user.droplatlong = value;
    }
  }
  changeEditpickupdoor(value:any){
    this.counter ++;
    this.editAddress = true;
    this.user.dropofffdoor = value;
    console.log(this.sameasvalue);
    if (this.sameasvalue == true){
      this.user.dropofffdoor = value;
    }
  }

  changeEditupstreet(value:any){
    this.counter ++;
    this.user.dropoffstreet = value;
    this.editAddress = true;
    if (this.sameasvalue == true){
      this.user.dropoffstreet = value;
    }
  }

  changeEditpickuparea(value:any){
    this.counter ++;
    this.user.dropoffarea = value;
    this.editAddress = true;
    if (this.sameasvalue == true){
    this.user.dropoffarea = value;
    }
  }

  changeEditpickuplandmark(value:any){
    this.counter ++;
    this.editAddress = true;
    this.user.dropofflandmark = value;
    if (this.sameasvalue == true){
      this.user.dropofflandmark = value;
    }
  }

  changeEditpickuppincode(value:any){
    this.counter ++;
    this.editAddress = true;
    this.user.dropoffpincode = value;
    if (this.sameasvalue == true){
      this.user.dropoffpincode = value;
    }
  }

  changeEditpickuplatlong(value:any){
    this.counter ++;
    this.editAddress = true;
    this.user.droplatlong = value;
    if (this.sameasvalue == true){
     this.user.droplatlong = value;
    }
  }

  getAllBrands() {
    const reqpara1 ={
        requesttype: 'getallbrands',
        svcid:this.svcid
      }
    const as1 = JSON.stringify(reqpara1)
    this.ServicingService.webServiceCall(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.brands = res[0].allbrands;
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

  some(value) {
    this.amb = value;
}

  onItemSelect(item: any) {}

  OnItemDeSelect(item: any) {}

  onSelectAll(items: any) {}

  onDeSelectAll(items: any) {}


  onSelectModel(modelId) {
    for (let i = 0; i < this.Models.length; i++) {
      if (this.Models[i].model_id == modelId) {
        this.selectedModel = this.Models[i];
      }
    }
    this.getVariants(this.selectedModel);
  }

  onSelectVariant(VariantId) {
    for (let i = 0; i < this.Models.length; i++) {
      if (this.Variant[i].variant_id == VariantId) {
        this.selectedVariant = this.Variant[i];
      }
    }
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
      }
    });
  }

  getModelds(ModelId) {
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
        this.Models = res[0].models;
        if(this.Models.length === 1){
          var model_id = this.Models[0].model_id;
          this.getVariants(model_id);
        }
        else{}
     }
    });
  }

  getcreadv() {
    const reqpara4 = {
      requesttype: 'getcreadv',
      svcid:this.svcid
    }
    const as4 = JSON.stringify(reqpara4)
    this.ServicingService.webServiceCall(as4).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Svclist = res[0].svclist[0].id;
        this.creName = res[1].cre;
        this.service_advisor = res[2].advisor
        this.itemList = res[3].complaints
      }
    });
  }

 getSlot(Date: string) {
    this.showtime = true;
    if (this.yourBoolean === 'servicing' || this.yourBoolean === 'onlypickup') {
      this.pickup_drop = 0;
    }
    else {
      this.pickup_drop = 1;
    }
    
    if(this.user.city){
      var cityId = this.user.city;
      console.log(cityId);
    }
    else{
      cityId = JSON.parse(sessionStorage.getItem('city_id'));
      console.log(cityId);
    }
    if (Date) {
      const reqpara5 = {
        requesttype: 'getslotsv2city',
        reqdate: Date,
        pickup_drop: this.pickup_drop,
        type_service:this.pickup_drop,
        cityid:cityId
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
          }
        }
      });
    }
  }

  doPickup() {
    if (this.dateString.length > 0) {
      const reqpara10 = {
        requesttype: 'getslots',
        reqdate: this.dateString,
        pickup_drop: 0,
        svcid:this.svcid
      }
      const as10 = JSON.stringify(reqpara10)
      this.ServicingService.webServiceCall(as10).subscribe(res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.Slot = res[0],
          this.slot = res[0].slots;
        }
      });
    }
  }

  doDrop() {
    if (this.dateString.length > 0) {
      const reqpara11 = {
        requesttype: 'getslots',
        reqdate: this.dateString,
        pickup_drop: 1,
        svcid:this.svcid
      }
      const as11 = JSON.stringify(reqpara11)
      this.ServicingService.webServiceCall(as11).subscribe(res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.Slot = res[0],
          this.slot = res[0].slots;
        }
      });
    }
    else{}
  }

  onBlurMethod(value: string) {
    this.registrationNumber = value.toUpperCase()
  }


  onSelectBrand(brandsId) {
   this.selectedBrand = null;
   for (let i = 0; i < this.brands.length; i++) {
    if (this.brands[i].brand_id == brandsId) {
       this.selectedBrand = this.brands[i].brand_id;
     }
   }
   this.getModelds(this.selectedBrand);
 }

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model = date;
      this.dateString = this.ngbDateParserFormatter.format(date);
    }
    this.show3 = true;
    if(this.amb == true || this.datecheck == true){ }
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

  // at select pickup dropdown
  onSelectPickup($event,id){
    console.log(this.sameasvalue);
    console.log(this.address);
    var currentAddressPickup = this.address[$event];
    if(this.sameasvalue == true){
      if(this.user.addresspu){
        console.log(this.user.addresspu);
        for(let i = 0;i < this.address.length; i++){
          if(this.user.addresspu == this.address[i].address_id){
            this.user.addressdu = this.address[i].address_id ;
            // console.log(this.address[i].address_id);
            // console.log(this.user.addressdu);
            // this.user.addresspu = this.addressPickup;
            this.user.dropofffdoor = currentAddressPickup.doornumber;
            this.user.dropoffstreet = currentAddressPickup.street;
            this.user.dropoffarea = currentAddressPickup.area;
            this.user.dropofflandmark = currentAddressPickup.landmark;
            this.user.dropoffpincode = currentAddressPickup.pincode;
            this.user.droplatlong = currentAddressPickup.latitude + ',' + currentAddressPickup.longitude;
            for(let i = 0; i < this.addresstype.length;i ++){
              if(this.addresstype[i].id == id){
                this.user.addresspu = this.addresstype[i].id;
                this.user.addresstypedu = this.addresstype[i].id;
              }
            }
          }
        }
      }
    }
    this.user.addresspu = this.addressPickup;
    this.user.pickupdoor = currentAddressPickup.doornumber;
    this.user.pickupstreet = currentAddressPickup.street;
    this.user.pickuparea = currentAddressPickup.area;
    this.user.pickuplandmark = currentAddressPickup.landmark;
    this.user.pickuppincode = currentAddressPickup.pincode;
    this.user.picklatlong = currentAddressPickup.latitude + ',' + currentAddressPickup.longitude;
    for(let i = 0; i < this.addresstype.length;i ++){
      if(this.addresstype[i].id == id){
        this.user.addresspu = this.addresstype[i].id;
        this.user.addresstypepu = this.addresstype[i].id;
      }
    }
  }

   // at select dropoff dropdown
  onSelectDropoff($event,id){
    var currentAddressDropoff = this.address[$event];
    this.user.dropofffdoor = currentAddressDropoff.doornumber;
    this.user.dropoffstreet = currentAddressDropoff.street;
    this.user.dropoffarea = currentAddressDropoff.area;
    this.user.dropofflandmark = currentAddressDropoff.landmark;
    this.user.dropoffpincode = currentAddressDropoff.pincode;
    this.user.droplatlong = currentAddressDropoff.latitude + ',' + currentAddressDropoff.longitude;
    for(let i = 0; i < this.addresstype.length;i ++){
      if(this.addresstype[i].id == id){
        this.user.addresspu = this.addresstype[i].id;
        this.user.addresstypepu = this.addresstype[i].id;
      }
    }
  }


  getinfowithMobile(){
    const reqpara112 = {
      requesttype:'getcustinfo_mobilev2',
      mobilenumber:this.user.mobile1,
      svcidvar:this.svcid,
      vehnumber:this.registrationNumber
    }
    const as112 = JSON.stringify(reqpara112);
    this.ServicingService.webServiceCall(as112).subscribe(data => {
      if (data[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.customer = data;
        this.showstep3 = true;
        if (this.customer[1].custinfo[0].hasOwnProperty('no_records')) {
          this.cust_details.mobile = this.user.mobile1,
          this.showAddress = true;
        }
        else {
          this.address = this.customer[2].addresses;
          this.cust_details = this.customer[1].custinfo[0];
         if(this.address[0].hasOwnProperty('no_records')){
            this.showAddress = true;
          }
          else{
              this.showAddressDropDown = true;
              this.showEditAddress = true;
              this.addressPickup = this.address[0];
              this.user.addresspu = this.addressPickup.address_id;
              this.user.pickupdoor = this.addressPickup.doornumber;
              this.user.pickupstreet = this.addressPickup.street;
              this.user.pickuparea = this.addressPickup.area;
              this.user.pickuplandmark = this.addressPickup.landmark;
              this.user.pickuppincode = this.addressPickup.pincode;
              for(let i = 0; i < this.addresstype.length;i ++){
                if(this.addresstype[i].type_of_address == this.addressPickup.type_of_address){
                  // this.user.addresspu = this.addresstype[i].id;
                  this.user.addresstypepu = this.addresstype[i].id;
                }
              }
              this.user.picklatlong = this.addressPickup.latitude + ',' +this.addressPickup.longitude;
              this.user.address_typepu = this.addressPickup.address_id;
              this.addressDropoff = this.address[0];
                if(this.addressDropoff != undefined){
                  this.user.addressdu = this.addressDropoff.address_id;
                  this.user.dropofffdoor = this.addressDropoff.doornumber;
                  this.user.dropoffstreet = this.addressDropoff.street;
                  this.user.dropoffarea = this.addressDropoff.area;
                  this.user.dropofflandmark = this.addressDropoff.landmark;
                  this.user.dropoffpincode = this.addressDropoff.pincode;
                  this.user.droplatlong = this.addressDropoff.latitude + ',' +this.addressDropoff.longitude;
                  this.user.address_typedu = this.addressDropoff.address_id;
                  for(let i = 0; i < this.addresstype.length;i ++){
                    if(this.addresstype[i].type_of_address == this.addressDropoff.type_of_address){
                      // this.user.addressdu = this.addresstype[i].id;
                      this.user.addresstypedu = this.addresstype[i].id;
                    }
                  }
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
          }
      }
      this.carinfo = this.customer[4].carinfo[0];
      console.log( this.carinfo);
      if(this.carinfo.hasOwnProperty('no_records')){
        this.selectedBrand  = sessionStorage.getItem('brandid');
         console.log(this.selectedBrand )
         this.getModelds(this.selectedBrand );
      }
      else{
        this.selectedBrand = this.carinfo.brand_id;
        this.getModelds(this.selectedBrand);
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

  secondcheck() {
    this.show2 = true;
  }

  sameas(value) {
    this.sameasvalue = value;
    console.log(this.sameasvalue);
    if (value == true) {
      if(this.user.addresspu){
        console.log(this.user.addresspu);
        console.log(this.address);
        for(var i = 0;i < this.address.length; i++){
          console.log(this.address[i].address_id,"adress_id")
          if(this.user.addresspu == this.address[i].address_id){
            this.user.addressdu = this.address[i].address_id ;
          }
        }
      }
      if (this.user.pickupdoor) {
        this.user.dropofffdoor = this.user.pickupdoor;
        if (this.user.pickupstreet) {
          this.user.dropoffstreet = this.user.pickupstreet;

        }
        if(this.user.pickuparea){
          this.user.dropoffarea = this.user.pickuparea;
        }
        if(this.user.pickuplandmark){
          this.user.dropofflandmark = this.user.pickuplandmark;
        }
        if(this.user.pickuppincode){
          this.user.dropoffpincode = this.user.pickuppincode;
        }
        if(this.user.picklatlong){
          this.user.droplatlong = this.user.picklatlong;
        }
      // console.log(this.user.addresstypepu)
        if(this.user.addresstypepu){
          for(let j = 0 ; j < this.addresstype.length;j++){
            if(this.addresstype[j].id == this.user.addresstypepu){
              this.user.addresstypedu = this.addresstype[j].id ;
              // console.log(this.user.addresstypedu);
            }
          }
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

  check(value: string,time:string) {
    this.slothour = value;
    this.slot_time = time;
    this.slotcheck = false;
  }


  getCre(){
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
        this.cre = res[0].users;
        this.spinner.hide();
      }
    });
  }

  sameaddresstype(event){
    console.log(event);
    if(this.sameasvalue){
      console.log(event);
    }
  }

  GetSVCList(brand,city){
    var cityId = JSON.parse(sessionStorage.getItem('city_id'));
    const reqpara1 = {
           requesttype: 'getsvclist_city_brand',
            cityid: city,
            brandid: brand
         }
      const SvcList = JSON.stringify(reqpara1)
      this.ServicingService.webServiceCall(SvcList).subscribe
       (res => {
          if(res[0].login === 0){
            sessionStorage.removeItem('currentUser');
            this.router.navigate(['/auth/login']);
          }
          else{
            this.svcList=res[0].svclist;
            for(var i = 0; i < res[0].svclist.length; i++ ){
              if(res[0].svclist[i].is_tied == '1'){
              this.north21_tied.push(res[0].svclist[i]);
              res[0].svclist[i].associated = "21North";
            }
            else{
              this.insurance_tied.push(res[0].svclist[i]);
              res[0].svclist[i].associated = "Insurance";
            }
        }
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
        this.serviceadv = res[0].users;
      }
    });
  }


  onSubmit(f: NgForm) {
    this.disabled = true;
    if(f.value.svclist){
      this.selectedBrand = f.value.svclist;
    }
    this.registrationNumber = f.value.num.toUpperCase();
    if(this.showAddressDropDown){
      if(this.editAddress){
        if(f.value.pickupdoor){
          this.pickupdoor = f.value.pickupdoor;
        }
        else {
          this.pickupdoor = f.value.dropofffdoor;
        }
        if(f.value.pickupstreet){
          this.pickupstreet = f.value.pickupstreet;
        }
        else{
          this.pickupstreet = f.value.dropoffstreet;
        }
        if(f.value.pickuparea){
          this.pickuparea = f.value.pickuparea;
        }
        else{
          this.pickuparea = f.value.dropoffarea;
        }
        if(f.value.pickuplandmark){
          this.pickuplandmark = f.value.pickuplandmark;
        }
        else if(f.value.dropofflandmark){
          this.pickuplandmark = f.value.dropofflandmark;
        }
        else{
          this.pickuplandmark = "0";
        }
        if(f.value.pickuppincode){
          this.pickuppincode = f.value.pickuppincode;
        }
        else if(f.value.dropoffpincode){
          this.pickuppincode = f.value.dropoffpincode;
        }
        else{
          this.pickuppincode ="0";
        }
        if(f.value.dropoffarea){
          this.dropoffarea = f.value.dropoffarea ;
        }
        else{
          this.dropoffarea = f.value.pickuparea ;
        }
        if(f.value.dropofffdoor){
          this.dropofffdoor = f.value.dropofffdoor;
        }
        else{
          this.dropofffdoor = f.value.pickupdoor;
        }
        if(f.value.dropoffpincode){
          this.dropoffpincode = f.value.dropoffpincode;
        }
        else if (f.value.pickuppincode){
          this.dropoffpincode =  f.value.pickuppincode;
        }
        else{
          this.dropoffpincode = "0";
        }
        if(f.value.dropofflandmark){
          this.dropofflandmark = f.value.dropofflandmark;
        }
        else if (f.value.pickuplandmark){
          this.dropofflandmark =  f.value.pickuplandmark;
        }
        else{
          this.dropofflandmark = "0";
        }
        if(f.value.dropoffstreet){
          this.dropoffstreet = f.value.dropoffstreet;
        }
        else{
          this.dropoffstreet = f.value.pickupstreet;
        }
        this.addressdoprevious = "0";
        this.addresspuprevious = "0";
        if(f.value.addresstypepu){
          this.addresstype_pu = this.user.addresstypepu;
        }
        else{
          this.addresstype_pu = this.user.addresstypedu
        }
        if(f.value.addresstypedu){
          this.addresstype_do = this.user.addresstypedu;
        }
        else{
          this.addresstype_do= this.user.addresstypepu;
        }
        if (f.value.picklatlong) {
          let x = f.value.picklatlong.split(/[ ,;]+/);
          this.pikup_lat = x[0];
          this.pikup_long = x[1];
        }
        else{
          if(f.value.droplatlong){
            let b = f.value.droplatlong.split(/[ ,;]+/);
            this.pikup_lat= b[0];
            this.pikup_long = b[1];
          }
          else{
            this.pikup_lat = "0";
            this.pikup_long = "0";
          }
         
          }
      
        if(f.value.droplatlong){
          let y = f.value.droplatlong.split(/[ ,;]+/);
          this.dropoff_lat = y[0];
          this.dropoff_long = y[1];
        }
        else {
          if(f.value.picklatlong){
            let c = f.value.picklatlong.split(/[ ,;]+/);
            this.pikup_lat = c[0];
            this.pikup_long = c[1];
          }
          else{
            this.dropoff_lat = "0";
          this.dropoff_long = "0";
          }
          
        }
      }
      
      else{
        // this.addressdoprevious = f.value.addresspu;
        // this.addresspuprevious = f.value.addressdu;
        if(f.value.addresspu){
          this.addresspuprevious = f.value.addresspu;
        }
        else{
          this.addresspuprevious =  f.value.addressdu;
        }
        if( f.value.addressdu){
          this.addressdoprevious =  f.value.addressdu;
        }
        else{
          this.addressdoprevious =   f.value.addresspu;
        }
        this.pickupdoor = "0";
        this.pickupstreet = "0";
        this.pickuparea = "0";
        this.pickuplandmark = "0";
        this.pickuppincode = "0";
        this.pikup_lat = "0";
        this.pikup_long = "0";
        this.dropoffarea = "0";
        this.dropofffdoor = "0";
        this.dropoffpincode = "0";
        this.dropofflandmark = "0";
        this.dropoffstreet = "0";
        this.dropoff_long = "0";
        this.dropoff_lat = "0";
        if(f.value.addresspu){
          this.addresstype_pu = this.user.addresspu;
        }
        else{
          this.addresstype_pu = this.user.addressdu
        }
        if(f.value.addressdu){
          this.addresstype_do = this.user.addressdu;
        }
        else{
          this.addresstype_do= this.user.addresspu;
        }
      }
    }
    if(this.showAddress){
      if(f.value.pickupdoor){
        this.pickupdoor = f.value.pickupdoor;
        this.addresspuprevious = "0";
      }
      else{
        this.pickupdoor = f.value.dropofffdoor;
        this.addresspuprevious = "0";
      }
  
      if(f.value.pickupstreet){
        this.pickupstreet = f.value.pickupstreet;
        this.addresspuprevious = "0";
      }
      else{
        this.pickupstreet = f.value.dropoffstreet;
        this.addresspuprevious = "0";
      }
  
      if(f.value.pickuparea){
        this.pickuparea = f.value.pickuparea;
        this.addresspuprevious = "0";
      }
      else{
        this.pickuparea = f.value.dropoffarea;
        this.addresspuprevious = "0";
      }
      if (f.value.picklatlong) {
        let x = f.value.picklatlong.split(/[ ,;]+/);
        this.pikup_lat = x[0];
        this.pikup_long = x[1];
      }
      else{
        if (f.value.droplatlong){
          let y = f.value.droplatlong.split(/[ ,;]+/);
          this.pikup_lat = y[0];
          this.pikup_long = y[1];
        }
        else{
          this.pikup_lat = "0";
          this.pikup_long = "0";
        }
       } 
      if(f.value.pickuplandmark){
        this.pickuplandmark = f.value.pickuplandmark;
        this.addresspuprevious = "0";
      }
      else if(f.value.dropofflandmark){
        this.pickuplandmark = f.value.dropofflandmark;
        this.addresspuprevious = "0";
      }
      else{
        this.pickuplandmark = "0";
        this.addresspuprevious = "0";
      }
      if(f.value.addresstypepu){
        this.addresstype_pu = f.value.addresstypepu;
        this.addresspuprevious = "0";
      }
      else{
        this.addresstype_pu = f.value.addresstypedu;
        this.addresspuprevious = "0";
      }
      if(f.value.addresstypedu){
        this.addresstype_do = f.value.addresstypedu;
        this.addresspuprevious = "0";
      }
      else{
        this.addresstype_do = f.value.addresstypedu;
        this.addresspuprevious = "0";
      }
      if(f.value.pickuppincode){
        this.pickuppincode = f.value.pickuppincode;
        this.addresspuprevious = "0";
      }
      else if(f.value.dropoffpincode){
        this.pickuppincode = f.value.dropoffpincode;
        this.addresspuprevious = "0";
      }
      else{
        this.pickuppincode = "0";
        this.addresspuprevious = "0";
      }
      if(f.value.dropoffarea){
        this.dropoffarea = f.value.dropoffarea ;
        this.addressdoprevious = "0";
      }
      else{
        this.dropoffarea = f.value.pickuparea ;
        this.addressdoprevious = "0";
      }
      if(f.value.dropofffdoor){
        this.dropofffdoor = f.value.dropofffdoor;
        this.addressdoprevious = "0";
      }
      else{
        this.dropofffdoor = f.value.pickupdoor;
        this.addressdoprevious = "0";
      }
      if(f.value.dropoffpincode){
        this.dropoffpincode = f.value.dropoffpincode;
        this.addressdoprevious = "0";
      }
      else if(f.value.pickuppincode){
        this.dropoffpincode =f.value.pickuppincode;
        this.addressdoprevious = "0";
      }
      else{
        this.dropoffpincode = "0";
        this.addressdoprevious = "0";
      }
      if(f.value.dropofflandmark){
        this.dropofflandmark = f.value.dropofflandmark;
        this.addressdoprevious = "0";
      }
      else if(f.value.pickuplandmark){
        this.dropofflandmark =f.value.pickuplandmark;
        this.addressdoprevious = "0";
      }
      else{
        this.dropofflandmark = "0";
        this.addressdoprevious = "0";
      }
      if(f.value.dropoffstreet){
        this.dropoffstreet = f.value.dropoffstreet;
        this.addressdoprevious = "0";
      }
      else{
        this.dropoffstreet = f.value.pickupstreet;
        this.addressdoprevious = "0";
      }
      if(f.value.addresstypedu){
        this.addresstype_do = f.value.addresstypedu;
        this.addresspuprevious = "0";
      }
      else{
        this.addresstype_do = f.value.addresstypepu;
        this.addresspuprevious = "0";
      }
      if(f.value.droplatlong){
        let y = f.value.droplatlong.split(/[ ,;]+/);
        this.dropoff_lat = y[0];
        this.dropoff_long = y[1];
      }
      else{
        if(f.value.picklatlong){
          let a = f.value.picklatlong.split(/[ ,;]+/);
          this.dropoff_lat = a[0];
          this.dropoff_long = a[1];
        }
        else{
          this.dropoff_lat = "0";
          this.dropoff_long = "0";
        }
      }
    }
    if (f.value.confirm) {
      this.isconfirm = "1";
    }
    else {
      this.isconfirm = "0";
    }
   
    if (this.user.time) {
      this.slot_time = this.user.time + ':00'
    }
    else {
      if (!this.slot_time) {
      }
    }

    if (f.value.mobile2) { 
      this.mobile2 = f.value.mobile2; 
    }
    else {
      this.mobile2 = "0";
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

    if (this.slot_time) {}
    else {
      this.slot_time = "0";
    }
    
    if (this.yourBoolean === 'servicing' || this.yourBoolean === 'onlypickup') {
      this.pickup_drop = 0;
    }
    else {
      this.pickup_drop = 1;
    }

    if(f.value.ServiceAdvisor){
      this.advisorId = f.value.ServiceAdvisor;
    }
    else{
      this.advisorId="0";
    }
  
      // console.log(this.selectedItems);
      if (this.selectedItems === null ) {
        this.complaint_id = ["0"];
      }
      else if (this.selectedItems.length > 0){
        for (var i = 0; i < this.selectedItems.length; i++) {
          this.complaint_id.push(this.selectedItems[i].id);
        }
      }  
      else{
        this.complaint_id = ["0"];
      }
      if(this.user.city){
        this.cityID = this.user.city;
      }
      else{
        this.cityID = JSON.parse(sessionStorage.getItem('city_id'));
      }
  
    if(this.slot_time != "0"){
    const reqpara6 = {
      requesttype: "createbookingv3",
      vehnumber: this.registrationNumber,
      city: this.cityID,
      vehbrand: this.selectedBrand,
      carmodelid: f.value.model,
      carsubmodelid: f.value.variant,
      customername: f.value.salutation1 +'.'+this.titlecasePipe.transform(f.value.Cus_name),
      customermobile1: f.value.mobile1,
      customermobile2: this.mobile2,
      customeremail: f.value.email,
      queuetime: this.dateString + ' ' + this.slot_time,
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
      servicetype:this.pickup_drop,
      advisorid:this.advisorId,
      creid:f.value.creName,
      assignambassador:this.amb,
      selectedsvcid:this.svcid,
      cfeeclient:this.amt,
      notes:this.notes,
      isconfirmed:this.isconfirm,
      eavalidcode:this.ea_respondID,
      complaint:this.complaint_id
     
    };

    const ua = JSON.stringify(reqpara6);
    // console.log(ua);
    this.ServicingService.webServiceCall(ua).subscribe(data => {
      if (data[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      } else if(data[0].hasOwnProperty('queue')) {
        this.message = data[0].queue,
          this.disabled = false;
        this.showLargeModal(this.message[0], this.notes);
        this.slot_time = "0";
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.showstep2 = false;
        this.showstep3 = false;
        this.showAddressDropDown = false;
        this.showAddress = false;
        this.pickup_drop = 0;
        this.counter = 0;
        this.slot = [];
        this.sameasvalue = true;
        f.reset();
        this.countrycode1 = "+91";
        this.dateString = null;
        this.yourBoolean = 'servicing';
        this.user.salutation = 'Mr';
        this.user.confirm = true;
        this.editAddress = false;
        this.complaint_id = [];
        this.datecheck = false;
        this.showtime = false;
        this.disableNext = false;
        this.user.mobile1 = null;
      }
      else if(data[0].hasOwnProperty('error')){
        this.showToast('alert', 'Alert', 'Sorry !! Something went wrong');
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
         
        }
        else {
          
        }
      }
    );
  }
  else {
    this.showToast('alert', 'Message', 'Please select Slot and date');
  }
  }

}

interface marker {
  name?:string;
  lat:number;
  lng:number;
  draggable:boolean;
}

