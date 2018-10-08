import { Component, OnInit,ViewChild, ElementRef, NgZone  } from '@angular/core';
import {ServerService } from '../../services/user.service';
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
import { NgxSpinnerService } from 'ngx-spinner';
import { AgmCoreModule, MapsAPILoader } from '@agm/core'; 
import {} from '@types/googlemaps';
declare var google: any;

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {

  public selectedBrand: any = [];
  public selectedModel: any = [];
  public slot:any = [];
  svcid:string;
  svcList:any;
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
  public zoom: number = 16;
  addresstype_pu = "0";
  cust_details:any={};
  public pikup_long: string;
  public dropoff_lat: string;
  public dropoff_long: string;
  public pickup_add: string;
  serviceAdv:string;
  sameasvalue:boolean;
  cityList:any;
  private creName: string[];
  public pickup_drop:number;
  public yourBoolean : string = 'onSpot' ; 
  user:any = {};
  queuetime:string;
  public message:any=[];
  private brands: any=[];
  showAddress = false;
  showAddressDropDown = false;
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
  googleMapPickupFlag:boolean = false;
  googleMapDropoffFlag:boolean = false;
  landmarkdo:string;
  addresstypepu = "0";
  addresstypedo = "0";
  droplat:string;
  pickupSelected = false;
  DropoffSelected = false;
  droplong:string;
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
  north21_tied: any= [];
  insurance_tied:any = [];
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
  public lat: number = 51.678418;
  public lng: number = 7.809007;
  public latitude: number;
  public longitude: number;
  showtime = false;
  public startDate;
  public minDate;
  public maxDate;
  public complaint_id:any =[];
  valuedate = new Date();
  countrycode1:string;
  insuranceFlag:boolean=false;
  testdrivecheck = false;
  latPickup:number;
  lngPickup:number;
  latDrop:number;
  lngDrop:number;
  public iconurl: String;
  @ViewChild('pickupsearchplace') pickupsearchplace:ElementRef;
  @ViewChild('pickupsearchplaceFill') pickupsearchplaceFill: ElementRef;
  @ViewChild('pickupsearchplaceLandmark') pickupsearchplaceLandmark: ElementRef;
  @ViewChild('Custodysearchplace') Custodysearchplace:ElementRef;
  @ViewChild('CustodysearchplaceFill') CustodysearchplaceFill: ElementRef;
  @ViewChild('CustodysearchplaceLandmark') CustodysearchplaceLandmark: ElementRef;
  @ViewChild('testpickup') testpickup:ElementRef;
  @ViewChild('testpickupsearchplaceFill') testpickupsearchplaceFill: ElementRef;
  @ViewChild('testpickulandmark') testpickulandmark: ElementRef;
  @ViewChild('testdropoff') testdropoff:ElementRef;
  @ViewChild('testdropoffsearchplaceFill') testdropoffsearchplaceFill: ElementRef;
  @ViewChild('testdropofflandmark') testdropofflandmark: ElementRef;
  @ViewChild('homepickup') homepickup:ElementRef;
  @ViewChild('homepickupsearchplaceFill') homepickupsearchplaceFill: ElementRef;
  @ViewChild('homepickulandmark') homepickulandmark: ElementRef;
  @ViewChild('homedropoff') homedropoff:ElementRef;
  @ViewChild('homedropoffsearchplaceFill') homedropoffsearchplaceFill: ElementRef;
  @ViewChild('homedropofflandmark') homedropofflandmark: ElementRef;
  @ViewChild('internalpickup') internalpickup:ElementRef;
  @ViewChild('internalpickupsearchplaceFill') internalpickupsearchplaceFill: ElementRef;
  @ViewChild('internalpickulandmark') internalpickulandmark: ElementRef;
  @ViewChild('internaldropoff') internaldropoff:ElementRef;
  @ViewChild('internaldropoffsearchplaceFill') internaldropoffsearchplaceFill: ElementRef;
  @ViewChild('internaldropofflandmark') internaldropofflandmark: ElementRef;
  
  constructor(public ngZone: NgZone,private spinner: NgxSpinnerService,private datePipe:DatePipe,private titlecasePipe:TitleCasePipe,private toasterService: ToasterService,private _data : ServerService,private router: Router,private ngbDateParserFormatter: NgbDateParserFormatter,private modalService: NgbModal) {
    this.cityList = [];
    this.getCity();
    this.iconurl = './../../../assets/images/image.png';
   }

  ngOnInit() {
    console.log(sessionStorage.getItem('insurance'))
    if(JSON.parse(sessionStorage.getItem('insurance')) == "1"){
      this.insuranceFlag = true;
      console.log(this.insuranceFlag , "flag")
    }
    else{
      this.insuranceFlag = false;
      console.log(this.insuranceFlag , "flag")
    }
    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.service_type  = [
      { id: 1, type: 'StockYard' },
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
      const now = new Date();
      const date = new Date();
      this.valuedate = new Date();
      this.startDate = {year: date.getUTCFullYear(),month:date.getUTCMonth() + 1,day:date.getUTCDate() };
      this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
      this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
      this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
  }

  //Show Model
  showModal(Id:number) {
    const activeModal = this.modalService.open(AddEmployee, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Add Employee';
    activeModal.componentInstance.modalContent = Id;
    activeModal.result.then(() => { 
      this.spinner.show();
      if(Id == 4){
        this.getSaleExceutive();
      }
      else if (Id == 3){
        this.getCoordinator();
      }
      console.log('When user closes');
    }, () => { console.log('Backdrop click')})
  }


  //GetBrands
  getBrands(){
    const reqpara1 = {
           requesttype: 'getallbrands',
           svcid:this.svcid
         }
      const as1 = JSON.stringify(reqpara1)
      this._data.webServiceCall(as1).subscribe
       (res => {
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

  //Slot breakup
  buildArr(theArr: any[]){
   var arrOfarr = [];
   for(var i = 0; i < theArr.length ; i+=6) {
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

  //
   showLargeModal(res:any) {
    const activeModal = this.modalService.open(BookingDetails, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Booking Details';
    activeModal.componentInstance.modalContent = res;
  }

  //Slot Selection on click of slot
  checkSlot(value: string,time:string) {
    this.slot_time=time;
    this.slothour = value;
    this.slotcheck = false;
 }

 sameAsPickupTest(e){
   console.log("befor",this.testdrivecheck);
   console.log("value",e);
   this.testdrivecheck = !e;
   console.log("after",this.testdrivecheck);
 }

 //Stockyard(6),Custody(15)
 pickUpSearch(e,ServiceId){
   if(ServiceId === 15){
    let autocomplete = new google.maps.places.Autocomplete(this.Custodysearchplace.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                return;
          }
          this.latPickup = place.geometry.location.lat();
          this.lngPickup = place.geometry.location.lng();
          console.log(this.latPickup);
          // this.latitude = this.latPickup;
          // this.longitude = this.lngPickup;
          console.log(this.lngPickup);
          this.googlepickuplat = place.geometry.location.lat();
          this.googlepickuplong = place.geometry.location.lng();
          this.googleaddresspu = place.formatted_address;
          this.zoom = 12;
        })
      });
   }
   else{
    let autocomplete = new google.maps.places.Autocomplete(this.pickupsearchplace.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                return;
          }
          this.latPickup = place.geometry.location.lat();
          this.lngPickup = place.geometry.location.lng();
          this.googlepickuplat = place.geometry.location.lat();
          this.googlepickuplong = place.geometry.location.lng();
          this.googleaddresspu = place.formatted_address;
          this.zoom = 12;
        })
      });
   }
 
}

//Home Delivery() and TestDrive Pickup
HomeTestPickup(e,ServiceId){
  if(ServiceId === 5){
    let autocomplete = new google.maps.places.Autocomplete(this.homepickup.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                return;
          }
          this.latPickup = place.geometry.location.lat();
          this.lngPickup = place.geometry.location.lng();
          this.googlepickuplat = place.geometry.location.lat();
          this.googlepickuplong = place.geometry.location.lng();
          this.googleaddresspu = place.formatted_address;
          this.zoom = 12;
        })
      });
  }
  else{
    let autocomplete = new google.maps.places.Autocomplete(this.testpickup.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                return;
          }
          this.latPickup = place.geometry.location.lat();
          this.lngPickup = place.geometry.location.lng();
          this.googlepickuplat = place.geometry.location.lat();
          this.googlepickuplong = place.geometry.location.lng();
          this.googleaddresspu = place.formatted_address;
          this.zoom = 12;
        })
      });
  }
}

