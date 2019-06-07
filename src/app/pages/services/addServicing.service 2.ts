import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable,Subject,BehaviorSubject } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

@Injectable()
export class ServicingService {
  private dashboardTable = new BehaviorSubject([]);
    dashBoardTableObs = this.dashboardTable.asObservable();

  cityList:any = [];
  cityList2:any;
  result:any;
  public getCredentailss:any;
  private subject12 = new BehaviorSubject({});
  private getCredentail = new BehaviorSubject({});
  getCredentailObs = this.getCredentail.asObservable();
  private subject = new Subject<any>();
  // private behaviorSubject = new BehaviorSubject<any>();

  constructor(private http: HttpClient,private router: Router) {
  }

   //Easy Auto
  private getSession_url :string = 'https://plsuat.europassistance.in:8000/api/eaiExt/getsession';
  private Ea_check1_url:string = 'http://plsuat.europassistance.in:444/checkInitialEligibility';
  private Ea_check2_url:string = 'http://plsuat.europassistance.in:444/checkFinalEligibility';
  public destroySession_url = 'http://plsuat.europassistance.in:444/destroysession';

  //21North
  // public url = environment.Mainurl;
  // public logout_url:string = environment.logout_url;
  // public graph:string = environment.graph;
  // public slotgraph =  environment.slot_graph;
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

sendMessage(message: string,btn:string) {
  this.subject.next({ text: message ,show_btn:btn});
}

clearMessage() {
  this.subject.next();
}

getMessage(): Observable<any> {
  return this.subject.asObservable();
}

session(){
  const reqpara1 = {}
    return this.http.post(this.getSession_url,reqpara1,this.opt)
}

sendMessage12(Objt) {
  this.subject12.next(Objt);
}

// clearMessage12() {
//   this.subject12.next();
// }

getMessage12(): Observable<any> {
  // console.log("don is called")
  return this.subject12.asObservable();
}

setCred(Cred) {
  // this.getCredentail.next(Cred);
  this.getCredentailss = Cred;
  // console.log("settttererere",this.getCredentailss);
}

getCred(){
  // console.log("gettterr clled",this.getCredentailss);
  return this.getCredentailss;
}



setter(Data){
this.data = Data;
}

getter(): string{
  return this.data;
}

dashBoardItems(dashBoardItems) {
  this.dashboardTable.next(dashBoardItems);
}
dashBoardItemsChanges() {
  return this.dashBoardItems;
}

getCountryCode(){
  return [
    {
      code : "+91",
      flag: '../../../assets/images/Flag/Flag_of_India.svg'
    },
    {
      code : "+65",
      flag: '../../../assets/images/Flag/Flag_of_Singapore.svg'
    }
  ]
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  showPosition(position) {
    sessionStorage.setItem("allow_login","true");
    var lat = position.coords.latitude;
    var lng = position.coords.longitude
    return {lat: lat,lng:lng}
  }

  showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        sessionStorage.setItem("allow_login","false");
        console.log("User denied the request for Geolocation.");
        sessionStorage.setItem('loc_msg','User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        sessionStorage.setItem('loc_msg','Location information is unavailable.');
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        sessionStorage.setItem('loc_msg','The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
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
}
