import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServicingService } from '../services/addServicing.service';
import { DatePipe } from '@angular/common';
import { NbThemeService } from '@nebular/theme';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { OptionComponent } from './option/option.component';
import { LegalComponent } from './legal/legal.component';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

  //variables
  Cards :any=[];
  PickupPieChart : any=[];
  DropoffPieChart:any=[];
  Notification :any=[];
  SvcName:string;
  barRate:number;
  barRateNull:number;
  public DataGraphDropOff:any = [];
  public MtdData:any = [];
  public DataGraphPickup:any = [];
  SvcId:string;
  GraphView: any[] = [700, 400];
  PieChartView: any[] = [400, 300];
  Rating:number;
  pastdate:string;
  ChangedSvc:string;
  showXAxis = true;
  showYAxis = true;
  VisibleHeader = false;
  gradient = false;
  showLegend = true;
  showLabels = false;
  showXAxisLabel = true;
  xAxisLabel = 'Slot Timings';
  showYAxisLabel = true;
  yAxisLabel = 'Slot Count';
  autoScale = true;
  ShowPickupPie = true;
  ShowDropoffPie = true;
  SvcAdmin:string;
  CheckSvcAdmin :boolean = false;
  CheckGrpAdmin :boolean = false;
  GroupAdmin:string;
  ShowAgreement:string;
  themeSubscription: any;
  prepaid_amount:string;
  show_add_credit:string;
  colorScheme = {
    domain: ['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789']
  };

 
  ngOnInit() {
    setInterval(() => {
      console.log("5 sec timer");
     this.prepaid_credit_updation();
     }, 30000);
     this.GetDashboardData();
    this.ShowAgreement = JSON.parse(sessionStorage.getItem('terms'));
    this.SvcAdmin = JSON.parse(sessionStorage.getItem('svcadmin'));
    this.GroupAdmin = JSON.parse(sessionStorage.getItem('groupadmin'));
    if(this.SvcAdmin == "1"){
      this.CheckSvcAdmin = true;
    }
    if(this.GroupAdmin == "1"){
      this.CheckGrpAdmin = true;
    }

    var date = new Date();
    var days = date.setDate(date.getDate() - 1);
    this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    if(sessionStorage.getItem('changedsvc')){
        this.VisibleHeader = true;
        this.ChangedSvc = sessionStorage.getItem('changedsvc');
    }
    else{
      this.VisibleHeader = false;
    }
    this.SvcName = JSON.parse(sessionStorage.getItem('svcname'));
    this.GetDashboardData();
    this.GetSlotPerformancePickup();
    this.GetSlotPerformanceDrop();
    this.GetMtd();
    if(this.ShowAgreement == "0"){
      this.GetTerms();
    }
    Object.assign(this.DataGraphDropOff) 
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: ['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789'],
      };
    });
    Object.assign(this.MtdData) 
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: ['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789'],
      };
    });
    Object.assign(this.DataGraphPickup) 
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: ['#ffa239', '#c8e6c9', '#81c784', '#4caf50','#ffe789'],
      };
    });
 
  }

  constructor(private datePipe: DatePipe,
    private router:Router,
    private service:ServicingService,
    private modalService: NgbModal,
    private theme: NbThemeService){
      this.barRate = 4;
      this.barRateNull = 0;
  }

  onSelect(event) {  }

  //Get Color Legends for Dropoff Pie Chart
  GetColorDropOff(country) { 
    switch (country) {
      case 'Awaiting':
        return '#ffa239';
      case 'To Service Centre':
        return '#c8e6c9';
      case 'To Customer':
        return '#81c784';
      case 'Active Dropoff':
        return '#4caf50';
      case 'Delivered Today':
        return '#ffe789';
    }
  }

  //Get Color Legends for Pickup Pie Chart
  GetColorPickup(country) { 
    switch (country) {
      case 'Awaiting':
        return '#ffa239';
      case 'Active Pickup':
        return '#c8e6c9';
      case 'Not Checked in':
        return '#81c784';
      case 'Checked In':
        return '#4caf50';
      case 'Picked Up Today':
        return '#ffe789';
    }
  }

  //GetDashBoardData
  GetDashboardData(){
    const DashReq = {
           requesttype: 'dashboard',
           svcid:this.SvcId
         }
      const Req = JSON.stringify(DashReq)
      this.service.webServiceCall(Req).subscribe
       (res => {
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
             if(res[0].cards.length > 0){
                this.Cards=res[0].cards[0];
                this.Rating = JSON.parse(this.Cards.cust_rating);
              }
             else {
               this.Cards = "0";
              }
             if(this.Cards.cust_rating == null){
              this.Rating = 0;
             }
             else{
               if(this.Cards.cust_rating == ""){
                this.Rating = 0;
               }
               else{
                this.Rating = JSON.parse(this.Cards.cust_rating);
               }
              
             }
             this.PickupPieChart = res[1].pickup_details;
             if(this.PickupPieChart[0].value === "0" && this.PickupPieChart[1].value === "0" && this.PickupPieChart[2].value === "0" && this.PickupPieChart[3].value === "0" && this.PickupPieChart[4].value === "0"){
              this.ShowPickupPie = false;
             }
             this.DropoffPieChart=res[2].drop_details;
             if(this.DropoffPieChart[0].value === "0" && this.DropoffPieChart[1].value === "0" && this.DropoffPieChart[2].value === "0" && this.DropoffPieChart[3].value === "0" && this.DropoffPieChart[4].value === "0"){
              this.ShowDropoffPie = false;
             }
             this.Notification=res[3].notification[0];
             this.prepaid_amount = res[4].prepaid[0].pre_paid;
             this.show_add_credit = res[4].prepaid[0].show_add_credit;
            //  console.log(this.prepaid_amount,"credit amount");
              this.service.sendMessage(this.prepaid_amount,this.show_add_credit);
              // this.service.sendMessage('8999');
           }
        });
   }



   //Open Modal For Service centre selection
   GetSvcList() {
    const activeModal = this.modalService.open(OptionComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Select Service Centre';
  }

  //Open Get Terms Modal
  GetTerms() {
    const activeModal = this.modalService.open(LegalComponent, { size: 'lg', container: 'nb-layout' , backdrop : 'static',
    keyboard : false});
    activeModal.componentInstance.modalHeader = 'Terms and Condition';
  }

  //API Call for Pickup Stacked Graph
  GetSlotPerformancePickup(){
      const reqpara1 = {
          svcid:this.SvcId,
          puord:0,
          mtd:0,
          datevar:this.pastdate
         }
      const as1 = JSON.stringify(reqpara1)
      this.service.slot(reqpara1).subscribe
       (res =>  {
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
            this.DataGraphPickup = res;
           }
        });
      }

 //API Call for DropOff Stacked Graph     
