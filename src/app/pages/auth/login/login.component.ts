import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Ilogin} from '../user';
import { ServicingService } from '../../services/addServicing.service';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  loggedIn = false;
  showAlert = false;

  constructor( private ServicingService: ServicingService,private toasterService: ToasterService,private http: HttpClient,private router: Router,private _cookieService:CookieService) { 
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

private showToast(type: string, title: string, body: string) {
  this.config = new ToasterConfig({
    positionClass: this.position,
    timeout: this.timeout,
    newestOnTop: this.isNewestOnTop,
    tapToDismiss: this.isHideOnClick,
    preventDuplicates: this.isDuplicatesPrevented,
    animation: this.animationType,
    limit: this.toastsLimit,
  });
  const toast: Toast = {
    type: type,
    title: title,
    body: body,
    timeout: this.timeout,
    showCloseButton: this.isCloseButton,
    bodyOutputType: BodyOutputType.TrustedHtml,
  };
  this.toasterService.popAsync(toast);
}

goTo(){
  this.router.navigate(['auth/forgot']);
}
closeAlert(){
  this.showAlert = false;
}
 getSession(){
  this.ServicingService.session().subscribe(res =>{
    console.log(res)
    console.log(res["sId"]);
    sessionStorage.setItem('token',res["sId"]);
    sessionStorage.setItem('auth-user',res["userName"]);
    this.ServicingService.setter(res["sId"]);
  });
}

  onSubmit({ value, valid }: { value: Ilogin, valid: boolean }) {
            sessionStorage.clear();
            localStorage.clear();
            this.getSession();
            this.showAlert = false;
            const reqpara = {
                requesttype: 'login',
                mobile: value.mobile,
                password: value.password,
         }
        const ua = JSON.stringify(reqpara);
        const req = this.http.post('http://m.21north.in/notify/svcwebservice.php',ua,this.httpOptions)
          .subscribe(response => {
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
       }
     );
  }

 Remmeber(value){
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

getname(value){console.log(value);}

}
