import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicingService } from '../../services/addServicing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  //variables
  modalHeader: string;
  modalContent:any;
  List: any = [];
  SelectedSvcid:string;
  GlobalSvcid:string;
  SvcId:string;
  ChangedSvc:any;
  ChangedSvcid:any;

  constructor(private router: Router,private activeModal: NgbActiveModal,private servicing: ServicingService) { }

  ngOnInit() {
  if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
     }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
      this.GlobalSvcid =  JSON.parse(sessionStorage.getItem('globalsvcid'))
    }
    this.SelectedSvcid = this.GlobalSvcid;
    this.GetSvcList();
  }
    
  closeModal() {
    this.activeModal.close();
  }

  //API call for service centre List
  GetSvcList() {
    const reqpara1 ={
        requesttype: 'getsvclist',
        svcid:this.SvcId,
      }
    const as1 = JSON.stringify(reqpara1)
    this.servicing.webServiceCall(as1).subscribe
      (res => {
        if (res[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.List = res[0].svclist;
          if(sessionStorage.getItem('selectedsvc')) {
            this.ChangedSvcid = sessionStorage.getItem('selectedsvc');
            for ( var i = 0; i <  this.List.length; i++){
              if (this.List[i].id === this.ChangedSvcid) {
                this.SelectedSvcid = this.List[i].id;
             } }
          }
         }
        });
  }
  
  //Selected SVC Function
  SelectSvcid(){
    for ( var i = 0; i <  this.List.length; i++){
      if (this.List[i].id === this.SelectedSvcid) {
        this.ChangedSvc = this.List[i];
      }
    }
    sessionStorage.setItem('changedsvc' , this.ChangedSvc.name);
    sessionStorage.setItem('selectedsvc' , this.SelectedSvcid);
    this.SelectedSvcid = this.SelectedSvcid;
    this.activeModal.close();
    window.location.reload();
  }
}
