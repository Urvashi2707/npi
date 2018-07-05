import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServicingService } from '../../services/addServicing.service';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpRequest} from '@angular/common/http';

@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})

export class WeatherComponent implements OnInit{

  public cards :any=[];
  public pickup : any=[];
  public dropoff:any=[];
  public notification :any=[];
  public message:string="31";
  svcid:string;
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
    this.getData();
  }

  constructor(private http:HttpClient,private router:Router,private service:ServicingService){}

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
           console.log(res[0].login);
           if(res[0].login === 0){
             sessionStorage.removeItem('currentUser');
             this.router.navigate(['/auth/login']);
           }
           else{
            if(res[0].cards[0] > 0){
              this.cards=res[0].cards[0];
             
           }
           else {
            console.log('No card details');
           }
             this.pickup=res[1].pickup_details,
             this.dropoff=res[2].drop_details,
             this.notification=res[3].notification[0];
           }
          
         }
       );
   }
}
