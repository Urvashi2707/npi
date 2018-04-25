import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ServicingService } from '../services/addServicing.service';
import {HttpClient,HttpHeaders,HttpErrorResponse,HttpRequest} from '@angular/common/http';
@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  constructor(private service:ServicingService,private http:HttpClient,private router:Router) { }

  public matrix:any=[];
  svcid:string;
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
    this.getData();
  }

  getData(){
  
    const reqpara1 = 
    {
      requesttype: 'reportmatrix',
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
        this.matrix = res[0].reportmatrix;
        console.log(this.matrix);
      }

    }
  );
  }
}
