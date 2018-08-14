import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { QueueTableService } from '../services/queue-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ServicingService } from '../services/addServicing.service';
import {SearchModalComponent} from './modal/searchModal.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private _tableService: QueueTableService, 
    private service:ServicingService,
    private spinner: NgxSpinnerService,
    private router:Router) { }

 VehNumber : string;
  report : any=[];
   UploadBtn:string;
  GlobalSvcId:string;
  SvcId:string;
  InsuranceUsr:string;
  searchText:string;
  InsuranceCheck:boolean = false;
  key: string = 'id'; 
  reverse: boolean = false;

  ngOnInit() {
    this.InsuranceUsr = JSON.parse(sessionStorage.getItem('insurance'));
    if(sessionStorage.getItem('selectedsvc')){
      this.SvcId = sessionStorage.getItem('selectedsvc');
    }
    else{
      this.SvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    }
    this.GlobalSvcId = JSON.parse(sessionStorage.getItem('globalsvcid'));
    if(this.InsuranceUsr == "1"){
      this.InsuranceCheck = true;
    }
    else{
      this.InsuranceCheck = false;
     }
    this.GetSearchData();
  }

  //sort
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Open Queue Detail Page
  openQDetails(indexId: any){
    sessionStorage.removeItem('clickedOn');
    sessionStorage.setItem('QueueId',indexId)
    this._tableService.queueID = indexId;
    this.router.navigate(['/pages/queue-details']);
  }

  //show Invoice Upload Modal
  ShowUploadModal(res:any) {
    const activeModal = this.modalService.open(SearchModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = res.upload_button;
    activeModal.componentInstance.modalContent = res;
  }

  //Search Table Data API call
  GetSearchData(){
    this.VehNumber = "";
    this.report=[];
    this.VehNumber = sessionStorage.getItem('search')
    const reqpara1 = {
      requesttype: 'getsearch',
      vehnumber_mobile:this.VehNumber,
      servicecentre_id:this.SvcId
    }
      const as1 = JSON.stringify(reqpara1)
      this.service.webServiceCall(as1).subscribe
      (res => {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        this.report = res[0].vehqueues;
        this.UploadBtn = this.report[0].upload_button,
        this.spinner.hide();
        this._tableService.DateFormat(this.report);
        this._tableService.TimeFormat(this.report);
      }

    }
  );
  }

}
