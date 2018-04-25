import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TitleCasePipe } from '@angular/common';
import { ServicingService } from '../../services/addServicing.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal5',
  templateUrl: './modal5.component.html',
  styleUrls: ['./modal5.component.scss']
})
export class Modal5Component implements OnInit {

  constructor(private titlecasePipe:TitleCasePipe,private router: Router, private activeModal: NgbActiveModal, private ServicingService: ServicingService, private ngbDateParserFormatter: NgbDateParserFormatter, private http: HttpClient) { }
  modalHeader: string;
  modalContent: any;
  valuedate = new Date();
  public amb: boolean = true;
  // service_type: string;
  public sameasvalue: boolean;
  myFiles: string[] = [];
  public selectedBrand: any = [];
  public selectedModel: any = [];
  sMsg: string = '';
  filename: string;

  requesttype = 'uploadfile';
  est = '0';
  slothour:string;
  inv = '1';
  public salutation:any;
  public Variant: any = [];
  public brands: any = [];
  public Models: any = [];
  public serviceadv: any = [];
  disable = true;
  show1 = false;
  show2 = false;
  QueueID:string;
  public service_type: any = [];
  public cre: any = [];
  public startDate;
  public minDate;
  public maxDate;
  public model;
  datecheck=false;
  public selecteddate:string;
  show3 = true;
  public selectedcre:any=[];
  public selectedadv:any=[];
    model1: NgbDateStruct;
  dateString: string;
  public slot: any = [];
  public slot_time: string;
  svcadmin: string;
  queue:any = [];
  public countrycode1: string;
      complaint:any;
      public selectedVariant: any = [];
  checksvcadmin: boolean;
  checkgrpadmin: boolean;
  groupadmin: string;
  svcid: string;
  public registrationNumber: string;
  public mobile11: string;
  private Slot: any = [];
  private Complaints: string[];
  private service_advisor: string[];
  public creName: string[];
  private Svclist: any = [];

  public servicing_Date: any = [];
  public complaint_id: any = [];
  public pikup_lat: string;
  public carinfo: any = [];
  public pikup_long: string;
  public dropoff_lat: string;
  public dropoff_long: string;
  public pickup_add: string;

  public notes: string;
  public amt: string;
  public Sid: string;
  public droplatlong: string;
 
  yourBoolean = 'servicing';
  public pickup_drop: number;
  public mobile2: string;
  public message: any = [];
  public dropadd: string;
  public disabled = false;
 
  public isconfirm: string;
  public address: any = [];
 
  public buttondisabled = false;
  itemList = [];
  selectedItems = [];
  settings = {};
  data: any = [];
  public cus: any = {};
  user: any = {};
  customer: any = [];
  cust_details: any = {};
  brand_id: string;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
 
