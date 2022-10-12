import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cartItem';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item: any;
  @Input() idx: any;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  async removeItem(index:number) {
    await this.cartService.delete(index);
  }
}
