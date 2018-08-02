import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../pages/services/user.service';
import { Router } from '@angular/router';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  //variables
  cityList:any = [];
  user: any = {};
  brandid:string;
  type_of_service:any= [];
  List:any = [];
  defaultCity:any;
  last_n_months :any = [];
  is_default:boolean = true;
  selectedCity:any;

  constructor(private ServicingService: ServerService,private router: Router, private http: HttpClient,private spinner: NgxSpinnerService) {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }

  ngOnInit() {
    this.getCurrentMonth();
    console.log(this.getLastMonths(10));
    this.brandid = sessionStorage.getItem('brandid');
    this.getCity();
    // this.getData("148");
    this.type_of_service = [{
      "id":0,
      "service":"Pickup",
    },
    {
      "id":1,
      "service":"Dropoff",
    }];
    this.user.service =  this.type_of_service[0].id;

  }

  // ngAfterViewInit(){
  //   console.log("After Init");
  //   this.getCity();
  // }

  getCity() {
    const reqpara1 ={
        requesttype: 'getcitylist',
      }
    const as1 = JSON.stringify(reqpara1);
    this.ServicingService.webServiceCall(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.cityList = res[0].citylist;
          this.cityList.sort();
          // console.log("sort", this.cityList[0].cityName.sort());
          let city_sort = this.cityList; 
           let fld = 'cityname';
            console.log(this.cityList.sort((a, b) => (a[fld] || "").toString().localeCompare((b[fld] || "").toString())));

          console.log("trend",this.cityList);
          this.defaultCity = this.cityList[0];
          this.user.city = this.cityList[0].cityid;
          console.log("default",this.defaultCity);
          this.getData(this.defaultCity.cityid);
          for(var i = 0; i < this.cityList.length;i++){
            if(this.cityList[i].cityid == this.defaultCity.cityid ){
              this.selectedCity = this.cityList[i];
              console.log("selectedcity",this.selectedCity)
            }
          }
        }
      });
  }

  getData(cityid){
    this.List = [];
    const reqpara2 ={
      requesttype: 'gettrend',
      cityid:cityid,
      brandid:this.brandid,
      puord:"0"
    }
    const as2 = JSON.stringify(reqpara2);
    this.ServicingService.webServiceCall(as2).subscribe(res =>{
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.List = res[0].trends;
        this.spinner.hide();
        console.log(this.List);
      }
    })

}

onServiceType($event){
  console.log($event.target.value);
  this.spinner.show();
  this.getData(this.user.city);
  
}

onCityChange($event){
  this.is_default = false;
  console.log($event.target.value);
  this.spinner.show();
  this.getData($event.target.value);
  for(var i = 0; i < this.cityList.length;i++){
    if(this.cityList[i].cityid == $event.target.value ){
      this.selectedCity = this.cityList[i];
      console.log("selectedcity",this.selectedCity)
    }
  }
}

getCurrentMonth(){
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var d = new Date();
  var n = d.getMonth();
  console.log(monthNames[d.getMonth()]);
}

getLastMonths(n) {
  var m =['January','February','March','April','May','June','July','August','September','October','November','December'];
  // var last_n_months =[]
  var d = new Date()
  for(var i=0;i<n;i++){
    this.last_n_months[i] = m[d.getMonth()]+ ' - ' + d.getFullYear().toString()
    d.setMonth(d.getMonth()-1)
  }
  return this.last_n_months
}


}
