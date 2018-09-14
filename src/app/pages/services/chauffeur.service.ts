import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChauffeurService {

  constructor(private http: HttpClient) { }
  private _url :string = 'https://api.myjson.com/bins/tjkvh'
  employees = []
  public url = environment.Mainurl;

  public httpOptions = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
  withCredentials: true
};

  webServiceCall(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

 }