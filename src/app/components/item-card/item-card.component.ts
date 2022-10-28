import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ItemCardOptions } from 'src/enums/itemCardOptions';
@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: any;
  @Input() idx: any;
  @Input() cardType: number = 0;

  cardOptions = ItemCardOptions
  routerLink: any = null;
  constructor() { }

  ngOnInit(): void {
    if (this.cardType === this.cardOptions.Product) {
      this.routerLink = ['product-detail/', this.item.id];
    }
  }

}
