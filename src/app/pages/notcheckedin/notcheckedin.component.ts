import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QueueTableService } from '../services/queue-table.service';
import { ListService } from '../services/user.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {NgbDateAdapter, NgbDateStruct, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {ServicingService } from '../services/addServicing.service';


@Component({
  selector: 'app-notcheckedin',
  templateUrl: './notcheckedin.component.html',
  styleUrls: ['./notcheckedin.component.scss']
})
export class NotcheckedinComponent implements OnInit {

  public notcheckedin : any =[];
  dateString: string;
  dateString1: string;
  model: NgbDateStruct;
  model1: NgbDateStruct;
  message:string;
  pastdate:string;
  searchText:string;
  svcadmin:string;
  checksvcadmin :boolean;
  checkgrpadmin :boolean;
  globalsvcid:string;
  groupadmin:string;
  svcid:string;
  
  today:string;

  constructor(private datePipe:DatePipe,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private _detailsTable: QueueTableService, 
    private _data: ListService, 
    private _tableService: QueueTableService, 
    private router: Router,
    private service :ServicingService) { 

    var date = new Date();
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.today)
    var numberOfDays = 5;
    var days = date.setDate(date.getDate() - numberOfDays);
    this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    console.log(this.pastdate);    
  }

  ngOnInit() {
    if(sessionStorage.getItem('selectedsvc')){
      
      this.svcid = sessionStorage.getItem('selectedsvc');
      
    }
    else{
      this.svcid = JSON.parse(sessionStorage.getItem('globalsvcid'));
      
    }
    var date = new Date();
    this.today = this.datePipe.transform(date,"yyyy-MM-dd");
    console.log(this.today)
    var numberOfDays = 5;
    var days = date.setDate(date.getDate() - numberOfDays);
    this.pastdate = this.datePipe.transform(days,"yyyy-MM-dd");
    console.log(this.pastdate);
    this.getData();
  }

  onSelectDate(date: NgbDateStruct){
    if (date != null) {
            this.model = date;
            this.dateString = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString);
        }
        

  }

  getData(){
    const reqpara1 = 
    {
      requesttype: 'getqueueinfonew',
      servicetype:14,
      starttime: this.pastdate,
      endtime: this.today,
      pagenumber: '0',
      svcid:this.svcid
    }
      const as1 = JSON.stringify(reqpara1)
      this.service.getBrands(as1).subscribe
  (res => 
    {
      if(res[0].login === 0){
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/auth/login']);
      }
      else{
        if(res[0].pagecount[0].hasOwnProperty('noqueues')){
          console.log('No queue');
          this.message = "No Data" ;
         }
         else{
          this.notcheckedin = res[1].atsvc;
         }
      //   this.unconfirmed = res[1].unconfirmed;
      // console.log(this.unconfirmed);
      }

    }
  );
  }

  onSelectDate1(date: NgbDateStruct){
    if (date != null) {
            this.model1 = date;
            this.dateString1 = this.ngbDateParserFormatter.format(date);
            console.log(this.dateString1);
        }
        

      }
    }
