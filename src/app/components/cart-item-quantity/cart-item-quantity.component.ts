import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-item-quantity',
  templateUrl: './cart-item-quantity.component.html',
  styleUrls: ['./cart-item-quantity.component.scss']
})
export class CartItemQuantityComponent implements OnInit {
  value=0;

  constructor() { }

  ngOnInit(): void {
  }

}
