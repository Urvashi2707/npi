import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) { }
 
  public url = environment.Mainurl;

  public httpOptions = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
  withCredentials: true
};


  webServiceCall(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

}
