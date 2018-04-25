import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User,Ilogin} from '../user';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RouterLink } from '@angular/router';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { OnlyNumber } from '../../number.directive';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(  private toasterService: ToasterService,private http: HttpClient,private router: Router,private _cookieService:CookieService) { }

  user:any = {};
  show = false;
  show1=false;
  show2=false;
  disable=false;
  disable1=false;
  disable3=false;
  public veri=false;
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  public message = "wrong otp";
  public message1 = "not match";
  _url = 'http://m.21north.in/notify/svcwebservice.php';
  ngOnInit() {
  }

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json'})
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

  sendOtp(){
      const reqpara = {
      requesttype: 'send_forgot_otp',
      mobilenumber:this.user.mobile
      }
      const ua = JSON.stringify(reqpara);
      const req = this.http.post(this._url,ua,this.httpOptions).subscribe(response => {
        console.log(response);
        if(parseInt(response[0].otp[0].is_success)){
          console.log('entered')
          this.disable = true;
          this.show=true;
        }
        else{
          console.log('Not entered');
          this.disable = false;
        }
       
      });
   
  }

  verifyOtp(){
    const reqpara1 = {
      requesttype: 'verify_otp',
      mobilenumber:this.user.mobile,
      otp:this.user.otp
      }
      const ua1 = JSON.stringify(reqpara1);
      const req = this.http.post(this._url,ua1,this.httpOptions).subscribe(response => {
        console.log(response[0].otpinfo);
        var verify = response[0].otpinfo[0].is_success
        if(parseInt(verify)){
          console.log('otp entered')
          this.disable1 = true;
          // this.veri=false;
          this.show1=true;
         
          // this.veri = true;
        }
        else{
          console.log('not entered')
          this.disable1=false;
          this.showToast('default', 'Wrong Otp', 'Please Enter Correct otp');
          // this.veri=true;
          this.show1=false;
          
        }
      });
   

  }

  resetPassword(){
    if (typeof this.user.pwd1=="string" && typeof this.user.pwd2=="string" && this.user.pwd1 === this.user.pwd2){
      const reqpara1 = {
        requesttype: 'reset_password_with_otp',
        mobilenumber:this.user.mobile,
        otp:this.user.otp,
        password:this.user.pwd2
        }
        const ua1 = JSON.stringify(reqpara1);
        const req = this.http.post(this._url,ua1,this.httpOptions).subscribe(response => {
          console.log(response);
          this.disable3=true;
          this.showToast('default', 'Change Password', 'Password changed');
          this.router.navigate(['/auth/login']);
        });
    }

    else{
      this.showToast('default', 'Password do not match ', 'Please Enter Correct Password');
      // this.show2=true;
      this.disable3=false;
    }

  }

}
