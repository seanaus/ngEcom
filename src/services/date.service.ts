import { Injectable } from '@angular/core';
import { IDateParams } from '../models/dateParams'
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  
  init(datePart: IDateParams) {
    // Return Date object, either current Date/Time, or custom (If values set within IDateParams parameter)
    return (datePart.day === undefined || datePart.month === undefined || datePart.year === undefined)
      ? new Date()
      : new Date(`${datePart.year}/${datePart.month}/${datePart.day} ${datePart.hour}:${datePart.minute}:${datePart.second}:${datePart.milliSecond}`);
  }
  setParams(formatString = "yyyy/mm/dd hh:mm:ss:ms",
            day?: number,
            month?: number,
            year?: number,
            hour: number = 0,
            minute: number = 0,
            second: number = 0,
            milliSecond: number = 0): IDateParams {
    // Return parameters passed via IDateParams instance, 
    // 'formatString' mandatory, therefore  defaulted when not supplied.
    if(day !== undefined && month !== undefined && year !== undefined) {
      return {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute: minute,
        second: second,
        milliSecond: milliSecond,
        formatString: formatString
      }
    } else {
      return {
        formatString: formatString
      }
    }
  }
  // If no formatString supplied, return Date/Time
  // If formatString supplied, return Date/Time formatted as specified within it.
  getDateTime(datePart: IDateParams) {
    const date = this.init(datePart);
    return datePart.formatString === ""
      ? `${this.getLocalDate(date)} ${this.getLocalTime(date)}`
      : this.format(date, datePart.formatString);

  }
  getLocalDate(date: Date) {
    return date.toLocaleDateString()
  }
  getLocalTime(date: Date) {
    return `${date.toLocaleTimeString()}:${date.getMilliseconds().toString()}`
  }
  // Overlay the vales of dateIn (day,month,year,hours,minutes,second,milliseconds) over the formatString
  // The resulting string representaion of the dateIn is returned based on the formatString.
  format(dateIn: Date, customLayout: string = "") {
    let dateString = customLayout === "" ? "yyyy/mm/dd hh:mm:ss:ms" : customLayout
    dateString = dateString.replace('dd', this.padLeft(dateIn.getDate().toString(), "0", 2));
    dateString = dateString.replace('mm', this.padLeft((dateIn.getMonth() + 1).toString(), "0", 2));
    dateString = dateString.replace('yyyy', dateIn.getFullYear().toString());
    dateString = dateString.replace('hh', this.padLeft(dateIn.getHours().toString(), "0", 2));
    dateString = dateString.replace('mm', this.padLeft(dateIn.getMinutes().toString(), "0", 2));
    dateString = dateString.replace('ss', this.padLeft(dateIn.getSeconds().toString(), "0", 2));
    dateString = dateString.replace('ms', this.padLeft(dateIn.getMilliseconds().toString(), "0", 2));
    return dateString
  }
  padLeft(source: string, char: string, len: number) {
    return source.length < len ? `${this.pad(char, len)}${source}` : `${source}`
  }
  padRight(source: string, char: string, len: number) {
    return source.length < len ? `${source}${this.pad(char, len)}` : `${source}`
  }
  pad(char: string, len: number) {
    let pads: string[] = [];
    for (let i = 0; i < len-1; i++) {
      pads = [...pads, char];
    }
    return pads.join('');
  }

}
