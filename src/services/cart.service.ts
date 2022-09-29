import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject([null]);
  constructor() { }

  add(item: Product) {

  }
  del(item: Product) {

  }
  get() {
    return this.cart
  }
}
