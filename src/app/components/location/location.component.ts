import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  header = "";
  description = "";
  iconURL = "";
  URL = "";

  constructor() { }

  ngOnInit(): void {
    this.header = "Directions";
    this.description = "Click here for Google Map directions";
    this.iconURL = "/images/maps.png";
    this.URL = "https://www.google.com/maps/place/Potteries+Jaguar+Spares/@53.049102,-2.1984056,672m/data=!3m2!1e3!4b1!4m5!3m4!1s0x487a42ec90fe77c9:0x2f60514ecf0926d1!8m2!3d53.0489972!4d-2.1960377";
  }

}
