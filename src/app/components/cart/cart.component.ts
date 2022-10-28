import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { CookieService } from 'src/services/cookie.service';
import { SettingsService } from 'src/services/settings.service';
import { ItemCardOptions } from 'src/enums/itemCardOptions';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any;
  settings: any;
  cardType = ItemCardOptions.CartItem;

  constructor(private cartService: CartService,
    private cookieService: CookieService,
    private settingsService: SettingsService) { }

  async ngOnInit() {
    const cartId = this.cookieService.getCookie("cartId");
    if (cartId !== null) {
      ///////// GET CART ////////
      const cart$ = await this.cartService.getCart(cartId);
      cart$.subscribe((cart: any) => {
        this.cart = cart;
      })

      ///////// GET SETTINGS ////////
      const settings$ = await this.settingsService.getSettings("project");
      settings$.subscribe((settings: any) => {
        this.settings = settings;
      })
    }
  }

  ngOnDestroy(): void {
  }

}