//Home Delivery() and TestDrive Dropoff
HomeTestDropoff(e,ServiceId){
  if(ServiceId === 5){
    let autocomplete = new google.maps.places.Autocomplete(this.homedropoff.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                return;
          }
          this.latDrop = place.geometry.location.lat();
          this.lngDrop = place.geometry.location.lng();
          this.googledropofflat = place.geometry.location.lat();
          this.googledropofflong = place.geometry.location.lng();
          this.googleaddressdo = place.formatted_address;
          this.zoom = 12;
        })
      });
  }
  else{
    let autocomplete = new google.maps.places.Autocomplete(this.testdropoff.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                return;
          }
          this.latDrop = place.geometry.location.lat();
          this.lngDrop = place.geometry.location.lng();
          this.googledropofflat = place.geometry.location.lat();
          this.googledropofflong = place.geometry.location.lng();
          this.googleaddressdo = place.formatted_address;
          this.zoom = 12;
        })
      });
  }
}

//Internal movement (1-Pickup)
InternalSearch(e,ServiceId){
  if(ServiceId === 1){
    let autocomplete = new google.maps.places.Autocomplete(this.internalpickup.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                return;
          }
          this.latPickup = place.geometry.location.lat();
          this.lngPickup = place.geometry.location.lng();
          this.googlepickuplat = place.geometry.location.lat();
          this.googlepickuplong = place.geometry.location.lng();
          this.googleaddresspu = place.formatted_address;
          this.zoom = 12;
        })
      });
  }
  else{
    let autocomplete = new google.maps.places.Autocomplete(this.internaldropoff.nativeElement);
          autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              if (place.geometry === undefined || place.geometry === null) {
                return;
          }
          this.latDrop = place.geometry.location.lat();
          this.lngDrop = place.geometry.location.lng();
          this.googledropofflat = place.geometry.location.lat();
          this.googledropofflong = place.geometry.location.lng();
          this.googleaddressdo = place.formatted_address;
          this.zoom = 12;
        })
      });
  }
}

  //Brand selection
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

  //on selection of Brand select , this function will be called
 onSelectModel(modelId) {
    this.selectedModel = null;
    for (let i = 0; i < this.Models.length; i++) {
      if (this.Models[i].model_id == modelId) {
        this.selectedModel = this.Models[i];
      }
    }
    this.getVariants(this.selectedModel.model_id);
  }

  //on selection of Model select , this function will be called
 onSelectVariant(VariantId) {
   this.selectedVariant = null;
   for (let i = 0; i < this.Models.length; i++) {
     if (this.Variant[i].variant_id == VariantId) {
       this.selectedVariant = this.Variant[i];
     }
   }
  }

  //Get Variant API
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

