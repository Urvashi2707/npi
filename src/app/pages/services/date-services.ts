import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  public date = new Date();

  constructor() { }
 
	public getCurrentDate(): Date{
		return new Date();
	}

	public getCurrentDateTime(): number{
		return (new Date()).getTime();
	}

  public getUnixTime():any{
    var unix = +new Date()
    return unix;
  }

	public convertDateTimeToDate(datetime: number): Date{
		return new Date(datetime);
	}

	public convertDateToDateTime(date: Date): number{
		return date.getTime();
  }
  
  public getTodayDateUTC(){
    var tday = new Date()
    var today_date = {day: tday.getUTCDate(),month: tday.getUTCMonth() + 1,year: tday.getUTCFullYear()};
    return today_date;
  }

  public getFiveDayBackUTC(){
    var d2 = new Date()
    d2.setDate(d2.getDate() - 5 );
    var five_day_back = {day: d2.getUTCDate(),month: d2.getUTCMonth() + 1,year: d2.getUTCFullYear()};
    return five_day_back;
  }

  public getFourteenDayBackUTC(){
    var d3 = new Date()
    d3.setDate(d3.getDate() - 14 );
    var fourteen_day_back = {day: d3.getUTCDate(),month: d3.getUTCMonth() + 1,year: d3.getUTCFullYear()};
    return fourteen_day_back;
  }

  public getTmrwUTC(){
    var d4 = new Date()
    d4.setDate(this.date.getDate() + 1 );
    var tmrw_date = {day: d4.getUTCDate(),month: d4.getUTCMonth() + 1,year: d4.getUTCFullYear()};
    return tmrw_date;
  }

  public getNextFiveUTC(){
    var d9 = new Date()
    d9.setDate(d9.getDate() + 5 );
    var tmrw_date = {day: d9.getUTCDate(),month: d9.getUTCMonth() + 1,year: d9.getUTCFullYear()};
    return tmrw_date;
  }



}