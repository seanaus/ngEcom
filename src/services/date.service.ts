import { Injectable } from '@angular/core';
// import { DatePipe } from '@angular/common'
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDateTime(day?: number, month?: number, year?: number, hours: number = 0, minutes: number = 0, seconds: number = 0) {
    return (day === undefined || month === undefined || year === undefined) ? new Date() : new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`);
  }
  formatDate(sourceDate: string, format?: string) {
  
    // DATE CONSTANTS
    const DAYLABEL = 0;
    const MONTHLABEL = 1;
    const DAY = 2;
    const YEAR = 3;
    const TIME = 4;
    const TIMEZONE = 5;
    const TIMEZONELABEL = 6;

    // SUBGROUP TIME CONSTANTS
    const HOUR = 0;
    const MINUTE = 1;
    const SECOND = 2;

    // SUBGROUP TIMEZONE CONSTANTS
    const TIMEZONEPREFIX = 0;
    const TIMEZONEVALUE = 1;
    const TIMEZONEOPERATOR = 2;

    //SPLIT THE MAIN DATE STRING
    const dt = sourceDate.split(" ");
    const dayLabel = dt[DAYLABEL];
    const day = dt[DAY];
    const monthLabel = dt[MONTHLABEL];
    const month = this.translateMonthFromLabel(monthLabel);
    const year = dt[YEAR];
    const timeZoneLabel = dt[TIMEZONELABEL];

    //SPLIT TIME STRING
    const ts = dt[TIME].split(":");
    const hour = ts[HOUR];
    const minute = ts[MINUTE];
    const second = ts[SECOND];

    //SPLIT TIMEZONE STRING
    const tz = this.splitTimeZone(dt[TIMEZONE]);
    const timeZonePrefix = tz[TIMEZONEPREFIX];
    const timeZoneValue = tz[TIMEZONEVALUE];
    const timeZoneOperator = tz[TIMEZONEOPERATOR];

    return this.applyFormat(day, month, year, hour, minute, second, format);

  }
  translateMonthFromLabel(label: string): string {
    let mm = "";
    const months = "Jan,Feb,March,April,May,June,July,Aug,Sept,Oct,Nov,Dec".split(",");
    months.forEach((month, index) => {
      if (month === label) {
        mm = (index + 1).toString();
      }
    })
    return mm;
  }
  splitTimeZone(source: string) {   
    // CHECK TIMEZONE OPERATOR '+' || '-'
    const char = source.includes("+") ? "+" : "-";
    // console.log(`splitTimeZone char is: ${char}`);
    const timeZone = source.split(char);
    //ADD RELEVANT OPERATOR TO timeZone ARRAY (AS WAS LOST IN SPLIT OPERATION)
    timeZone.push(char);
    // console.log(`splitTimeZone char is: ${JSON.stringify(timeZone)}`);
    return timeZone
  }
  applyFormat(day: string, month: string, year: string, hour: string, minute: string, second: string, format: string = 'dd/mm/yyyy hh:mm:ss') { 
    format = format.replace('dd', day);
    format = format.replace('mm', month);
    format = format.replace('yyyy', year);
    format = format.replace('hh', hour);
    format = format.replace('mm', minute);
    format = format.replace('ss', second);
    return format
  }
}