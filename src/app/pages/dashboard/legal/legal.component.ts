import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicingService } from '../../services/addServicing.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {

  modalHeader: string;
  modalContent:any;
  SelectedSvcid:string;
  GlobalSvcid:string;
  SvcId:string;
  changedsvc:any;
  TodayDate:string;
  SvcName:string;
  acceptBtn: boolean = true;
  CityName:string;
  public countryCode:string;

  constructor(private datePipe: DatePipe,
              private activeModal: NgbActiveModal,
              private servicing: ServicingService) { }

  ngOnInit() {
     var date = new Date();
     this.TodayDate = this.datePipe.transform(date,"fullDate");
    this.CityName = sessionStorage.getItem('city_name');

    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
     }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
      this.GlobalSvcid =  JSON.parse(sessionStorage.getItem('globalsvcid'))
    }
    this.SelectedSvcid = this.GlobalSvcid;
    this.SvcName = JSON.parse(sessionStorage.getItem('svcname'));

    this.countryCode = sessionStorage.getItem('loginCountryFlag');
  }

  closeModal() {
    this.activeModal.close();
  }

  //Called when checkbox is checked or unchecked of Agree Check
  agreeTermsCheck(value) {
    console.log("value ", value);
    if(value == true) {
      this.acceptBtn = false;
    }
    else{
     this.acceptBtn = true;
    }
    }

    //Calls when Checkbox is checked
    acceptTerms() {
      const AgreeTermReq =
      {
        requesttype: 'agreeterms',
        version:1
      }
      const TermReq = JSON.stringify(AgreeTermReq)
      this.servicing.webServiceCall(TermReq).subscribe(res =>{
        this.acceptBtn = true;
        sessionStorage.setItem('terms',"12")
        // this.ShowAgreement = JSON.parse(sessionStorage.getItem('terms'));
        this.activeModal.close();
      });
    }
}
