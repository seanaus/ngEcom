import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import { SettingsService } from 'src/services/settings.service';

@Component({
  selector: 'app-cart-totals',
  templateUrl: './cart-totals.component.html',
  styleUrls: ['./cart-totals.component.scss']
})
export class CartTotalsComponent implements OnInit {
  @Input() cartId: string = "";
  @Input() vatMetric: any;

  constructor(private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
  }
  
  getVatPercentage() {
    return this.vatMetric * 100
  }
  getTotalCount() {
    return (this.cartService?.cart !== undefined) ? +this.cartService.cart.totalCount : 0
    // return +this.cartService.cart?.totalCount ?? 0
  }
  getTotalCost() {
    return (this.cartService.cart !== undefined)? +this.cartService.cart.totalCost: 0
  }
  getVat() {
    return (this.cartService.cart !== undefined)? +this.cartService.cart.totalCost * +this.vatMetric : 0
  }
  getTotalIncVat() {
    return +this.getTotalCost() + +this.getVat();
  }
  checkout() {
    this.router.navigateByUrl(`/cart/checkout/${this.cartId}`);
  }

}
