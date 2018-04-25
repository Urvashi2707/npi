import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IServicing} from '../../model/AddServicing';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OnlyNumber } from '../../number.directive';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { ServicingService } from '../../services/addServicing.service';
@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html',
  styleUrls: ['./rsa.component.scss']
})
export class RsaComponent implements OnInit {

  public selectedBrand: any = [];
  public selectedModel: any = [];
  public selectedVariant: any = [];
  private brands: any = [];
  private Models: any = [];
  private Variant: any = [];
  registrationNumber:string;
  private serviceType: string[];
  private TowingTruck: string[];
  private creName: string[];
  cust_details:any={};
  showstep1 = false;
  showstep2 = false;
  public svc: boolean = true;
  public yourBoolean : string = 'onSpot' ; 
  user:any = {};
  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;
  svcid:string;
  config: ToasterConfig;
  public startDate;
  public minDate;
  public maxDate;
  public salutation:any;
  public globalsvcid:string;
  public selectedsvcid:string;
  position = 'toast-top-full-width';
  animationType = 'fade';
  timeout = 5000;
  toastsLimit = 5;
  slothour:string;

  constructor( private toasterService: ToasterService, private router: Router,private ServicingService: ServicingService,) { }

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      // console.log(sessionStorage.getItem('selectedsvc'));
      this.svcid = sessionStorage.getItem('selectedsvc');
      // console.log(this.svcid);
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      // console.log(this.svcid);
    }
    this.TowingTruck =  ['Flat bed', 'Winch'];
    this.serviceType =  ['Flat Tyre', 'Jump Start', 'Lock out','Out of Gas','Others'];
    this.creName = ['Rohnit','Mohit','Nitin','Add CRE'];
  }

  getModelds(ModelId: number) {
    const reqpara2 = {
      requesttype: 'getmodels',
      brandid: this.selectedBrand
    }
    const as2 = JSON.stringify(reqpara2)
    this.ServicingService.getModels(as2).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Models = res[0].models,
          console.log(this.Models);


      }

    });
  }
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
  getBrands() {
    const reqpara1 =
      {
        requesttype: 'getbrands',
        svcid:this.svcid
      }
    const as1 = JSON.stringify(reqpara1)
    this.ServicingService.getBrands(as1).subscribe
      (res => {
        console.log(res[0].login);
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.brands = res[0].brands,
            this.selectedBrand = this.brands[0].brand_id;
            this.getModelds(this.selectedBrand);
         
        }

      }
      );
  }

  eligibiltycheck1(){
    const reqpara0 =
    {
      requesttype: 'geteligibilitycheckstepone',
      customerMobileNumber:this.user.mobile1,
      vehicleRegNumber:this.registrationNumber,
      typeofservice:1
    }
    console.log(reqpara0);
    const as0 = JSON.stringify(reqpara0);
    this.ServicingService.check(as0).subscribe(
      res => {
        console.log(res[0].eligible);
        console.log(res[0].eligible[0].eligible);
        const eligible = res[0].eligible[0].eligible;
        if(JSON.parse(eligible)){
          console.log("true");
          this.showstep1 = true;
        }
        else{
          console.log("false");
          this.showstep2 = true;
          this.showToast('Message', 'Not Eligible ', 'Customer is not Eligible for step 2');
        }
      }
    )
  }

  skip(){
    this.showToast('Message', 'Skip Message', 'Customer will not be eligilble for any benefits');
    this.showstep2 = true;
  }


  eligibiltycheck2(){
    const reqpara01 =
    {
      requesttype: 'geteligibilitychecksteptwo',
      customerMobileNumber:this.user.mobile1,
      vehicleRegNumber:this.registrationNumber,
      typeofservice:1,
      policynumber:this.user.policy,
      vinnumber:this.user.vin
    }
    console.log(reqpara01);
    const as01 = JSON.stringify(reqpara01);
    this.ServicingService.check(as01).subscribe(
      res => {
        console.log(res[0].eligible);
        console.log(res[0].eligible[0].eligible);
        const eligible = res[0].eligible[0].eligible;
        if(JSON.parse(eligible)){
          console.log("true");
          this.showstep2 = true;
        }
        else{
          console.log("false");
          this.showstep2 = true;
        }
      }
    )
  }

  getVariants(VariantId: number) {
    const reqpara3 = {
      requesttype: 'getvariants',
      brandid: VariantId
    }
    const as3 = JSON.stringify(reqpara3)
    this.ServicingService.getVariant(as3).subscribe(res => {
      if (res[0].login === 0) {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else {
        this.Variant = res[0].models,
          console.log(this.Variant);
      }

    });
  }

  getcustinfo(){
    const reqpara = {
      requesttype: 'getcustinfo',
      vehnumber: this.registrationNumber,
      mobilenumber: this.user.mobile1,
      svcid:this.svcid
    }
    this.showstep1 = true;
  }

  onSubmit(f: NgForm) {}

}
