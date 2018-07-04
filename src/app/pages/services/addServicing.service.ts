import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';


@Injectable()
export class ServicingService {

  constructor(private http: HttpClient) { }

  private getSession_url :string = 'https://plsuat.europassistance.in:444/getSession';
  private Ea_check1_url:string = 'https://plsuat.europassistance.in:444/checkInitialEligibility';
  private Ea_check2_url:string = 'https://plsuat.europassistance.in:444/checkFinalEligibility';

  public url:string='http://m.21north.in/notify/svcwebservice.php';
  public logout_url:string = 'http://m.21north.in/notify/logout.php';
  public graph:string = 'http://m.21north.in/notify/svcgraph.php';
  public slotgraph =  'http://m.21north.in/notify/svcgraphslot.php';
  check_url = 'http://m.21north.in/notify/eaws.php';
  public destroySession_url = 'https://plsuat.europassistance.in:444/destroysession';
  public data:string;

  data1 = "vfdxvxd";
  public httpOptions = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
  withCredentials: true
};

public options = {
  headers: new HttpHeaders({'Content-Type':  'application/json'}),
}

public opt={
  headers: new HttpHeaders().set('x-auth-token', JSON.stringify(localStorage.getItem('token'))),
  
}

public opt1={
  headers: new HttpHeaders({'x-auth-token': sessionStorage.getItem('token'),'x-auth-user':sessionStorage.getItem('auth-user'),'Content-Type':  'application/json'})
  
}

session(){
    return this.http.post(this.getSession_url,this.options)
}

ForgotPassword(reqpara){
  return this.http.post(this.url,reqpara,this.options)
}

Login(reqpara){
  return this.http.post(this.url,reqpara,this.httpOptions)
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
  return this.http.post(this.Ea_check1_url,reqpara,this.opt1)
}
Finalcheck(reqpara){
  return this.http.post(this.Ea_check2_url,reqpara,this.opt1 )
}

destroySession(){
  console.log(this.opt1);
  const reqpara = {}
  return this.http.post(this.destroySession_url,reqpara,this.opt1 )
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
    console.log(this.httpOptions);
    
    return this.http.post(this.logout_url,this.data1,this.httpOptions)
  }

  webServiceCall(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
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
