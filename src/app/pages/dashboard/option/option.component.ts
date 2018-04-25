import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ServicingService } from '../../services/addServicing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  modalHeader: string;
  modalContent:any;
  public List: any = [];
  selectedSvcid:string;
  public globalsvcid:string;
  public selectedsvcid:string;
  svcid:string;
  changedsvc:any;
  chngdsvcid:any;
  constructor(private router: Router,private activeModal: NgbActiveModal,private servicing: ServicingService) { }

  ngOnInit() {
   

    if(sessionStorage.getItem('selectedsvc')){
      this.svcid = sessionStorage.getItem('selectedsvc');
     }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      this.globalsvcid =  JSON.parse(sessionStorage.getItem('globalsvcid'))
    }
    this.selectedSvcid = this.globalsvcid;
    this.getList();
 
    }
    
  closeModal() {
    this.activeModal.close();
  }

  getList() {
    const reqpara1 =
      {
        requesttype: 'getsvclist',
        svcid:this.svcid,
      }
    const as1 = JSON.stringify(reqpara1)
    this.servicing.getBrands(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.List = res[0].svclist;
          console.log(this.List);
          if(sessionStorage.getItem('selectedsvc')) {
            this.chngdsvcid = sessionStorage.getItem('selectedsvc');
            console.log(sessionStorage.getItem('selectedsvc'));
            console.log( this.List.length);
            for ( var i = 0; i <  this.List.length; i++){
              if (this.List[i].id === this.chngdsvcid) {
                this.selectedSvcid = this.List[i].id;
                console.log(this.selectedSvcid );
          }
          
            }
          }
         
        }

      }
      );
  }
  
  selectSvcid(){
    console.log(this.selectedSvcid);
    console.log(this.List.length);
    for ( var i = 0; i <  this.List.length; i++){
      if (this.List[i].id === this.selectedSvcid) {
        this.changedsvc = this.List[i];
      }
    }
    console.log(this.changedsvc.name);
    sessionStorage.setItem('changedsvc' , this.changedsvc.name);
    sessionStorage.setItem('selectedsvc' , this.selectedSvcid);
    this.selectedSvcid = this.selectedSvcid;
    this.activeModal.close();
    window.location.reload();
  }
}
