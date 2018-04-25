import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServicingService } from '../services/addServicing.service';
// import {multi1, multi} from './data';
import { DatePipe } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { NgbModal ,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { OptionComponent } from './option/option.component';
import { LegalComponent } from './legal/legal.component';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpRequest} from '@angular/common/http';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

  public cards :any=[];
  public pickup : any=[];
  public dropoff:any=[];
  public notification :any=[];
  public svcname:string;
  public accname:string;
  public accnumber:string;
  public globalsvcid:string;
  public selectedsvcid:string;
  single: any[];
  // multi: any
  // multi1: any
  // multi2: any
  public multi:any = [];
  public multi1:any = [];
  public multi2:any = [];
  svcid:string;
  view: any[] = [700, 400];
  starRate = 2;
  heartRate = 4;
  rating:number;
// options
   today:string;
   pastdate:string;
   changedsvc:string;
  showXAxis = true;
  showYAxis = true;
  visibleheader = false;
  gradient = false;
  showLegend = true;
  showLegend1 = true;
  showLabels = false;
  showXAxisLabel = true;
  xAxisLabel = 'Slot Timings';
  showYAxisLabel = true;
  currentRate = 4.93;
  yAxisLabel = 'Slot Count';
  autoScale = true;
  svcadmin:string;
  checksvcadmin :boolean;
  checkgrpadmin :boolean;
  groupadmin:string;
  terms:string;
  results = [
    { name: 'Awaiting Amb', value: 10 },
    { name: 'Active', value: 30 },
    { name: 'Awaiting CheckedIn', value: 40 },
    { name: 'CheckedIn', value: 20 },
  ];

  results1 = [
    { name: 'Awaiting Amb', value: 20 },
    { name: 'Active', value: 30 },
    { name: 'Awaiting CheckedIn', value: 10 },
    { name: 'CheckedIn', value: 40 },
  ];
  themeSubscription: any;
  colorScheme = {
    domain: ['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789']
  };
  colorScheme1 = {
    domain:['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789']
  };
  view1: any[] = [500, 300];

  ngOnInit() {

    this.getSession();

    this.terms = JSON.parse(sessionStorage.getItem('terms'));
    this.svcadmin = JSON.parse(sessionStorage.getItem('svcadmin'));
    console.log(this.svcadmin);
    this.groupadmin = JSON.parse(sessionStorage.getItem('groupadmin'));
    console.log(this.groupadmin);
    if(this.svcadmin == "1"){
      this.checksvcadmin = true;
    }
    else{
      this.checksvcadmin = false;
    }
    if(this.groupadmin == "1"){
      this.checkgrpadmin = true;
    }
    else{
      this.checkgrpadmin = false;
    }
    var date = new Date();
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.today)
    var numberOfDays = 1;
    var days = date.setDate(date.getDate() - numberOfDays);
    this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    console.log(this.pastdate)
    if(sessionStorage.getItem('selectedsvc')){
      // console.log(sessionStorage.getItem('selectedsvc'));
      this.svcid = sessionStorage.getItem('selectedsvc');
      // console.log(this.svcid);
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      // console.log(this.svcid);
    }
    if(sessionStorage.getItem('changedsvc')){
        this.visibleheader = true;
        this.changedsvc = sessionStorage.getItem('changedsvc');
    }
    else{
      this.visibleheader = false;
    }
    this.svcname = JSON.parse(sessionStorage.getItem('svcname'));
    console.log(this.svcname);
   
    if(sessionStorage.getItem('selectedsvc')){
      console.log(sessionStorage.getItem('selectedsvc'));
    }
    this.globalsvcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
    console.log(this.globalsvcid);
    this.getData();
    this.getSlotPerformancedrop();
    this.getSlotPerformancePickup();
    this.getSlotUti();
    if(this.terms == "0"){
      this.getterms();
    }
    Object.assign(this.multi) 
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: ['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789'],
      };
    });
    Object.assign(this.multi1) 
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: ['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789'],
      };
    });
    Object.assign(this.multi2) 
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: ['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789'],
      };
    });
 
  }

  constructor(private datePipe: DatePipe,private http:HttpClient,private router:Router,private service:ServicingService,private modalService: NgbModal,private theme: NbThemeService){
  }
  onSelect(event) {
    console.log(event);
  }

  getData(){
    const reqpara1 = 
         {
           requesttype: 'dashboard',
           svcid:this.svcid
         }
      const as1 = JSON.stringify(reqpara1)
      this.service.getBrands(as1).subscribe
       (res => 
         {
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
             this.cards=res[0].cards[0],
             console.log(this.cards);
             if(this.cards.cust_rating == null){
              this.rating = 0;
              
             }
             else{
              this.rating = JSON.parse(this.cards.cust_rating);
              console.log(this.rating);
             }
             console.log(this.cards.queue_average);
             this.pickup=res[1].pickup_details,
             console.log(this.pickup);
             this.dropoff=res[2].drop_details,
             console.log(this.dropoff)
             this.notification=res[3].notification[0];
             console.log(this.notification);
           }
          
         }
       );
   }

  getSession(){
    this.service.session().subscribe(res =>{
      console.log(res)
      console.log(res["sId"]);
      localStorage.setItem('token',res["sId"]);
      localStorage.setItem('auth-user',res["userName"]);
      this.service.setter(res["sId"]);
    });
  }


   getsvclist() {
    const activeModal = this.modalService.open(OptionComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Select Service Centre';
  }

  getterms() {
    const activeModal = this.modalService.open(LegalComponent, { size: 'lg', container: 'nb-layout' , backdrop : 'static',
    keyboard : false});

    activeModal.componentInstance.modalHeader = 'Terms and Condition';
  }

  getSlotPerformancePickup(){

    const reqpara1 = 
         {
          svcid:this.svcid,
          puord:0,
          mtd:0,
          datevar:this.pastdate
         }
      const as1 = JSON.stringify(reqpara1)
      this.service.slot(reqpara1).subscribe
       (res => 
         {
          //  console.log(res[0].login);
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
            this.multi2 = res;
           }
          
         }
       );

  }

  getSlotPerformancedrop(){

    const reqpara1 = 
         {
          svcid:this.svcid,
          puord:1,
          mtd:0,
          datevar:this.pastdate
         }
      const as1 = JSON.stringify(reqpara1)
      this.service.slot(reqpara1).subscribe
       (res => 
         {
          //  console.log(res[0].login);
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
            this.multi = res;
           }
          
         }
       );

  }


  getSlotUti(){

    const reqpara1 = 
         {
          svcid:this.svcid,
          puord:0,
          mtd:1,
          datevar:this.pastdate
         }
      const as1 = JSON.stringify(reqpara1)
      this.service.graphCall(as1).subscribe
       (res => 
         {
          //  console.log(res[0].login);
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
            this.multi1 = res;
           }
          
         }
       );

  }
}



