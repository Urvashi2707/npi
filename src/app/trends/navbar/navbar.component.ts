import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {ServicingService} from '../../pages/services/addServicing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //variable
  brandid:string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private service: ServicingService
  ) { }

  ngOnInit() {
    this.brandid = sessionStorage.getItem('brandid');
    // this.brandid = '29';
  }

   //Get Color Legends for Dropoff Pie Chart
   GetBrandColor(brandid) { 
    switch (brandid) {
      case '19':
        return '#0D55F1';
      case '29':
        return '#c8e6c9';
      case '45':
        return '#81c784';
      case '66':
        return '#4caf50';
      case '87':
        return '#ffe789';
    }
  }

  public EasyAuto={
    headers: new HttpHeaders({'x-auth-token': sessionStorage.getItem('token'),'x-auth-user':sessionStorage.getItem('auth-user'),'Content-Type':  'application/json'})
  }

  LogoutDest(){
    const data1 = {};
      this.service.logout().subscribe(response => {
        sessionStorage.clear();
        localStorage.clear();
        this.http.post('https://plsuat.europassistance.in:444/destroysession',data1,this.EasyAuto).subscribe(res=>{
        console.log('inside dest-logout');
        this.router.navigate(['auth/login']);
       },
       (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.router.navigate(['auth/login']);
        }
        else {
          this.router.navigate(['auth/login']);
        }
      });
    });
  }

}