  public globalsvcid:string;
  public selectedsvcid:string;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  
  date: {year: number, month: number};
  ngOnInit() {
    this.selectedItems = [];
    this.settings = {
      text: 'Select Complaints*',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class',
      maxHeight: 150
    };
    this.countrycode1 = "+91";
    if (sessionStorage.getItem('selectedsvc')) {
      this.svcid = sessionStorage.getItem('selectedsvc');

    }
    else {
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));

    }
    this.service_type = [
      { id: 1, type: 'Body Repair' },
      { id: 2, type: 'Servicing' },
      { id: 3, type: 'Both' },
    ];
 
    this.salutation = [
      { id: 1, type: 'Mr' },
      { id: 2, type: 'Mrs' },
      { id: 3, type: 'Ms' },
    ];
    this.queue.salutation = this.salutation[0];
    const now = new Date();
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.startDate = this.model;
    console.log(this.startDate);
    this.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() - 1 };
    console.log(this.minDate);
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + 15};
    console.log(this.maxDate);
    this.getBrands();
    this.getAdvisor();
    this.getCre();
    this.getcreadv();
    this.getDetails();
  }
  public httpOptions = {
    // headers: new HttpHeaders({'Content-Type':  'multipart/form-data'}),
    withCredentials: true
  };
  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      this.model1 = date;
      this.dateString = this.ngbDateParserFormatter.format(date);
      console.log(this.dateString);
    }
    // this.showToast('default', 'Time', 'Please Select time');
    this.slot = [];
    this.datecheck=true;
    this.getSlot(this.dateString);
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

  setDefaultDate(): NgbDateStruct {
    var startDate = new Date();
    let startYear = startDate.getFullYear().toString();
    let startMonth = startDate.getMonth() + 1;
    let startDay = "1";

    return this.ngbDateParserFormatter.parse(startYear + "-" + startMonth.toString() + "-" + startDay);
  }
  closeModal() {
    this.activeModal.close();
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
            console.log(this.selectedBrand);
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

  check(value: string,time:string) {
    console.log(time);
    this.slothour = value;
    this.slot_time = time;
  }

  getSlot(Date: string) {
    if (Date) {
      const reqpara5 = {
        requesttype: 'getslots',
        reqdate: Date,
        pickup_drop: 1,
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
            // this.showToast('default', 'No Slot', 'Sorry !! No Slot Unavailable ');
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
  sameas(value) {
    console.log(value);
    this.sameasvalue = value;
    if (value == true) {

      if (this.queue.pickuplocationaddress) {
        this.queue.dropofflocationaddress = this.queue.pickuplocationaddress;
        console.log(this.queue.dropofflocationaddress);
        if (this.queue.pickuplatlong) {
          this.queue.dropofflatlong = this.queue.pickuplatlong;
          console.log(this.queue.dropofflatlong);
        }
      }
    }
    else {
      this.queue.dropofflocationaddress = " ";
      this.queue.dropofflatlong = " ";
    }

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
  some(value) {
    console.log(value);
    this.amb = value;
    console.log(this.amb);

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
  getDetails() {
    const reqpara5 = {
        requesttype: 'getconfirmbookingdetails',
        queueid: this.modalContent.queueid,
        svcid: this.svcid
      }
      const as5 = JSON.stringify(reqpara5)
      this.ServicingService.getSlot(as5).subscribe(res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
         
         this.complaint = res[1].complaints[0];
        //  console.log(this.complaint.idcomplaint);
         this.queue = res[0].queueinfo[0];
         this.selectedModel = this.queue.carsubmodelid;
          this.selectedVariant = this.queue.vehbrand;
          this.selectedcre = this.queue.creid;
          this.queue.pickuplatlong = res[0].queueinfo[0].pickuplat + ',' + res[0].queueinfo[0].pickuplong
          this.queue.dropofflatlong = res[0].queueinfo[0].dropofflat + ',' + res[0].queueinfo[0].dropofflong
          this.getVariants(this.selectedModel);
          this.queue.service_type = res[0].queueinfo[0].servicetype
         console.log(this.selectedcre);
         this.selectedadv = res[0].queueinfo[0].advisorid
         for (let i = 0; i < this.cre.length; i++) {
          if (this.cre[i].id === this.selectedcre) {
            this.selectedcre = this.cre[i].id ;
          }
        }
        for (let i = 0; i < this.serviceadv.length; i++) {
          if (this.serviceadv[i].id === this.selectedadv) {
            this.selectedadv = this.serviceadv[i].id ;
          }
        }
        // for(let j = 0;j < this.itemList.length;j++){
        //   if(this.itemList[j].id === this.complaint.idcomplaint){
        //     const comp_value = this.itemList[j].id ;
        //     // const comp_value1 = this.itemList[j].itemName ;

        //     this.selectedItems.push(comp_value);
        //   }
        // }
        console.log(this.selectedItems )
        if(this.queue.isconfirmed == '1'){
          this.queue.confirm = true;
        }
        else{
          this.queue.confirm = false;
        }
        }
      });
    
  }

  saverange(value: any) {
    console.log(value);
    if (this.sameasvalue == true) {
      this.queue.dropofflocationaddress = value;
      console.log(this.queue.dropofflocationaddress);
      if (this.queue.pickuplatlong) {
        this.queue.dropofflatlong = this.queue.pickuplatlong;
        console.log(this.queue.dropofflatlong);
      }
    }
  }

  
  onSubmit(f: NgForm) { 
    console.log(f.value);
    console.log(f.value.mobile2);
    console.log(this.dateString);
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

    if (f.value.droploc) {
      let x = f.value.droplatlong.split(/[ ,;]+/);
      console.log(x);
      this.dropoff_lat = x[0];
      this.dropoff_long = x[1];
    }
    else{
      this.dropoff_lat = "0";
      this.dropoff_long = "0";
    }

    if (f.value.pickuploc) {
      let y = f.value.picklatlong.split(/[ ,;]+/);
      console.log(y);
      this.pickup_add = f.value.pickuploc;
      this.pikup_lat = y[0];
      this.pikup_long = y[1];
    }
    else {
      this.pickup_add = f.value.droploc;
      this.pikup_lat = this.dropoff_lat;
      this.pikup_long = this.dropoff_long;
    }

    if (this.queue.customermobile2) {
      this.mobile2 = this.queue.customermobile2;
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
    if(this.datecheck)
    {
      this.selecteddate = this.dateString + ' ' + this.slot_time;
    }
    else{
      this.selecteddate = this.queue.queue_time;
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
    const reqpara6 = {
      requesttype: "createbooking",
      vehnumber: f.value.num,
      vehbrand: this.selectedBrand,
      carmodelid: f.value.model,
      carsubmodelid: f.value.variant,
      customername: f.value.salutation1 +'.'+this.titlecasePipe.transform(f.value.Cus_name),
      customermobile1: f.value.mobile1,
      customermobile2: this.mobile2,
      customeremail: f.value.email,
      queuetime: this.selecteddate,
      pickuplocationaddress: this.pickup_add,
      pickuplat: this.pikup_lat,
      pickuplong: this.pikup_long,
      droplocationaddress: f.value.droploc,
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
      complaint: ['1']
    };

    const ua = JSON.stringify(reqpara6);
    console.log(ua);
    this.ServicingService.AddSerivicng(ua).subscribe(data => {
      if (data[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      } else {
        console.log(data);
        this.message = data[0].queue,
          this.disabled = false;
        // this.showLargeModal(this.message[0], this.notes);
       
        this.QueueID = this.message[0].queue_id;
        console.log(this.QueueID);
        // f.reset();
        this.slot_time = "0";
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.pickup_drop = 0;
        this.dateString = "";
        f.reset();
        this.countrycode1 = "+91";
        this.yourBoolean = 'servicing';
        this.user.confirm = true;
        this.dateString = "";
        this.closeQueue();
        this.activeModal.close();
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

  closeQueue(){
    const reqpara1 =
    {
      requesttype: 'closeunconfirmed',
      unconfirmedqueueid:this.queue.queueid,
      confirmedqueueid:this.QueueID
    }
    console.log(reqpara1);
    const ua1 = JSON.stringify(reqpara1);
    console.log(ua1);
    this.ServicingService.AddSerivicng(ua1).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
      console.log(res);
      }
  });
}

}
