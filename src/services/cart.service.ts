import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, doc, docSnapshots, Firestore, setDoc, increment } from '@angular/fire/firestore';
// import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cartItem';
import { Product } from 'src/models/product'
// import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
// import { UserService } from './user.service';

import { DatePipe } from '@angular/common'
import { map } from 'rxjs';
import { Cart } from 'src/models/cart';

// const getTotalCount = (total: number, item: any) => { return total + item.quantity }
// const getTotalCost = (total: number, item:any) => { return total + item.cost }
const aggregate = (total: number, value: any) => { return total + value }
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
  quantity_counter = 0;

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
      const docRef = await this.createCart();
      this.cartId = docRef.id;
      this.cookieService.setCookie("cartId", this.cartId, 30);
    }
    // GET CART FROM FIRESTORE
    const cart$= await this.getCart(this.cartId)
    cart$.subscribe((cart) => {
      this.cart = cart;
    })
    return Promise.resolve(true)
  }
  async createCart() {
    const colRef = collection(this.db, "cart")
    return await addDoc(colRef, {
      userId: this.userId,
      items: this.items as Array<any>,
      totalCount: 0,
      totalCost: 0,
      created: this.datepipe.transform(this.created, 'dd-MM-yyyy')
        + ":" + this.created.getHours()
        + ":" + this.created.getMinutes()
        + ":" + this.created.getSeconds()
    });
  }
  async getCart(cartId:string) {
    const docRef = doc(this.db, 'cart', cartId);
    return docSnapshots(docRef).pipe(map(data => ({...data.data(), cartId})));
  }
  itemExists(newItem: Product) {
    return this.cart.items.findIndex((item:any) => item.id === newItem.id)
  }
  async add(item: Product) {
    this.logCart();
    const index = this.itemExists(item)
    if(index === -1) {
      this.cart.items = [...this.cart.items, { ...item, cost: item.unitCost, quantity: 1 }];
      await this.updateCart();
    } else {
      this.editQuantity("+",index)
    }
  }
  async delete(index: number) {
    this.cart.items.splice(index, 1);
    await this.updateCart();
  }

  async editQuantity(option:string, index: number) {
    if(option === "+") {
      this.cart.items[index].quantity++;
      this.cart.items[index].cost =  this.cart.items[index].unitCost * this.cart.items[index].quantity
    }
    if(option === "-") {
      if(this.cart.items[index].quantity > 1) {
        this.cart.items[index].quantity--;
        this.cart.items[index].cost =  this.cart.items[index].unitCost * this.cart.items[index].quantity
      // } else {
      //   this.delete(index);
      }
    }
    await this.updateCart();
  }

  calculateTotals() {
    console.log("TOTALS");
    console.log(JSON.stringify(this.cart));
    if (this.cart.items.length > 0) {
      this.cart.totalCount = this.cart.items.map((item: any) => { return item.quantity }).reduce(aggregate)
      this.cart.totalCost = this.cart.items.map((item: any) => { return item.cost }).reduce(aggregate)
    } else {
      this.cart.totalCount = 0
      this.cart.totalCost = 0
    }
  }
  // async saveCart() {
  //   const colRef = collection(this.db, "cart")
  //   return await addDoc(colRef, {
  //     userId: this.userId,
  //     items: this.cart.items as Array<any>,
  //     totalCount: this.totalCount,
  //     totalCost: this.totalCost,
  //     created: this.datepipe.transform(this.created, 'dd-MM-yyyy')
  //   });
  // }
  async updateCart() {
    this.calculateTotals()
    const docRef = doc(this.db, "cart", (this.cartId === null)? "": this.cartId);
    return setDoc(docRef, {
      items: this.cart.items,
      totalCount: this.cart.totalCount,
      totalCost: this.cart.totalCost
    }, {
      merge: true
    })
  }

  logCart() {
    console.log("SHOPPING CART")
    console.log(JSON.stringify(this.cart))
  }



  // async updateQuantity(cartId: string) {
  //   const docRef = doc(this.db, 'cart', cartId);
  //   await setDoc(docRef, {
  //     quantity: increment(this.quantity_counter)
  //   })
  // }

}
