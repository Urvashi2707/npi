import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) { }
 
  public url:string='https://m.21north.in/notify/svcwebservice.php';

  public httpOptions = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
  withCredentials: true
};


  webServiceCall(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

}
