import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User,Ilogin} from '../user';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { OnlyNumber } from '../../number.directive';
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
  constructor( private toasterService: ToasterService,private http: HttpClient,private router: Router,private _cookieService:CookieService) { 
    if(_cookieService.get('mobile')){
      this.user.mobile=this._cookieService.get('mobile');
      this.user.password=this._cookieService.get('password');
   }
  }
  loggedIn = false;
  ngOnInit() {
    console.log('hii');
    this._cookieService.set('test','cookie_testing');
  }

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

 // public  options = new RequestOptions({ headers: this.httpOptions});

  onSubmit({ value, valid }: { value: Ilogin, valid: boolean }) {

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
        sessionStorage.setItem('city_name',JSON.stringify(response[0].login[0].city_name));
        sessionStorage.setItem('terms',JSON.stringify(response[0].login[0].terms_status));
        // sessionStorage.setItem('terms',"0");
        // sessionStorage.setItem('accmanager',JSON.stringify(response[0].login[0].account_manager_name));
        // sessionStorage.setItem('managernumber',JSON.stringify(response[0].login[0].account_manager_mobile));
        sessionStorage.setItem('svcadmin',JSON.stringify(response[0].login[0].issvcadmin));
        sessionStorage.setItem('groupadmin',JSON.stringify(response[0].login[0].isgroupadminvar));
        console.log(response[0].login[0].first_name);
        sessionStorage.setItem('username',(response[0].login[0].first_name));
        sessionStorage.setItem('User',value.mobile);
        this.router.navigate(['/pages']);
       }
       else if (response[0].login[0].hasOwnProperty('failed')){
        this.showToast('default', 'Wrong Mobile number or Password', 'Please Enter Mobile number or Password');
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
   // this.form.reset();
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

getname(value){
  console.log(value);
}
}
