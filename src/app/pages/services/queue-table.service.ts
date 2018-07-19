import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable()
export class QueueTableService {

  constructor(private datePipe:DatePipe,) { }

  public clickedID: Subject<number> = new Subject<number>();
  public table_data: any[] = new Array;
  public queueID: any;
  public cancelReasons: any[];
  Table:any;
  setData(clickedOn: any) {
    this.clickedID.next(clickedOn);
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
  setTableData(table_data_from: Object, value: number) {
    this.keyArray = ['', 'callsandsms', 'queuehistory', 'activepickup', 'atsvc','activedropoff', 'activechauf', 'upcoming', 'paused', 'cancelled', 'completed', 'mishaps', 'tickets']
    const valueOF = table_data_from;
    const check = valueOF.valueOf();
    
    if (value == 1 || value == 2 || value == 12) {
      this.check1 = check[0];
    } else {
      this.check1 = check[1];
    }
    this.table_data = this.check1[this.keyArray[value]];
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
    
  }
}
