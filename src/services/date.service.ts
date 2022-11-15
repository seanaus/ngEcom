import { Injectable } from '@angular/core';
import { DateParams } from '../models/dateParams'
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  init(day?: number, month?: number, year?: number, hour: number = 0, minute: number = 0, second: number = 0, milliSecond: number = 0) {
    return (day === undefined || month === undefined || year === undefined) ? new Date() : new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}:${milliSecond}`);
  }
  // setDateTime(day: number, month: number, year: number, hour: number = 0, minute: number = 0, second: number = 0, milliSecond: number = 0) {
  //   const date = this.init(day, month, year, hour, minute, second, milliSecond);
  //   return date;
  // }
  getDateTime(datePart: DateParams, formatString?: string) {
    const date = this.init(datePart.day, datePart.month, datePart.year, datePart.hour, datePart.minute, datePart.second, datePart.milliSecond);
    // const localDateTime = `${this.getLocalDate(date)} ${this.getLocalTime(date)}`;
    // const customDateTime = this.formatDateTime(date, formatString !== "" ? formatString : "dd/mm/yyyy hh:mm:ss:ms");
    return formatString === "" ? `${this.getLocalDate(date)} ${this.getLocalTime(date)}` : this.format(date, formatString);

  }
  getLocalDate(date: Date) {
    return date.toLocaleDateString()
  }
  getLocalTime(date: Date) {
    return `${date.toLocaleTimeString()}:${date.getMilliseconds().toString()}`
  }
  format(date: Date, formatString: string = "dd/mm/yyyy hh:mm:ss:ms") {

    formatString = formatString.replace('dd', this.padLeft(date.getDate().toString(), "0", 2));
    formatString = formatString.replace('mm', this.padLeft((date.getMonth() + 1).toString(), "0", 2));
    formatString = formatString.replace('yyyy', date.getFullYear().toString());
    formatString = formatString.replace('hh', this.padLeft(date.getHours().toString(), "0", 2));
    formatString = formatString.replace('mm', this.padLeft(date.getMinutes().toString(), "0", 2));
    formatString = formatString.replace('ss', this.padLeft(date.getSeconds().toString(), "0", 2));
    formatString = formatString.replace('ms', this.padLeft(date.getMilliseconds().toString(), "0", 2));
    return formatString
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