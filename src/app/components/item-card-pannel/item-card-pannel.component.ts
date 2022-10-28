import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { ItemCardOptions } from 'src/enums/itemCardOptions';
@Component({
  selector: 'app-item-card-pannel',
  templateUrl: './item-card-pannel.component.html',
  styleUrls: ['./item-card-pannel.component.scss']
})
export class ItemCardPannelComponent implements OnInit {
  @Input() idx: any;
  @Input() item: any;
  @Input() cardType: number = 0;

  cardTypes = ItemCardOptions
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  async editQuantity(option: string) {
    await this.cartService.editQuantity(option, this.idx);
  }
  async removeItem(index: number) {
    await this.cartService.delete(index);
  }

}


