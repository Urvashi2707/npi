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
  AcceptBtn = true;
  CityName:string;

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
  }

  closeModal() {
    this.activeModal.close();
  }

  //Called when checkbox is checked or unchecked of Agree Check 
  AgreeTermsCheck(value){
    if(value == true){
      this.AcceptBtn = false;
    }
    else{
     this.AcceptBtn = true;
    }
    }

    //Calls when Checkbox is checked
    AcceptTerms(){
      const AgreeTermReq = 
      {
        requesttype: 'agreeterms',
        version:1
      }
      const TermReq = JSON.stringify(AgreeTermReq)
      this.servicing.webServiceCall(TermReq).subscribe(res =>{
        this.AcceptBtn = true;
        sessionStorage.setItem('terms',"12")
        // this.ShowAgreement = JSON.parse(sessionStorage.getItem('terms'));
        this.activeModal.close();
      });
    }
}

