import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item: any;
  constructor() { }

  ngOnInit(): void {
  }

  editQuantity(option: string) {
    if(option === "+") {
      this.item.quantity++;
    } else {
      if(this.item.quantity > 1) {
        this.item.quantity --;
      }
    }

  }

}
