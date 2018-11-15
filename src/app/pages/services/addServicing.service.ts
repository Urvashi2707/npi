import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';



@Injectable()
export class ServicingService {

  cityList:any = [];
  cityList2:any;
  result:any;

  constructor(private http: HttpClient,private router: Router) {
    var myArray = this.getCity().subscribe(data => this.result = data);
    var myArray1 = this.getCity();
   }

   //Easy Auto
  private getSession_url :string = 'https://plsuat.europassistance.in:8000/api/eaiExt/getsession';
  private Ea_check1_url:string = 'http://plsuat.europassistance.in:444/checkInitialEligibility';
  private Ea_check2_url:string = 'http://plsuat.europassistance.in:444/checkFinalEligibility';
  public destroySession_url = 'http://plsuat.europassistance.in:444/destroysession';

  //21North
  public url = environment.Mainurl;
  public logout_url:string = environment.logout_url;
  public graph:string = environment.graph;
  public slotgraph =  environment.slot_graph;
  check_url = 'http://m.21north.in/notify/eaws.php';

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
  headers: new HttpHeaders({'Content-Type':'application/json','x-auth-token':'pass123','x-auth-user':'21NorthUser01'})
  
}

public opt1={
  headers: new HttpHeaders({'x-auth-token': sessionStorage.getItem('token'),'x-auth-user':sessionStorage.getItem('auth-user'),'Content-Type':  'application/json'})
  
}

session(){
  const reqpara1 = {}
  console.log(this.opt);
    return this.http.post(this.getSession_url,reqpara1,this.opt)
}

ForgotPassword(reqpara){
  return this.http.post(this.url,reqpara,this.options)
}

Login(reqpara){
  return this.http.post(this.url,reqpara,this.httpOptions)
}

setter(Data){
this.data = Data;
}

getter(): string{
  return this.data;
}


Initialcheck(reqpara){
  return this.http.post(this.Ea_check1_url,reqpara,this.opt1)
}
Finalcheck(reqpara){
  return this.http.post(this.Ea_check2_url,reqpara,this.opt1 )
}

destroySession(){
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
    return this.http.post(this.getSession_url,this.opt)
  }

  logout(){
    console.log(this.httpOptions);
    
    return this.http.post(this.logout_url,this.data1,this.httpOptions)
  }

  webServiceCall(reqpara){
    return this.http.post(this.url, reqpara, this.httpOptions);
  }

  getCity():Observable<any>{
    const reqpara1 ={
      requesttype: 'getcitylist',
    }
    const as1 = JSON.stringify(reqpara1)
    return this.webServiceCall(as1).map
      ((response: Response) => {
        if (response[0].login === 0) {
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.cityList = response[0].citylist;
          var newData = JSON.stringify(this.cityList)
          let result = JSON.parse(newData);
          console.log(response);
          return response;

        }
      });
  }

}