//on selection of Coordinate select , this function will be called
  onCoordinator(Id){
    this.selectedCoordinator = null;
     for (let i = 0; i < this.Coordinator.length; i++) {
      if (this.Coordinator[i].id === Id) {
        this.selectedCoordinator = this.Coordinator[i];
        }
    }
  }

//Get Sales executive API call
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

//Get Coordinator  API call
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

  //Get Models  API call
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

      onCity(id){
        this.GetSVCList(this.selectedBrand,this.user.city);
      }

      GetSVCList(brand,city){
        var cityId = JSON.parse(sessionStorage.getItem('city_id'));
        const reqpara1 = {
               requesttype: 'getsvclist_city_brand',
                cityid: city,
                brandid: brand
             }
          const SvcList = JSON.stringify(reqpara1)
          this._data.webServiceCall(SvcList).subscribe
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

       public getCity() {
        const reqpara1 ={
            requesttype: 'getcitylist',
          }
        const as1 = JSON.stringify(reqpara1)
        this._data.webServiceCall(as1).subscribe
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

       //Get City List API call
      getCityList(){
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

      //called when sameas checked box is checked
      sameAsPickup(value){
        this.sameasvalue = value;
        if (value == true) {
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
            if(this.user.address_typepu){
              this.user.address_typedu = this.user.address_typepu;
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


      // modelChanged(event){
      //   console.log(event);
      // }

      //On change of date in calender it is called
      onSelectDate(date: NgbDateStruct){
        if (date != null) {
                this.model = date;
                this.dateString = this.ngbDateParserFormatter.format(date);
            }
            this.show3 = true;
            if(this.amb == true){}
            this.getSlot(this.dateString);
          }

         //Assign Amb switch is checked 
        checkAmb(value){
        this.amb = value;
      }

      getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        // console.log(d);
        return d;
      }
      
     deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      //API call for slots
      getSlot(Date: string) {
        this.showtime = true;
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
            pickup_drop: "0",
            type_service:this.pickup_drop,
            cityid:cityId
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
        requesttype:'getcustinfo_mobilev3',
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
            // this.cust_details.mobile = this.user.mobile1
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
       }
       this.carinfo = this.customer[4].carinfo[0];
       console.log( this.carinfo);
       if(this.carinfo.hasOwnProperty('no_records')){
         this.selectedBrand  = sessionStorage.getItem('brandid');
          console.log(this.selectedBrand )
          this.getModelds(this.selectedBrand );
       }
       else{
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
    console.log(f.value);
    this.disabled =  true;
    if(f.value.city){
      this.cityid = f.value.city;
    }
    else{
      this.cityid = 0
    }
    if(this.user.time){
      this.slot_time = this.user.time + ':00'
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
      if(this.pickup_drop == 15){
        this.landmarkpu = f.value.CustodysearchplaceLandmark;
        this.landmarkdo = f.value.CustodysearchplaceLandmark;
        this.googleaddressdo = this.googleaddresspu;
        this.postaladdresspu = f.value.Custodyflatno + ' ' + f.value.Custodybuildingname;
        this.postaladdressdo = f.value.Custodyflatno + ' ' + f.value.Custodybuildingname;
        this.droplat = this.googlepickuplat.toString();
        this.droplong = this.googlepickuplong.toString();
        this.pickuplat = this.googlepickuplat.toString();;
        this.pickuplong = this.googlepickuplong.toString();
        this.droplat = this.droplat.substring(0, 14);
        this.droplong = this.droplong.substring(0, 14);
        this.pickuplat = this.pickuplat.substring(0, 14);
        this.pickuplong = this.pickuplong.substring(0, 14);
      }
      else{
        this.landmarkpu = f.value.pickupsearchplaceLandmark;
        this.landmarkdo = f.value.pickupsearchplaceLandmark;
        this.googleaddressdo = this.googleaddresspu;
        this.postaladdresspu = f.value.pickflatno + ' ' + f.value.pickupbuildingname;
        this.postaladdressdo = f.value.pickflatno + ' ' + f.value.pickupbuildingname;
        this.droplat = this.googlepickuplat.toString();;
        this.droplong = this.googlepickuplong.toString();
        this.pickuplat = this.googlepickuplat.toString();;
        this.pickuplong = this.googlepickuplong.toString();
        this.droplat = this.droplat.substring(0, 14);
        this.droplong = this.droplong.substring(0, 14);
        this.pickuplat = this.pickuplat.substring(0, 14);
        this.pickuplong = this.pickuplong.substring(0, 14);
      }
    }
    else if (this.pickup_drop == 4){
      var result = this.getDistanceFromLatLonInKm(this.googlepickuplat,this.googlepickuplong,this.googledropofflat,this.googledropofflong);
      this.postaladdresspu = f.value.internalpickupflatno + ' ' + f.value.internalpickupbilding;
      this.postaladdressdo = f.value.internaldropoffflatno + ' ' + f.value.internaldropoffbuildingname;
      this.landmarkpu = f.value.internalpickulandmark;
      this.landmarkdo = f.value.internaldropofflandmark;
      this.droplat = this.googledropofflat.toString();;
      this.droplong = this.googledropofflong.toString();
      this.pickuplat = this.googlepickuplat.toString();;
      this.pickuplong = this.googlepickuplong.toString();
      this.droplat = this.droplat.substring(0, 14);
      this.droplong = this.droplong.substring(0, 14);
      this.pickuplat = this.pickuplat.substring(0, 14);
      this.pickuplong = this.pickuplong.substring(0, 14);
   
    }
    else if (this.pickup_drop == 5 || this.pickup_drop == 7){
      if(this.pickup_drop == 5){
          this.postaladdresspu = f.value.homepickupflatno + ' ' + f.value.homepickupbuildingname;
          this.postaladdressdo = f.value.homepickupflatno + ' ' + f.value.homepickupbuildingname;
          this.landmarkpu = f.value.homepickulandmark;
          this.landmarkdo = f.value.homepickulandmark;
          this.droplat = this.googlepickuplat.toString();;
          this.droplong = this.googlepickuplong.toString();
          this.pickuplat = this.googlepickuplat.toString();;
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
      }
      else{
          console.log("same as test");
          this.googleaddressdo = this.googleaddresspu;
          this.postaladdressdo = f.value.testpickupflatno + ' ' + f.value.testpickupbuildingname;
          this.postaladdresspu = f.value.testpickupflatno + ' ' + f.value.testpickupbuildingname;
          this.landmarkpu = f.value.testpickulandmark;
          this.landmarkdo = f.value.testpickulandmark;
          this.droplat = this.googlepickuplat.toString();;
          this.droplong = this.googlepickuplong.toString();
          this.pickuplat = this.googlepickuplat.toString();;
          this.pickuplong = this.googlepickuplong.toString();
          this.droplat = this.droplat.substring(0, 14);
          this.droplong = this.droplong.substring(0, 14);
          this.pickuplat = this.pickuplat.substring(0, 14);
          this.pickuplong = this.pickuplong.substring(0, 14);
      }
    }
   
  if(f.value.mobile2){
      this.mobile2 = f.value.mobile2;
    }
  else {
    this.mobile2 = "0";
  
  }
  if(f.value.Cus_name){
      this.cusName = f.value.Cus_name;
      this.salutation2 = f.value.salutation1
    }
  else {
    this.cusName = "0";
    this.salutation2 = "0";
    }
  if(f.value.mobile1){
      this.mobile1 = f.value.mobile1;
    }
  else {
    this.mobile1 = "0";
   
  }
  if(f.value.email){
      this.cusEmail = f.value.email;
    }
  else {
    this.cusEmail = "0";
  }
  if(f.value.notes){
     this.notes = f.value.notes;
  }
  else{
    this.notes = "-";
  }

  if(f.value.amt){
     this.amt = f.value.amt;
  }
  else{
    this.amt = "0";
  }
  if(this.slot_time){}
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
      this.queuetime =  this.datePipe.transform(this.today,"y-MM-dd HH:mm:ss");
    }
    if(this.slot_time != "0" || this.pickup_drop == 15 ){
      
      if(result >= 0.100000 || this.pickup_drop != 4){
  const reqpara6 = {
    requesttype: "createbookingv5",
    vehnumber:f.value.num,
    city: this.cityid,
    vehbrand:this.selectedBrand,
    carmodelid: f.value.model,
    carsubmodelid: f.value.variant,
    customername: this.titlecasePipe.transform(this.cusName),
    customermobile1: this.mobile1,
    customermobile2: this.mobile2,
    customeremail: this.cusEmail,
    queuetime: this.queuetime,
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
  this._data.webServiceCall(ua).subscribe(data => { 
    if(data[0].login === 0){
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['/auth/login']);
    }
    else{
        this.message = data[0].queue,
        this.disabled=false;
        this.showLargeModal(this.message[0]);
        this.slot_time = "0";
        f.reset();
        this.show = false;
        this.sameasvalue = false;
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
        this.model=null;
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
}
else{
  this.showToast('alert', 'Message', 'Distance is less than 100 metre');
}
    }
    else{
      this.showToast('alert', 'Message', 'Please select Slot and date');
    }
};

}
