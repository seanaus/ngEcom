import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';
// import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cartItem';
import { Product } from 'src/models/product'
// import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
// import { UserService } from './user.service';

import { DatePipe } from '@angular/common'
import { map } from 'rxjs';
import { Cart } from 'src/models/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId: string | null = null;
  cartId: string | null = null;
  items: CartItem[] = [];
  totalCount = 0;
  totalCost = 0;
  created = new Date();
  cart: any

  constructor(private db: Firestore,
    private cookieService: CookieService,
    private datepipe: DatePipe) {
    this.init();
  }

  async init() {
    // LATER IF NO USERID ?????
    if(this.userId === null) this.userId = this.cookieService.getCookie("userId");
    if(this.cartId === null) this.cartId = this.cookieService.getCookie("cartId");

    // Create Cart in Firebase & return CartId
    if(this.cartId === null) {
      const docRef = await this.saveCart();
      this.cartId = docRef.id;
      this.cookieService.setCookie("cartId", this.cartId, 30);
    }
    const cart$= await this.getCart(this.cartId)
    cart$.subscribe((cart) => {
      this.cart = cart;
    })
    return Promise.resolve(true)
  }

  itemExists(newItem: Product) {
    const items: CartItem[] = this.cart.items;
    if (items !== undefined) {
      return items.findIndex((item) => item.id === newItem.id)
    } else {
      return -1
    }
  }
  async getCart(cartId: string) {
    const docRef = doc(this.db, 'cart', cartId);
    return docSnapshots(docRef).pipe(map(data => ({...data.data(), cartId})));
  }

  async add(item: Product) {
    const index = this.itemExists(item)
    if (index === -1) {
      this.cart.items = [...this.cart.items, {...item, itemCost: item.unitCost, quantity:1}]
    } else {
      this.editQuantity("+",index)
    }
    await this.updateCart();
  }

  delete(index: number) {
    this.cart.items.splice(index,1);
  }

  editQuantity(option:string, index: number) {
    // const unitCost = (this.items[index].unitCost === undefined)? 0: this.items[index].unitCost
    if(option === "+") {
      this.cart.items[index].quantity++;
      this.cart.items[index].itemCost = this.cart.items[index].unitCost * this.cart.items[index].quantity
    }
    if(option === "-") {
      if(this.items[index].quantity > 1) {
        this.cart.items[index].quantity--;
        this.cart.items[index].itemCost =  this.cart.items[index].unitCost * this.cart.items[index].quantity
      } else {
        this.delete(index);
      }
    }
  }

  async saveCart() {
    const colRef = collection(this.db, "cart")
    return await addDoc(colRef, {
      id: this.cart.id,
      userId: this.userId,
      items: []=[],
      totalCount: this.totalCount,
      totalCost: this.totalCost,
      created: this.datepipe.transform(this.created, 'dd-MM-yyyy')
    });
  }
  async updateCart() {
    // const items= this.items as Array<any>;
    const docRef = doc(this.db, "cart", (this.cartId === null)? "": this.cartId);
    return setDoc(docRef, {
      items: this.cart.items
    }, {
      merge: true
    })
  }

  logCart() {
    console.log(JSON.stringify(this.cart))
  }

}
