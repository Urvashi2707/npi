import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ServicingService } from '../../services/addServicing.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {

  modalHeader: string;
  modalContent:any;
  public List: any = [];
  selectedSvcid:string;
  public globalsvcid:string;
  public selectedsvcid:string;
  svcid:string;
  changedsvc:any;
  public now:string;
  today:string;
  svcname:string;
  acceptBtn = true;
  cityname:string;

  constructor(private datePipe: DatePipe,private router: Router,private activeModal: NgbActiveModal,private servicing: ServicingService) { }

  ngOnInit() {
     var date = new Date();
     this.today = this.datePipe.transform(date,"fullDate");

     this.cityname = sessionStorage.getItem('city_name');

    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
     }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      this.globalsvcid =  JSON.parse(sessionStorage.getItem('globalsvcid'))
    }
    this.selectedSvcid = this.globalsvcid;

    this.svcname = JSON.parse(sessionStorage.getItem('svcname'));
   
  }

  closeModal() {
    this.activeModal.close();
  }

  agreeChk(value){
    console.log(value);
    if(value == true){
      this.acceptBtn = false;
    }
    else{
     this.acceptBtn = true;
    }
    }

    accept(){
      const reqpara1 = 
      {
        requesttype: 'agreeterms',
        version:1
      }
      const as1 = JSON.stringify(reqpara1)
      this.servicing.getBrands(as1).subscribe(res =>{
        console.log(res)
        this.acceptBtn = true;
        this.activeModal.close();
      });
    }


}

