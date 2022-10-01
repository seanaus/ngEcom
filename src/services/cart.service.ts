import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = {};
  //this.cart.items.push()
  constructor() { }

  add(item: CartItem) {

  }
  del(item: CartItem) {

  }
  // itemExists(item: CartItem) {
  //   if (this.cart.items && this.cart.items.length > 0) {
  //     this.cart.items?.find(i => i.id === item.id)
  //   }
  // }
  // get():any[] {
  //   return this.cart
  // }
}
