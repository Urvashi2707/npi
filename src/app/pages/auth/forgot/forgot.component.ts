import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServicingService} from '../../services/addServicing.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private toasterService: ToasterService,
    private router: Router,
    private service : ServicingService
    ) { }

  //variables declaration
  user:any = {};
  showOtpSection = false;
  ShowPasswordSection=false;
  ShowMessage=false;
  DisableOtpButton=false;
  DisableVerifyButton=false;
  DisablePasswordButton=false;
  public message = "wrong otp";
  public NotMatchMsg = "not match";
  //Toaster Config
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  config: ToasterConfig;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;

  ngOnInit() {}

  private ShowToast(type: string, title: string, body: string) {
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

  //Send OTP Function
  SendOtp(){
      const OtpReqpara = {
      requesttype: 'send_forgot_otp',
      mobilenumber:this.user.mobile
      }
      const OtpReq = JSON.stringify(OtpReqpara);
      this.service.ForgotPassword(OtpReq).subscribe(response => {
        if(parseInt(response[0].otp[0].is_success)){
          this.DisableOtpButton = true;
          this.showOtpSection=true;
        }
        else{
          this.DisableOtpButton = false;
        }
       });
    }

    //verify OTP Function
  VerifyOtp(){
    const VerifyReqpara = {
      requesttype: 'verify_otp',
      mobilenumber:this.user.mobile,
      otp:this.user.otp
      }
      const VrfReq = JSON.stringify(VerifyReqpara);
      this.service.ForgotPassword(VrfReq).subscribe(response => {
        var verify = response[0].otpinfo[0].is_success
        if(parseInt(verify)){
          this.DisableVerifyButton = true;
          this.ShowPasswordSection=true;
        }
        else{
          this.DisableVerifyButton=false;
          this.ShowToast('default', 'Wrong Otp', 'Please Enter Correct otp');
          this.ShowPasswordSection=false;
          }
      });
   }

   //Reset Password API Function
  ResetPassword(){
    if (typeof this.user.pwd1=="string" && typeof this.user.pwd2=="string" && this.user.pwd1 === this.user.pwd2){
      const ResetReqpara = {
        requesttype: 'reset_password_with_otp',
        mobilenumber:this.user.mobile,
        otp:this.user.otp,
        password:this.user.pwd2
        }
        const RstReq = JSON.stringify(ResetReqpara);
        this.service.ForgotPassword(RstReq).subscribe(response => {
          this.DisablePasswordButton=true;
          this.ShowToast('default', 'Change Password', 'Password changed');
          this.router.navigate(['/auth/login']);
        });
    }
   else{
      this.ShowToast('default', 'Password do not match ', 'Please Enter Correct Password');
      this.DisablePasswordButton=false;
    }
  }
}
