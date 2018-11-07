import { Component, OnInit,ViewChild, ElementRef, NgZone, asNativeElements } from '@angular/core';
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
import { DecimalPipe} from '@angular/common';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var google: any;
@Component({
  selector: 'app-servicing',
  templateUrl: './servicing.component.html',
  styleUrls: ['./servicing.component.scss'],
})


export class ServicingComponent implements OnInit {
  @ViewChild('mobile1') mob1 :ElementRef;
  public gMaps: GoogleMapsAPIWrapper
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
  public addrKeys: string[];
  public addr: object;
  advisorId:string;
  mobileLength:boolean = true;
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
  public slot_time: string;
  public notes: string;
  droplocation:string;
  showAddress = false;
  disableNext = true;
  googlemapShow:boolean = false;
  showAddressDropDown = false;
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
  BookingBtn = false;
  slothour:string;
  citylist:any = [];
  label:string ="a";
  x:number;
  y:number;
  a:number;
  b:number;
  public zoom: number = 16;
  addresspuprevious ="0";
  googleaddresspu = "0";
  postaladdresspu:string;
  landmarkpu:string;
  pickuplat:string;
  pickuplong:string;
  addressdoprevious = "0";
  googleaddressdo = "0";
  postaladdressdo:string;
  googlepickuplat:number;
  googlepickuplong:number;
  googledropofflat:number;
  googledropofflong:number;
  drag_pickup_lat:number;
  drag_pickup_lng:number;
  drag_drop_lat:number;
  drag_drp_lng:number;
  googleMapPickupFlag:boolean = false;
  googleMapDropoffFlag:boolean = false;
  landmarkdo:string;
  addresstypepu = "0";
  addresstypedo = "0";
  droplat:string;
  pickupSelected = false;
  DropoffSelected = false;
  droplong:string;
  latPickup:number;
  lngPickup:number;
  latDrop:number;
  lngDrop:number;
  map:string;
  LatLngObj: any;
  ifClicked: boolean;
  drag_pickup_add:string = "0";
  drag_dropoff_add:string = "0";
  ma1:any;
  @ViewChild('pickupSavedRef') pickupSavedRef: ElementRef;
  @ViewChild('pickupmap') mappickup: ElementRef;
  @ViewChild('pickupmarker') pickupmarker: ElementRef;
  @ViewChild('pickupsearchplace') pickupsearchplace:ElementRef;
  @ViewChild('pickupsearchplaceFill') pickupsearchplaceFill: ElementRef;
  @ViewChild('pickupsearchplaceLandmark') pickupsearchplaceLandmark: ElementRef;
  @ViewChild('dropoffsearchplace') dropoffsearchplace: ElementRef;
  ifSameAsPickUp: boolean;
  dropOffOnly: boolean;
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

public iconurl: String;
public setDrag: Boolean;
  constructor(private router: Router,
    private toasterService: ToasterService,
    private ServicingService: ServicingService,
    private decimalpipe:DecimalPipe,
    private http: HttpClient,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private modalService: NgbModal,
    private titlecasePipe:TitleCasePipe,
    private activeModal: NgbActiveModal,
    private mapsAPILoader: MapsAPILoader,
    private spinner: NgxSpinnerService, private testServ:TestserviceService,
    public ngZone: NgZone
    ) { 
      this.cityList = [];
      this.getCity();
      this.ifSameAsPickUp = false;
      this.dropOffOnly = false;
      this.ifClicked = false;
      this.iconurl = './../../../assets/images/image.png';
      this.setDrag = true;
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


  pickUpMapReady(e, val){
    console.log("I am called",e);
    var map1 = e;
    var that = this;
    var value = val;
    map1.addListener("dragend", function (e, val) {
      let input = that.LatLngObj.lat + ',' + that.LatLngObj.lng;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])
    };
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          // pickup
          if(value == 3){
            that.latPickup = that.LatLngObj.lat;
            that.lngPickup = that.LatLngObj.lng;
            that.pickupsearchplace.nativeElement.value = results[0].formatted_address;
            that.drag_pickup_add = results[0].formatted_address;
            sessionStorage.setItem('pickup_add_drag',results[0].formatted_address);
            sessionStorage.setItem('pickup_lat_drag',that.LatLngObj.lat);
            sessionStorage.setItem('pickup_lng_drag',that.LatLngObj.lng);
            that.drag_pickup_lat = that.LatLngObj.lat;
            that.drag_pickup_lng = that.LatLngObj.lng;
          }
          // drop off
         else if (value == 4){
          that.latDrop = that.LatLngObj.lat;
          that.lngDrop = that.LatLngObj.lng;
          that.dropoffsearchplace.nativeElement.value = results[0].formatted_address;
          that.googleaddressdo = results[0].formatted_address;
          this.drag_dropoff_add = results[0].formatted_address;
          sessionStorage.setItem('dropoff_add_drag',results[0].formatted_address);
          sessionStorage.setItem('dropoff_lat_drag',that.LatLngObj.lat);
          sessionStorage.setItem('dropoff_lng_drag',that.LatLngObj.lng);
         }
         
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    });
  }

  centerChang(ev,value) {
    this.LatLngObj = ev;
           // pickup
           if(value == 3){
            this.x = ev.lat;
            this.y = ev.lng;
            console.log("pickup",ev)
            sessionStorage.setItem('pickup_lat_drag',ev.lat);
            sessionStorage.setItem('pickup_lng_drag',ev.lng);
          }
          // drop off
         else if (value == 4){
          this.a = ev.lat;
          this.b = ev.lng;
          console.log("dropff",ev)
          sessionStorage.setItem('dropoff_lat_drag',ev.lat);
          sessionStorage.setItem('dropoff_lng_drag',ev.lng);
         }
  }

  //  protected mapReady2(evt) {
	// 	this.ma1 = evt;
	// 	console.log(document.getElementById("pickUpMap"));
	// 	console.log("thismap4", this.ma1);
	// 	console.log('this.mappickup', this.mappickup);

	// 	this.mappickup.centerChange.subscribe(map => {
	// 		// console.log(map);
	// 		let latpick = this.latPickup;
	// 		let lngpick = this.lngPickup;
			
	// 		this.ma1.addListener('dragend', function(){
	// 			console.log('enterder dragend');
	// 			this.setCenter({
	// 				latpick: map.lat,
	// 				lngpick: map.lng
	// 			});
	// 		});
	// 	});
	// }

   mapReady(evt) {
    console.log("map ready",evt);
     this.ma1 = evt;
     console.log("lat",this.ma1.center.lat());
    }

    centerChange(ev) {
      var me = this;
      console.log("centre change called");
      // me.gMaps.setCenter({ lat:ev.lat,lng:ev.lng});
    }

  sameAsPickup(){ }

  sameAsPickUpAdd(e){
    this.dropOffOnly = false;
    this.ifSameAsPickUp = !this.ifSameAsPickUp;
  }

  mapClk(ev) {
    console.log('clicked map');
    // console.log(ev);
  }



  setAddress(addrObj,service_type) {
    if(service_type == 'pickup'){
      this.latPickup = addrObj.lat;
      this.lngPickup = addrObj.long;
      this.googlepickuplat = addrObj.lat;
      this.googlepickuplong = addrObj.long;
      this.googleaddresspu = addrObj.formatted_address;
    }
   else{
     this.latDrop = addrObj.lat;
     this.lngDrop = addrObj.long;
    this.googledropofflat = addrObj.lat;
    this.googledropofflong = addrObj.long;
    this.googleaddressdo = addrObj.formatted_address;
   }
    this.ngZone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

  updateLocClk(el) {
    console.log(el);
  }
  
  markerDragEndd(ev,val) {
    let input = ev.coords.lat + ',' + ev.coords.lng;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])
    };
    var geocoder = new google.maps.Geocoder;
    let me = this;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          console.log(results[0].formatted_address);
          if(val == 3){
            me.pickupsearchplace.nativeElement.value = results[0].formatted_address;
            me.drag_pickup_add = results[0].formatted_address;
            sessionStorage.setItem('pickup_add_drag',results[0].formatted_address);
            sessionStorage.setItem('pickup_lat_drag',ev.coords.lat);
            sessionStorage.setItem('pickup_lng_drag',ev.coords.lng);
            me.drag_pickup_lat = ev.coords.lat;
            me.drag_pickup_lng = ev.coords.lng;
          }
         else if (val == 4){
          me.dropoffsearchplace.nativeElement.value = results[0].formatted_address;
          me.googleaddressdo = results[0].formatted_address;
          this.drag_dropoff_add = results[0].formatted_address;
          sessionStorage.setItem('dropoff_add_drag',results[0].formatted_address);
          sessionStorage.setItem('dropoff_lat_drag',ev.coords.lat);
          sessionStorage.setItem('dropoff_lng_drag',ev.coords.lng);
         }
         
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
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
    (<HTMLInputElement>document.getElementById('mobile1')).disabled = true;
    (<HTMLInputElement>document.getElementById('num')).disabled = true;
    document.getElementById("num_label").classList.add("disabled_label");
    document.getElementById("num_label").style.opacity = "1";
    document.getElementById("mobile_label").classList.add("disabled_label");
    document.getElementById("mobile_label").style.opacity = "1";
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
          this.mobileLength = true;
          this.showToast('Message', 'Policy Message', 'Policy is not valid');
          this.showstep3 = true;
          this.ea_respondID = "0";
        }
        else if (res['message'] === 'policy is valid'){
          this.spinner.hide();
          this.getinfowithMobile();
          this.disableNext = true;
          this.mobileLength = true;
          this.showToast('Message', 'Policy Message', 'Policy is valid');
        this.showstep2 = true;
        this.ea_respondID = res['responseId'];
        }
        else{
          this.spinner.hide();
          this.getinfowithMobile();
          this.showstep3 = true;
          this.disableNext = true;
          this.mobileLength = true;
          this.ea_respondID = "0";
        }
      },(err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.spinner.hide();
          this.getinfowithMobile();
          this.disableNext = true;
          this.mobileLength = true;
          this.ea_respondID = "0";
        }
        else {
          this.spinner.hide();
          this.getinfowithMobile();
          this.disableNext = true;
          this.mobileLength = true;
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
    this.googleMapDropoffFlag  = false;
    this.googleMapPickupFlag = false;
    console.log(this.yourBoolean);
    if(this.yourBoolean === 'onlypickup'){
        this.ifSameAsPickUp = false;
        this.dropOffOnly = false;
        console.log('only pickup');
    }
    else if(this.yourBoolean === 'servicing'){
      this.ifSameAsPickUp = false;
        this.dropOffOnly = false;
    }
    else{
      this.ifSameAsPickUp = false;
      console.log('pickup');
    }
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
    if(this.yourBoolean === 'onlypickup'){
      this.ifSameAsPickUp = false;
      console.log('only pickup');
  }
  else{
    this.ifSameAsPickUp = false;
    console.log('pickup');
  }
    this.googleMapDropoffFlag  = false;
    this.googleMapPickupFlag = false;
    this.dropOffOnly = true;
    console.log(this.dropOffOnly);
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

  ShowMapInSavedAddPickup(ev){
    this.googleMapPickupFlag = true;
    this.pickupSelected = false;
    this.googlemapShow = !this.googlemapShow;
    for (var i =0; i<= document.getElementsByClassName("savedAddBtn").length; i++){
      document.getElementsByClassName("savedAddBtn")[i].classList.remove('borderCls');
    }
  }

  removeActiveBorder(el,index){
      var els = el.parentElement.children

      for(var i=0;i<els.length;i++)
      {
        els[i].classList.remove('borderCls');
      }
    }

  ShowMapInSavedAddDropoff(){
    this.googleMapDropoffFlag = true;
    this.DropoffSelected = false;
    this.googlemapShow = !this.googlemapShow;
    for (var i =0; i<= document.getElementsByClassName("savedAddBtn").length; i++){
      document.getElementsByClassName("savedAddBtn")[i].classList.remove('borderCls');
    }
  }

  SelectSavedPickupAddress(i,x, ev){
    if(ev.target.classList.contains('savedAddBtn'))
    {
      this.removeActiveBorder(ev.target,x);
      ev.target.classList.add('borderCls');
    }
    else if(ev.target.parentElement.classList.contains('savedAddBtn'))
    {
      this.removeActiveBorder(ev.target.parentElement,x);
      ev.target.parentElement.classList.add('borderCls');
    }
    else{
      console.log('Click');
    }
    console.log(x);
    if (x==x) {
      this.ifClicked = true;
    }
    this.ifClicked = true;
    this.pickupSelected = true;
    this.googleMapPickupFlag = false;
    this.postaladdresspu = i.postal_address;
    this.googleaddresspu = i.google_address;
    console.log("postal address",this.postaladdresspu);
    this.pickuplat = i.latitude;
    this.pickuplong = i.longitude;
    this.landmarkpu = i.land_mark;
    console.log(this.landmarkpu);
    this.addresspuprevious = i.address_id;
    for(var j = 0;j<this.addresstype.length;j++){
      if(this.addresstype[j].type_of_address === i.type_of_address){
        this.addresstypepu = this.addresstype[j].id;
        console.log(this.addresstypepu);
      }
    }
  }

SelectSavedDropoffAddress(i,x, ev){
  if(ev.target.classList.contains('savedAddBtn'))
  {
    this.removeActiveBorder(ev.target,x);
    ev.target.classList.add('borderCls');
  }
  else if(ev.target.parentElement.classList.contains('savedAddBtn'))
  {
    this.removeActiveBorder(ev.target.parentElement,x);
    ev.target.parentElement.classList.add('borderCls');
  }
  else{
    console.log('Dekh kr click kro');
  }
  console.log(x);
  if (x==x) {
    this.ifClicked = true;
  }
  this.DropoffSelected = true;
  this.googleMapDropoffFlag = false;
  this.googleaddressdo = i.google_address;
  this.postaladdressdo = i.postal_address;
  console.log("postal address",this.postaladdressdo);
  this.droplat = i.latitude;
  this.droplong = i.longitude;
  this.landmarkdo = i.land_mark;
  this.addressdoprevious = i.address_id;
  for(var k = 0;k <this.addresstype.length; k++){
    if(this.addresstype[k].type_of_address === i.type_of_address){
      this.addresstypedo = this.addresstype[k].id;
      console.log(this.addresstypepu);
    }
  }
}

  getinfowithMobile(){
    const reqpara112 = {
      requesttype:'getcustinfo_mobilev3',
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
          }
      }
      this.carinfo = this.customer[4].carinfo[0];
      if(this.carinfo.hasOwnProperty('no_records')){
        this.selectedBrand  = sessionStorage.getItem('brandid');
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
    if(this.sameasvalue){
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

  zoomChanged(ev){
    console.log(ev);
  }

  checkVehicleNum(ev) {
    var mobile_length = (<HTMLInputElement>document.getElementById('mobile1')).value.length;
    var vehicle_reg_length = (<HTMLInputElement>document.getElementById('num')).value.length;
    if(mobile_length == 10 && vehicle_reg_length > 5) {
      this.mobileLength = false;
    }
    else {
      this.mobileLength = true;
    }
  }
  checkMobile(ev) {
    if(this.registrationNumber == '' || this.registrationNumber == null || ev.target.value.length == 10) {
      this.mobileLength = false;
    }
    else {
      this.mobileLength = true;
    }
  }

  onSubmit(f: NgForm) {
    this.BookingBtn = true;
    if(sessionStorage.getItem('pickup_add_drag')){
      this.googleaddresspu = sessionStorage.getItem('pickup_add_drag');
      this.googlepickuplat = JSON.parse(sessionStorage.getItem('pickup_lat_drag'));
      this.googlepickuplong = JSON.parse(sessionStorage.getItem('pickup_lng_drag'));
    }
    if(sessionStorage.getItem('dropoff_add_drag')){
      this.googleaddressdo = sessionStorage.getItem('dropoff_add_drag');
      this.googledropofflat = JSON.parse(sessionStorage.getItem('dropoff_lat_drag'));
      this.googledropofflong = JSON.parse(sessionStorage.getItem('dropoff_lng_drag'));
    }
    this.disabled = true;
    if(this.showAddressDropDown){
      console.log(this.googlemapShow)
      if(this.googleMapDropoffFlag && this.googleMapPickupFlag){
      
        if(this.yourBoolean === "onlypickup"){
          console.log("bothgoolgemap",this.yourBoolean);
          this.googleaddressdo = this.googleaddresspu;
          this.landmarkpu = f.value.pickulandmark;
          this.landmarkdo = f.value.pickulandmark;
          this.pickuplat = this.googlepickuplat.toString();
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.googlepickuplat.toString();
          this.droplong = this.googlepickuplong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypepu;
          this.addresstypepu = f.value.addresstypepu;
          this.postaladdresspu =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.postaladdressdo =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
          
        }
        else if(this.yourBoolean === "dropoff"){
          console.log("bothgoolgemap",this.yourBoolean);
          this.googleaddresspu = this.googleaddressdo;
          this.landmarkpu = f.value.dropofflandmark;
          this.landmarkdo = f.value.dropofflandmark;
          this.pickuplat = this.googledropofflat.toString();
          this.pickuplong = this.googledropofflong.toString();
          this.droplat = this.googledropofflat.toString();
          this.droplong = this.googledropofflong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypedo;
          this.addresstypepu = f.value.addresstypedo;
          this.postaladdresspu = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.postaladdressdo = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
        else{
          if(!this.ifSameAsPickUp){
            console.log("bothgoolgemap sameas",this.yourBoolean);
            console.log("pickupmap",this.yourBoolean);
            this.googleaddressdo = this.googleaddresspu;
            this.landmarkpu = f.value.pickulandmark;
            this.landmarkdo = f.value.pickulandmark;
            this.pickuplat = this.googlepickuplat.toString();
            this.pickuplong = this.googlepickuplong.toString();
            this.droplat = this.googlepickuplat.toString();
            this.droplong = this.googlepickuplong.toString();
            this.addressdoprevious = "0";
            this.addresspuprevious = "0";
            this.addresstypedo = f.value.addresstypepu;
            this.addresstypepu = f.value.addresstypepu;
            this.postaladdresspu =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.postaladdressdo =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.droplat = this.droplat.substring(0, 14);
            this.droplong = this.droplong.substring(0, 14);
            this.pickuplat = this.pickuplat.substring(0, 14);
            this.pickuplong = this.pickuplong.substring(0, 14);
          }
          else{
            console.log("bothgoolgemap not",this.yourBoolean);
            this.landmarkpu = f.value.pickulandmark;
            this.landmarkdo = f.value.dropofflandmark;
            this.pickuplat = this.googlepickuplat.toString();
            this.pickuplong = this.googlepickuplong.toString();
            this.droplat = this.googledropofflat.toString();
            this.droplong = this.googledropofflong.toString();
            this.addressdoprevious = "0";
            this.addresspuprevious = "0";
            this.addresstypedo = f.value.addresstypedo;
            this.addresstypepu = f.value.addresstypepu;
            this.postaladdresspu =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.postaladdressdo = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
            this.droplat = this.droplat.substring(0, 14);
            this.droplong = this.droplong.substring(0, 14);
            this.pickuplat = this.pickuplat.substring(0, 14);
            this.pickuplong = this.pickuplong.substring(0, 14);
          }
        }
      }
      else if(this.googleMapPickupFlag && this.DropoffSelected){
        console.log("PMDS",this.yourBoolean);
        if(this.yourBoolean === "onlypickup"){
          this.googleaddressdo = this.googleaddresspu;
          this.landmarkpu = f.value.pickulandmark;
          this.landmarkdo = f.value.pickulandmark;
          this.pickuplat = this.googlepickuplat.toString();
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.googlepickuplat.toString();
          this.droplong = this.googlepickuplong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypepu;
          this.addresstypepu = f.value.addresstypepu;
          this.postaladdresspu =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.postaladdressdo =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
        else if(this.yourBoolean === "dropoff"){
          this.postaladdresspu = this.postaladdressdo;
          this.landmarkpu = this.landmarkdo;
          this.pickuplat = this.droplat;
          this.pickuplong = this.droplong;
        }
        else{
          if(!this.ifSameAsPickUp){
            console.log("PMDS",this.yourBoolean);
            this.googleaddressdo = this.googleaddresspu;
            this.landmarkpu = f.value.pickulandmark;
            this.landmarkdo = f.value.pickulandmark;
            this.pickuplat = this.googlepickuplat.toString();
            this.pickuplong = this.googlepickuplong.toString();
            this.droplat = this.googlepickuplat.toString();
            this.droplong = this.googlepickuplong.toString();
            this.addressdoprevious = "0";
            this.addresspuprevious = "0";
            this.addresstypedo = f.value.addresstypepu;
            this.addresstypepu = f.value.addresstypepu;
            this.postaladdresspu = f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.postaladdressdo =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.droplat = this.droplat.substring(0, 14);
            this.droplong = this.droplong.substring(0, 14);
            this.pickuplat = this.pickuplat.substring(0, 14);
            this.pickuplong = this.pickuplong.substring(0, 14);
          }
          else{
            this.landmarkpu = f.value.pickulandmark;
            this.pickuplat = this.googlepickuplat.toString();
            this.pickuplong = this.googlepickuplong.toString();
            this.addresspuprevious = "0";
            this.addresstypepu = f.value.addresstypepu;
            this.postaladdresspu =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.pickuplat = this.pickuplat.substring(0, 14);
            this.pickuplong = this.pickuplong.substring(0, 14);
          }
        }
      }
      else if(this.googleMapDropoffFlag && this.pickupSelected){
        console.log("DMPS",this.yourBoolean);
        if(this.yourBoolean === "onlypickup"){
          console.log("DMPS",this.yourBoolean);
          this.postaladdressdo = this.postaladdresspu;
          this.droplat = this.pickuplat;
          this.droplong = this.pickuplong;
          this.landmarkdo = this.landmarkpu;
        }
        else if(this.yourBoolean === "dropoff"){
          console.log("DMPS",this.yourBoolean);
          this.googleaddresspu = this.googleaddressdo;
          this.landmarkpu = f.value.dropofflandmark;
          this.landmarkdo = f.value.dropofflandmark;
          this.pickuplat = this.googledropofflat.toString();
          this.pickuplong = this.googledropofflong.toString();
          this.droplat = this.googledropofflat.toString();
          this.droplong = this.googledropofflong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypedo;
          this.addresstypepu = f.value.addresstypedo;
          this.postaladdresspu =  f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.postaladdressdo =  f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
        else{
          if(!this.ifSameAsPickUp){
            console.log("DMPS",this.yourBoolean);
            this.postaladdressdo = this.postaladdresspu;
            this.droplat = this.pickuplat;
            this.droplong = this.pickuplong;
            this.landmarkdo = this.landmarkpu;
          }
          else{
            this.landmarkdo = f.value.dropofflandmark;
            this.droplat = this.googledropofflat.toString();
            this.droplong = this.googledropofflong.toString();
            this.addressdoprevious = "0";
            this.addresstypepu = f.value.addresstypedo;
            this.postaladdressdo =  f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
            this.droplat = this.droplat.substring(0, 14);
            this.droplong = this.droplong.substring(0, 14);
          }
        }
      }
      else if(this.googleMapPickupFlag){
        if(this.yourBoolean === "onlypickup"){
          console.log("pickupmap",this.yourBoolean);
          this.googleaddressdo = this.googleaddresspu;
          this.landmarkpu = f.value.pickulandmark;
          this.landmarkdo = f.value.pickulandmark;
          this.pickuplat = this.googlepickuplat.toString();
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.googlepickuplat.toString();
          this.droplong = this.googlepickuplong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypepu;
          this.addresstypepu = f.value.addresstypepu;
          this.postaladdresspu = f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.postaladdressdo = f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
        else if(this.yourBoolean === "dropoff"){
          console.log("pickupmap",this.yourBoolean);
          this.googleaddresspu = this.googleaddressdo;
          this.landmarkpu = f.value.dropofflandmark;
          this.landmarkdo = f.value.dropofflandmark;
          this.pickuplat = this.googledropofflat.toString();
          this.pickuplong = this.googledropofflong.toString();
          this.droplat = this.googledropofflat.toString();
          this.droplong = this.googledropofflong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypedo;
          this.addresstypepu = f.value.addresstypedo;
          this.postaladdresspu =f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.postaladdressdo = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
        else{
          if(!this.ifSameAsPickUp){
            console.log("pickupmap",this.yourBoolean);
            this.googleaddressdo = this.googleaddresspu;
            this.landmarkpu = f.value.pickulandmark;
            this.landmarkdo = f.value.pickulandmark;
            this.pickuplat = this.googlepickuplat.toString();
            this.pickuplong = this.googlepickuplong.toString();
            this.droplat = this.googlepickuplat.toString();
            this.droplong = this.googlepickuplong.toString();
            this.addressdoprevious = "0";
            this.addresspuprevious = "0";
            this.addresstypedo = f.value.addresstypepu;
            this.addresstypepu = f.value.addresstypepu;
            this.postaladdresspu = f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.postaladdressdo = f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.droplat = this.droplat.substring(0, 14);
            this.droplong = this.droplong.substring(0, 14);
            this.pickuplat = this.pickuplat.substring(0, 14);
            this.pickuplong = this.pickuplong.substring(0, 14);
          }
          else{
          this.googleaddressdo = this.googleaddressdo;
          this.landmarkpu = f.value.pickulandmark;
          this.landmarkdo = f.value.dropofflandmark;
          this.pickuplat = this.googlepickuplat.toString();
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.googledropofflat.toString();
          this.droplong = this.googledropofflong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypedo;
          this.addresstypepu = f.value.addresstypepu;
          this.postaladdresspu =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.postaladdressdo = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
          }
        }
        }
      else if(this.googleMapDropoffFlag){
        if(this.yourBoolean === "onlypickup"){
          console.log("dropmap",this.yourBoolean);
          this.googleaddressdo = this.googleaddresspu;
          this.landmarkpu = f.value.pickulandmark;
          this.landmarkdo = f.value.pickulandmark;
          this.pickuplat = this.googlepickuplat.toString();
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.googlepickuplat.toString();
          this.droplong = this.googlepickuplong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypepu;
          this.addresstypepu = f.value.addresstypepu;
          this.postaladdresspu =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.postaladdressdo =  f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
        else if(this.yourBoolean === "dropoff"){
          console.log("dropmap",this.yourBoolean);
          this.googleaddresspu = this.googleaddressdo;
          this.landmarkpu = f.value.dropofflandmark;
          this.landmarkdo = f.value.dropofflandmark;
          this.pickuplat = this.googledropofflat.toString();
          this.pickuplong = this.googledropofflong.toString();
          this.droplat = this.googledropofflat.toString();
          this.droplong = this.googledropofflong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypedo;
          this.addresstypepu = f.value.addresstypedo;
          this.postaladdresspu = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.postaladdressdo = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
        else{
          if(!this.ifSameAsPickUp){
            console.log("pickupmap",this.yourBoolean);
            this.googleaddressdo = this.googleaddresspu;
            this.landmarkpu = f.value.pickulandmark;
            this.landmarkdo = f.value.pickulandmark;
            this.pickuplat = this.googlepickuplat.toString();
            this.pickuplong = this.googlepickuplong.toString();
            this.droplat = this.googlepickuplat.toString();
            this.droplong = this.googlepickuplong.toString();
            this.addressdoprevious = "0";
            this.addresspuprevious = "0";
            this.addresstypedo = f.value.addresstypepu;
            this.addresstypepu = f.value.addresstypepu;
            this.postaladdresspu = f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.postaladdressdo = f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.droplat = this.droplat.substring(0, 14);
            this.droplong = this.droplong.substring(0, 14);
            this.pickuplat = this.pickuplat.substring(0, 14);
            this.pickuplong = this.pickuplong.substring(0, 14);
          }
          else{
            this.googleaddressdo = this.googleaddressdo;
            this.landmarkpu = f.value.pickulandmark;
            this.landmarkdo = f.value.dropofflandmark;
            this.pickuplat = this.googlepickuplat.toString();
            this.pickuplong = this.googlepickuplong.toString();
            this.droplat = this.googledropofflat.toString();
            this.droplong = this.googledropofflong.toString();
            this.addressdoprevious = "0";
            this.addresspuprevious = "0";
            this.addresstypedo = f.value.addresstypedo;
            this.addresstypepu = f.value.addresstypepu;
            this.postaladdresspu =f.value.pickflatno + '' + f.value.pickupbuildingname ;
            this.postaladdressdo = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
            this.droplat = this.droplat.substring(0, 14);
            this.droplong = this.droplong.substring(0, 14);
            this.pickuplat = this.pickuplat.substring(0, 14);
            this.pickuplong = this.pickuplong.substring(0, 14);
          }
        }
      }
      else{
        if(this.yourBoolean === "onlypickup"){
          this.postaladdressdo = this.postaladdresspu;
          this.droplat = this.pickuplat;
          this.droplong = this.pickuplong;
          this.landmarkdo = this.landmarkpu;
        }
        else if(this.yourBoolean === "dropoff"){
          this.googleaddresspu = this.googleaddressdo;
          this.postaladdresspu = this.postaladdressdo;
          this.landmarkpu = this.landmarkdo;
          this.pickuplat = this.droplat;
          this.pickuplong = this.droplong;
        }
        else{
          if(!this.ifSameAsPickUp){
            this.googleaddressdo = this.googleaddresspu;
            this.postaladdressdo = this.postaladdresspu;
            this.addresstypedo = this.addresstypepu;
            this.droplat = this.pickuplat;
            this.droplong = this.pickuplong;
            this.landmarkdo = this.landmarkpu;
          }
        }
      }
     }
     else{
       console.log("new number");
       console.log("dropoffflaf",this.googleMapDropoffFlag);
       console.log("pickupflag",this.googleMapPickupFlag)
       if(this.yourBoolean === "onlypickup"){
         console.log("new number only pickup");
        this.googleaddressdo = this.googleaddresspu;
        this.landmarkpu = f.value.pickupsearchplaceLandmark;
        this.landmarkdo = f.value.pickupsearchplaceLandmark;
        this.pickuplat = this.googlepickuplat.toString();
        this.pickuplong = this.googlepickuplong.toString();
        this.droplat = this.googlepickuplat.toString();
        this.droplong = this.googlepickuplong.toString();
        this.addressdoprevious = "0";
        this.addresspuprevious = "0";
        this.addresstypedo = f.value.addresstypepu;
        this.addresstypepu = f.value.addresstypepu;
        this.postaladdresspu = f.value.pickflatno + '' + f.value.pickupbuildingname ;
        this.postaladdressdo = f.value.pickflatno + '' + f.value.pickupbuildingname ;
        this.droplat = this.droplat.substring(0, 14);
        this.droplong = this.droplong.substring(0, 14);
        this.pickuplat = this.pickuplat.substring(0, 14);
        this.pickuplong = this.pickuplong.substring(0, 14);
      }
      else if(this.yourBoolean === "dropoff"){
        console.log("new number only dropoff");
        this.googleaddresspu = this.googleaddressdo;
        this.landmarkpu = f.value.dropofflandmark;
        this.landmarkdo = f.value.dropofflandmark;
        this.pickuplat = this.googledropofflat.toString();
        this.pickuplong = this.googledropofflong.toString();
        this.droplat = this.googledropofflat.toString();
        this.droplong = this.googledropofflong.toString();
        this.addressdoprevious = "0";
        this.addresspuprevious = "0";
        this.addresstypedo = f.value.addresstypedo;
        this.addresstypepu = f.value.addresstypedo;
        this.postaladdresspu = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
        this.postaladdressdo = f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
        this.droplat = this.droplat.substring(0, 14);
        this.droplong = this.droplong.substring(0, 14);
        this.pickuplat = this.pickuplat.substring(0, 14);
        this.pickuplong = this.pickuplong.substring(0, 14);
      }
      else{
        if(!this.ifSameAsPickUp){
          console.log("new number same as");
          this.googleaddressdo = this.googleaddresspu;
          this.landmarkpu = f.value.pickupsearchplaceLandmark;
          this.landmarkdo = f.value.pickupsearchplaceLandmark;
          this.pickuplat = this.googlepickuplat.toString();
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.googlepickuplat.toString();
          this.droplong = this.googlepickuplong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypepu;
          this.addresstypepu = f.value.addresstypepu;
          this.postaladdresspu = f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.postaladdressdo = f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
        else{
          this.googleaddressdo = this.googleaddressdo;
          this.landmarkpu = f.value.pickupsearchplaceLandmark;
          this.landmarkdo = f.value.dropofflandmark;
          this.pickuplat = this.googlepickuplat.toString();
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.googledropofflat.toString();
          this.droplong = this.googledropofflong.toString();
          this.addressdoprevious = "0";
          this.addresspuprevious = "0";
          this.addresstypedo = f.value.addresstypedo;
          this.addresstypepu = f.value.addresstypepu;
          this.postaladdresspu = f.value.pickflatno + '' + f.value.pickupbuildingname ;
          this.postaladdressdo =f.value.dropoffflatno + '' + f.value.dropoffbuildingname ;
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
        }
      }
     }

    if(f.value.svclist){
      this.selectedBrand = f.value.svclist;
    }
    this.registrationNumber = f.value.num.toUpperCase();
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
      if(this.postaladdresspu || this.landmarkpu){
        console.log("Pickup is selected");
      }
      else {
        this.showToast('alert', 'Message', 'Please select Pickup');
      }
      if(this.ifSameAsPickUp){
        console.log("not same as selected");
        if(this.postaladdressdo || this.landmarkdo){
          console.log("Drop off is selected");
        }
        else {
          this.showToast('alert', 'Message', 'Please select Drop off');
        }
      }
    
    const reqpara6 = {
      requesttype: "createbookingv5",
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
      googleaddresspu: this.googleaddresspu,
      postaladdresspu: this.postaladdresspu,
      landmarkpu: this.landmarkpu,
      addresstypepu: this.addresstypepu,
      pickuplat: this.pickuplat,
      pickuplong: this.pickuplong,
      addressdoprevious:this.addressdoprevious,
      googleaddressdo: this.googleaddressdo,
      postaladdressdo: this.postaladdressdo,
      landmarkdo: this.landmarkdo,
      addresstypedo:this.addresstypedo,
      droplat: this.droplat,
      droplong: this.droplong,
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
    this.ServicingService.webServiceCall(ua).subscribe(data => {
      if (data[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);

      } else if(data[0].hasOwnProperty('queue')) {
        this.BookingBtn = false;
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
        this.mobileLength = true;
        this.yourBoolean = 'servicing';
        this.user.salutation = 'Mr';
        this.user.confirm = true;
        this.editAddress = false;
        this.complaint_id = [];
        this.datecheck = false;
        this.showtime = false;
        this.disableNext = false;
        this.user.mobile1 = null;
        this.ifSameAsPickUp = false;
        this.googlemapShow = false;
        this.googleMapDropoffFlag = false;
        this.googleMapPickupFlag = false;
        console.log()
        this.dropOffOnly = false;
        this.googleaddresspu = null;
        this.googleaddressdo = null;
        sessionStorage.removeItem('pickup_add_drag');
        sessionStorage.removeItem('pickup_lat_drag');
        sessionStorage.removeItem('pickup_lng_drag');
        sessionStorage.removeItem('dropoff_add_drag');
        sessionStorage.removeItem('dropoff_lat_drag');
        sessionStorage.removeItem('dropoff_lng_drag');
        (<HTMLInputElement>document.getElementById('mobile1')).disabled = false;
        (<HTMLInputElement>document.getElementById('num')).disabled = false;   
         document.getElementById("num_label").classList.remove("disabled_label");
         document.getElementById("num_label").style.opacity = "0.5";
         document.getElementById("mobile_label").classList.remove("disabled_label");
         document.getElementById("mobile_label").style.opacity = "0.5";
      }
      else if(data[0].hasOwnProperty('error')){
        this.showToast('alert', 'Alert', 'Sorry !! Something went wrong');
        this.BookingBtn = false;
      }
    }),
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {}
        else {}
      }
    
  }
  else {
    this.showToast('alert', 'Message', 'Please select Slot and date');
    this.BookingBtn = false;
  }
  }

}

interface marker {
  name?:string;
  lat:number;
  lng:number;
  draggable:boolean;
}


