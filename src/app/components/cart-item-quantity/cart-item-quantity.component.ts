import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart-item-quantity',
  templateUrl: './cart-item-quantity.component.html',
  styleUrls: ['./cart-item-quantity.component.scss']
})
export class CartItemQuantityComponent implements OnInit {
  @Input() idx: any;
  @Input() value: any;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  async editQuantity(option: string) {
    const refresh = (this.value > 1) ? true : false;
    await this.cartService.editQuantity(option, this.idx);
    if(refresh)
      this.value = this.cartService.cart.items[this.idx].quantity;
  }

}
