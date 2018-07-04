import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Ilogin} from '../user';
import { ServicingService } from '../../services/addServicing.service';
import {HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn = false;
  showAlert = false;

  constructor( private ServicingService: ServicingService,
              private router: Router,
              private _cookieService:CookieService) { 
      if(_cookieService.get('mobile')){
        this.user.mobile=this._cookieService.get('mobile');
        this.user.password=this._cookieService.get('password');
    }
  }
  
  ngOnInit() {}

  user:Ilogin={
    mobile:'',
    password:''
   }

  public httpOptions = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
  withCredentials: true
};


//Go to forgot Password Page
GoToForgot(){
  this.router.navigate(['auth/forgot']);
}

//Closes Error Notification
CloseAlert(){
  this.showAlert = false;
}

//Easy auto get Session API
 GetSession(){
  this.ServicingService.session().subscribe(res =>{
    sessionStorage.setItem('token',res["sId"]);
    sessionStorage.setItem('auth-user',res["userName"]);
    this.ServicingService.setter(res["sId"]);
  });
}

//On click of Login Button
  OnSubmit({ value, valid }: { value: Ilogin, valid: boolean }) {
            sessionStorage.clear();
            localStorage.clear();
            this.GetSession();
            this.showAlert = false;
            const LgnReqpara = {
                requesttype: 'login',
                mobile: value.mobile,
                password: value.password,
         }
        const LgReq = JSON.stringify(LgnReqpara);
        this.ServicingService.Login(LgReq).subscribe(response => {
              console.log(response[0].login[0].hasOwnProperty('userid'));
              if(response[0].login[0].hasOwnProperty('userid')){
                sessionStorage.setItem('currentUser',JSON.stringify(response[0]));
                sessionStorage.setItem('globalsvcid',JSON.stringify(response[0].login[0].svcid));
                sessionStorage.setItem('svcname',JSON.stringify(response[0].login[0].svcname));
                sessionStorage.setItem('terms',JSON.stringify(response[0].login[0].terms_status));
                sessionStorage.setItem('city_id',response[0].login[0].city_id);
                sessionStorage.setItem('city_name',JSON.stringify(response[0].login[0].city_name));
                sessionStorage.setItem('credit',JSON.stringify(response[0].login[0].balance_credits));
                sessionStorage.setItem('svcadmin',JSON.stringify(response[0].login[0].issvcadmin));
                sessionStorage.setItem('groupadmin',JSON.stringify(response[0].login[0].isgroupadminvar));
                sessionStorage.setItem('brandid',response[0].login[0].brand_id);
                console.log(response[0].login[0].first_name);
                sessionStorage.setItem('username',(response[0].login[0].first_name));
                sessionStorage.setItem('User',value.mobile);
                this.router.navigate(['/pages']);
            }  
          else if (response[0].login[0].hasOwnProperty('failed')){
            this.showAlert = true;
        }
      },
     (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
           console.log("Client-side error occured.");
         }
       else {
         console.log("Server-side error occured.");
         }
       });
  }

  //Called when Remember Checkbox is checked
  RememberMe(value){
  console.log(value);
  if(value == true){
  console.log('true');
  this._cookieService.set('mobile',this.user.mobile);
  this._cookieService.set('password',this.user.password);
 }
 else{
   console.log('false');
 }
}
}

