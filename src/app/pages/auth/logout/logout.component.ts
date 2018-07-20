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
    // this.Simplelogout();  //working Fine
    this.LogoutDest();
    // this.Destlogout();
    // this.Eventlogout();
    // this.destroySession();
  }

  //Header for Easy Auto Destroy Session API
  public EasyAuto={
    headers: new HttpHeaders({'x-auth-token': sessionStorage.getItem('token'),'x-auth-user':sessionStorage.getItem('auth-user'),'Content-Type':  'application/json'})
  }

  //Logout Function
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



  // Destlogout(){
  //   const data = {};
  //   this.http.post('https://plsuat.europassistance.in:444/destroysession',data,this.opt1).subscribe(res=>{
  //     this.service.logout().subscribe(res1=> {
  //            console.log(res1);
  //            sessionStorage.clear();
  //             localStorage.clear();
  //             this.router.navigate(['auth/login']);
  //          })
  //       })
  //   }

    //  Eventlogout(){
    //    this.service.logout().subscribe((event: HttpEvent<any>)  =>  {
    //      console.log(event)
    //     switch (event.type) {
    //       case HttpEventType.Sent:
    //         console.log('Request sent!', HttpEventType.Sent);
    //         break;
    //       case HttpEventType.ResponseHeader:
    //         console.log('Response header received!', HttpEventType.ResponseHeader);
    //         break;
    //       case HttpEventType.Response:
    //         console.log('😺 Done!', event.body, HttpEventType.Response);
    //     }
    //   });
    //  }
    
    //  Simplelogout(){
    //    this.service.logout().subscribe(res => {
    //      console.log("logout works");
    //      this.router.navigate(['auth/login']);
    //    })
    //  }

    // destroySession(){
    //   this.service.destroySession().subscribe(res => {
    //     console.log(res);
    //   });
    // }

  }


