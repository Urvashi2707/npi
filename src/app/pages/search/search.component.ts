import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { QueueTableService } from '../services/queue-table.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ServicingService } from '../services/addServicing.service';
import {SearchModalComponent} from './modal/searchModal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private _tableService: QueueTableService, 
    private service:ServicingService,
    private route:ActivatedRoute,
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
  messageNodata = "No Data" 

   data = this.route.params.subscribe(params => {
    if(params.hasOwnProperty('data')) {
      this.GetSearchData();
    }
  })
  ngOnInit() {
  
  }

  //sort
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  //Open Queue Detail Page
  openQDetails(obj: any){
    console.log(obj,"obj");
    sessionStorage.removeItem('clickedOn');
      // if(obj.queue_status === "Servicing Scheduled"){
      //   console.log("coming here")
      //   sessionStorage.removeItem('clickedOn');
      //   sessionStorage.setItem('clickedOn', '7')
      // }
    sessionStorage.setItem('QueueId',obj.id)
    this._tableService.queueID = obj.id;
    this.router.navigate(['/pages/queue-details']);
  }

  //show Invoice Upload Modal
  ShowUploadModal(res:any) {
    const activeModal = this.modalService.open(SearchModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = res.upload_button;
    activeModal.componentInstance.modalContent = res;
    activeModal.result.then(() => { 
     var data1 = this.route.params.subscribe(params => {
        if(params.hasOwnProperty('data')) {
          this.GetSearchData();
        }
      })
      this.GetSearchData();
    }, () => {    
    })
  }

  //Search Table Data API call
  GetSearchData(){
    var mobile = "";
    this.messageNodata = null;
    var data = this.route.params.subscribe(params => {
      mobile = params.data;
   });
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
  
    this.VehNumber = mobile;
    this.report=[];
    const reqpara1 = {
      requesttype: 'getsearch',
      vehnumber_mobile:this.VehNumber,
      servicecentre_id:this.SvcId
    }
      const as1 = JSON.stringify(reqpara1)
      this.service.webServiceCall(as1).subscribe
      (res => {
        if(!res[0]){
          // console.log("No Data");
          this.messageNodata = "No Data";
        }
     else if(res[0].login === 0){
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
