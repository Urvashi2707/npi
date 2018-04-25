import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {ServicingService} from '../../services/addServicing.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,private service : ServicingService,private http:HttpClient) { }

  ngOnInit() {
    console.log('logout');
    this.logout();
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.service.logout().subscribe(res => {
      console.log(res);
      this.router.navigate(['pages/logout']);
    });
    

  }

}
