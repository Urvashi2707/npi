import { Injectable } from '@angular/core';
import {custinfo,Brands,IModelsList} from '../model/AddServicing';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { post } from 'selenium-webdriver/http';

@Injectable()
export class ServicingService {

  constructor(private http: HttpClient) { }

  private getSession_url :string = 'https://plsuat.europassistance.in:444/getSession';
  private check1_url:string = 'https://plsuat.europassistance.in:444/checkInitialEligibility';
  private check2_url:string = 'https://plsuat.europassistance.in:444/checkFinalEligibility ';

  public url:string='http://m.21north.in/notify/svcwebservice.php';
  public logout_url:string = 'http://m.21north.in/notify/logout.php';
  public graph:string = 'http://m.21north.in/notify/svcgraph.php';
  public slotgraph =  'http://m.21north.in/notify/svcgraphslot.php';
  check_url = 'http://m.21north.in/notify/eaws.php';

  public data:string;


  public httpOptions = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
  withCredentials: true
};

public options = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
  // headers = headers.append('x-auth-token', '12345');
}

public opt={
  headers: new HttpHeaders().set('x-auth-token', JSON.stringify(localStorage.getItem('token'))),
  
}

public opt1={
  headers: new HttpHeaders({'x-auth-token': JSON.stringify(localStorage.getItem('token')),'x-auth-user':JSON.stringify(localStorage.getItem('auth-user'))})
  
}

public opt2={
  headers: new HttpHeaders({'X-AUTH-TOKEN': 'erfwefwejrfhiwurhfgiuwerygiuwreyirug','X-AUTH-USER':'fvsfgsdfgsdg'})
  
}

 
session(){
  return this.http.post(this.getSession_url,this.opt2)
}

setter(Data){
this.data = Data;
console.log(this.data);
}

getter(): string{
  console.log(this.data);
  return this.data;
}


Initialcheck(reqpara){
  return this.http.post(this.check1_url,reqpara,this.opt1)
}
Finalcheck(reqpara){
  return this.http.post(this.check2_url,reqpara,this.opt )
}


graphCall(reqpara){
  return this.http.post(this.graph, reqpara, this.httpOptions)
}

slot(reqpara){
  return this.http.post(this.slotgraph, reqpara, this.httpOptions)
}

  getSession(){
    return this.http.post(this.getSession_url,this.options)
  }

  logout(){
    return this.http.post(this.logout_url,this.options)
  }

  getCustinfo(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  getBrands(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  getModels(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  getVariant(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  getSlot(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  getCre(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }
  
  AddSerivicng(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

}
