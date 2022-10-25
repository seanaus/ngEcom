import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: any;
  @Input() idx: any;
  @Input() itemType: string = "";

  routerLink: any = null;
  constructor() { }

  ngOnInit(): void {
    if(this.itemType === "product") {
      this.routerLink = ['product-detail/', this.item.id];
    }
  }

}