GetSlotPerformanceDrop(){
      const reqpara1 = {
          svcid:this.SvcId,
          puord:1,
          mtd:0,
          datevar:this.pastdate
         }
      const as1 = JSON.stringify(reqpara1)
      this.service.slot(reqpara1).subscribe
       (res => {
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
            this.DataGraphDropOff = res;
           }
         });
        }

//API Call for Trend Graph
  GetMtd(){
      const reqpara1 =  {
          svcid:this.SvcId,
          puord:0,
          mtd:1,
          datevar:this.pastdate
         }
      const as1 = JSON.stringify(reqpara1)
      this.service.graphCall(as1).subscribe
       (res =>  {
            if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
            this.MtdData = res;
           }
        });
      }

      prepaid_credit_updation(){
        const reqpara1 ={
          requesttype: "prepaid_balance",
          svcid: this.SvcId
        }
      const as1 = JSON.stringify(reqpara1)
      this.service.webServiceCall(as1).subscribe
        (res => {
          if (res[0].login === 0) {
            sessionStorage.removeItem('currentUser');
            this.router.navigate(['/auth/login']);
          }
          else {
            var credit = res[0].balance[0].prepaid_balance;
            var show_credit_btn = res[0].balance[0].show_add_credit;
            // console.log(show_credit_btn);
            sessionStorage.setItem('credit',credit);
            this.service.sendMessage(credit,show_credit_btn);
          }
        });
}

}

