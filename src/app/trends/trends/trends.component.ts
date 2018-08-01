import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../pages/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent implements OnInit {

  //variables
  cityList:any = [];
  user:any;

  constructor(private ServicingService: ServerService,private router: Router,) {}

  ngOnInit() {
    this.getCity();
  }


  getCity() {
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

}
