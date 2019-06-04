import { Injectable } from '@angular/core';
import { Observable,Subject,BehaviorSubject } from 'rxjs/Rx';
import { DatePipe } from '@angular/common';
import { Router,NavigationEnd } from '@angular/router';


@Injectable()
export class QueueTableService {


  private previousUrl: string;
  private currentUrl: string;
  public clickedID: Subject<number> = new Subject<number>();
  // public socketIndicator: Subject<boolean> = new BehaviorSubject(boolean);
  private socketIndicator: Subject<boolean> = new BehaviorSubject<boolean>(null);
  public _issocketIndicator: Observable<boolean> = this.socketIndicator.asObservable();
  public login: Subject<boolean> = new Subject<any>();
  public Data = new Subject<any>();
  public Img_Data = new Subject<any>();
  public Dashboard_Data = new Subject<any>();
  public table_data: any[] = new Array;
  public queueID: any;
  public cancelReasons: any[];
  Table:any;

  constructor(private router: Router,private datePipe:DatePipe) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

setData(clickedOn: any) {
    this.clickedID.next(clickedOn);
  }

  setTbData(data){
    this.Data.next(data);
  }

  getTbData(){
    return this.Data
  }

  setIndicator(socketIndicator){
    this.socketIndicator.next(socketIndicator);
  }

  getIndicator(){
    return this.socketIndicator;
  }
  
  setlogin(login){
    this.login.next(login);
  }

  getlogin(){
    return this.login;
  }

  setImgData(data){
    this.Img_Data.next(data);
  }

  getImgData(){
    return this.Img_Data
  }

  setDashboardData(data){
    this.Dashboard_Data.next(data);
  }

  getDashboardData(){
    return this.Dashboard_Data
  }

  setCancelReasons(reasons: any[]){
    this.cancelReasons = reasons;
  }
  getData() {
    return this.clickedID;
  }
  getTableData() {
    return this.table_data;
  }
  public check1:any[];
  public keyArray: any[];

  setTableData(table_data_from: any, value: number) {
    this.keyArray = ['', 'callsandsms', 'queuehistory', 'activepickup', 'atsvc','activedropoff', 'activechauf', 'upcoming', 'paused', 'cancelled', 'completed', 'mishaps', 'tickets'];
    if(table_data_from != null){
      const valueOF = table_data_from;
      var check = valueOF.valueOf();
    }
    if (value == 2 || value == 12 || value == 1) {
      // this.check1 = check;
      this.table_data = table_data_from;
    } else {
      this.check1 = check[1];
    }
    
    this.setData(value);
  }

  setQueueID(queueId: any){
    this.queueID = queueId;
  }

  DateFormat(Table){
    for (let j = 0; j < Table.length ; j++){
      if(Table[j].queue_date != null){
         var QueueDate = Table[j].queue_date;
        var NewDate = this.datePipe.transform(QueueDate,"d MMM,y");
        Table[j].newdate = NewDate;
      }
  }
}

  TimeFormat(Table){
    for (let j = 0; j < Table.length ; j++){
      if(Table[j].queue_time != null){
            var TimeString = Table[j].queue_time ;
            var H = +TimeString.substr(0, 2);
            var h = (H % 12) || 12;
            var ampm = H < 12 ? "AM" : "PM";
            TimeString = h + TimeString.substr(2, 3) + ampm;
            Table[j].newtime = TimeString;
          }
  }
  }

  DateTimeFormat(Table){
    for (let j = 0; j < Table.length ; j++){
      if(Table[j].hasOwnProperty('queue_time')){
        if(Table[j].queue_time != null){
          var queuetime = Table[j].queue_time;
          var date = queuetime.replace( /\n/g, " " ).split( " " );
          var newDate = this.datePipe.transform(date[0],"d MMM,y");
          var timeString = date[1];
          var H = +timeString.substr(0, 2);
          var h = (H % 12) || 12;
          var ampm = H < 12 ? "AM" : "PM";
          timeString = h + timeString.substr(2, 3) + ampm;
          Table[j].newtime = timeString;
          Table[j].newdate = newDate;
        }
        else{
          Table[j].newtime = "--";
          Table[j].newdate = "--";
        }
      }
     
      if(Table[j].hasOwnProperty('dropoff_time')){
        if(Table[j].dropoff_time != null){
          var droptime = Table[j].dropoff_time;
          var ddate = droptime.replace( /\n/g, " " ).split( " " );
          var dropDate = this.datePipe.transform(ddate[0],"d MMM,y");
          var droptimeString = ddate[1];
          var H = +droptimeString.substr(0, 2);
          var h = (H % 12) || 12;
          var AmPm = H < 12 ? "AM" : "PM";
          droptimeString = h + droptimeString.substr(2, 3) + AmPm;
          Table[j].droptime = droptimeString;
          Table[j].dropdate = dropDate;
        }
        else{
          Table[j].droptime = "--";
          Table[j].dropdate = "--";
        }
      }
    }
}

public getPreviousUrl() {
  return this.previousUrl;
} 

public getCurrentUrl(){
  return this.currentUrl;
}

}
