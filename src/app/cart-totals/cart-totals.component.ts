import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart-totals',
  templateUrl: './cart-totals.component.html',
  styleUrls: ['./cart-totals.component.scss']
})
export class CartTotalsComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  getTotalCount() {
    return this.cartService.cart.totalCount
  }
  getTotalCost() {
    return this.cartService.cart.totalCost
  }
  getVat(metric: number) {
    if (metric > 1) { 
      metric = metric / 100;
    }
    return this.cartService.cart.totalCost * metric
  }
  getTotalIncVat(metric: number) {
    return this.cartService.cart.totalCost + this.getVat(metric);
  }

}
