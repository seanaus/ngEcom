import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { CookieService } from 'src/services/cookie.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any;
  items: any =[];
  subscription: any;
  constructor(private cartService: CartService,private cookieService: CookieService) { }

  async ngOnInit() {
    const cartId = this.cookieService.getCookie("cartId");
    if (cartId !== null) {
      this.items = [];
      const cart$ = await this.cartService.getCart(cartId);
      cart$.subscribe((cart: any) => {
        this.cart = cart;
        this.items = [...cart.items]
      })  
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
