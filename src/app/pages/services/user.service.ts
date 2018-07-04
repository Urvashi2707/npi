import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable()
export class ListService {

  constructor(private http: HttpClient) { }
  private _url :string = 'https://api.myjson.com/bins/tjkvh'
  employees = []

  public url:string='http://m.21north.in/notify/svcwebservice.php';

  public httpOptions = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
  withCredentials: true
};

  getUserType(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  getUserList(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  createUser(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  webServiceCall(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  updateUser(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  // getUser() : Observable<IEmployee[]>{
  //   return this.http.get<IEmployee[]>(this._url);
  // }

}
