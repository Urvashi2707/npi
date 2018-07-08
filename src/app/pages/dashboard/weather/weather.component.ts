import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServicingService } from '../../services/addServicing.service';

@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})

export class WeatherComponent implements OnInit{

  //variables
  Cards :any=[];
  PickupDetails : any=[];
  DropoffDetails:any=[];
  Notification :any=[];
  message:string="31";
  SvcId:string;

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.getDashboardData();
  }

  constructor(private router:Router,private service:ServicingService){}

  navigatePaused(){
    this.router.navigate(['pages/paused']);
  }

  navigateMishap(){
    this.router.navigate(['pages/mishaps']);
  }

  navigateCancelled(){
    this.router.navigate(['pages/cancelled']);
  }

  navigateNotCheckedin(){
    this.router.navigate(['pages/notcheckedin']);
  }

  getDashboardData(){
    const DashReq = {
           requesttype: 'dashboard',
           svcid:this.SvcId
         }
      const DashRq = JSON.stringify(DashReq)
      this.service.webServiceCall(DashRq).subscribe
       (res => {
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
            this.PickupDetails=res[1].pickup_details,
            this.DropoffDetails=res[2].drop_details,
            this.Notification=res[3].notification[0];
            if(res[0].cards[0] > 0){
              this.Cards=res[0].cards[0];
            }
           else {}
            }
         }
       );}
}
