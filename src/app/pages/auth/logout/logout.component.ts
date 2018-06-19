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
   
    console.log("I am called");

    this.logout();
    
  }

//   logout(){
//  console.log("This is logout function")
//     this.service.destroySession().subscribe(res => { 
//       this.service.logout().subscribe(response => {
//         console.log('destroySession');
//         sessionStorage.clear();
//         localStorage.clear();
       
//       });
//       this.router.navigate(['auth/login']);
   
      
//     });
    
//   }

public opt1={
  headers: new HttpHeaders({'x-auth-token': sessionStorage.getItem('token'),'x-auth-user':sessionStorage.getItem('auth-user'),'Content-Type':  'application/json'})
  
}
  logout(){
    const data = {};
    this.http.post('https://plsuat.europassistance.in:444/destroysession',data,this.opt1).subscribe(res=>{
      this.service.logout().subscribe(res => {
             console.log(res);
             sessionStorage.clear();
              localStorage.clear();
              this.router.navigate(['auth/login']);
           })
    })

       
     }

    //  logout(){
    //    this.service.logout().subscribe(res => {
    //      console.log(res);
    //    })
    //  }
    
    // destroySession(){
    //   this.service.destroySession().subscribe(res => {
    //     console.log(res);
    //   });
    // }

  }


