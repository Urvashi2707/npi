import { Injectable } from '@angular/core';
import { Observable,Subject,BehaviorSubject } from 'rxjs/Rx';
import { DatePipe } from '@angular/common';
import { Router,NavigationEnd } from '@angular/router';


@Injectable()
export class DataService {

  private subject = new Subject<any>();
  
  private socketIndicator: Subject<boolean> = new BehaviorSubject<boolean>(null);
  public _issocketIndicator: Observable<boolean> = this.socketIndicator.asObservable();

  private creditUpdation: Subject<boolean> = new BehaviorSubject<any>(null);
  public _creditUpdation: Observable<boolean> = this.creditUpdation.asObservable();

  private queueStatusUpdation: Subject<any> = new BehaviorSubject<any>(null);
  public _queueStatusUpdation: Observable<any> = this.queueStatusUpdation.asObservable();

  private svcUpdation: Subject<any> = new BehaviorSubject<any>(null);
  public _svcUpdation: Observable<any> = this.svcUpdation.asObservable();

  private customerNumber: Subject<any> = new BehaviorSubject<any>(null);
  public _customerNumber: Observable<any> = this.customerNumber.asObservable();

  constructor(private router: Router,private datePipe:DatePipe) {}

  sendMessage(message: string,btn:string) {
    console.log(message,btn);
    this.subject.next({text: message ,show_btn:btn});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  setIndicator(socketIndicator){
    this.socketIndicator.next(socketIndicator);
  }

  getIndicator(){
    return this.socketIndicator;
  }

  setSvc(svcUpdation){
    console.log("calling set svc",svcUpdation)
    this.svcUpdation.next(svcUpdation);
    console.log(this.svcUpdation);
  }

  getSvc(){
    console.log("calling get svc")
    return this.svcUpdation;
  }

  setCustomerNumber(custNumber){
    console.log("calling set custNumber",custNumber)
    this.customerNumber.next(custNumber);
    console.log(this.customerNumber);
  }

  getCustomerNumber(){
    console.log("calling get svc")
    return this.customerNumber;
  }

  setCreditBalance(Credit){
    this.creditUpdation.next(Credit);
  }

  getCreditBalance(){
    return this.creditUpdation;
  }

  setQueueStatus(statusArray){
    this.queueStatusUpdation.next(statusArray);
  }

  getQueueStatus(){
    return this.queueStatusUpdation;
  }



}
