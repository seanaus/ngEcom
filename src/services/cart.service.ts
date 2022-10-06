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

    // const cart$ = await this.getCart(this.cartId);
    // cart$.subscribe((cart) => {
    //   this.cart= cart;
    // })

    // this.totalCount = this.cart.totalCount;
    // this.totalCost = this.cart.totalCost;
    // this.created = this.cart.created;
    // this.items = [...this.cart.items];

    // console.log("LOADED CART");
    // console.log(`Total Cost:${this.totalCost}`);
    // console.log(`Total Count:${this.totalCount}`);
    // console.log(`Created:${this.created}`);
    // console.log(JSON.stringify(this.cart));
  }

  itemExists(newItem: Product) {
    return this.items.findIndex(item => item.id === newItem.id)
  }
  async getCart(cartId:string) {
    // const cartId = (this.cartId === null)? "": this.cartId
    const docRef = doc(this.db, 'cart', cartId);
    return docSnapshots(docRef).pipe(map(data => ({...data.data(), cartId})));
    // docSnapshots(docRef).pipe(map(data => ({ ...data.data(), cartId })))
    // .subscribe((cart) => {
    //     this.cart= cart;
    // })
    // this.totalCount = this.cart.totalCount;
    // this.totalCost = this.cart.totalCost;
    // this.created = this.cart.created;
    // this.items = [...this.cart.items];
  }

  async add(item: Product) {
    // await this.init();
    // console.log(this.cart);
    const index = this.itemExists(item)
    if(index === -1) {
      this.cart.items = [...this.cart.items, {...item, cost:0, quantity:1}]
      console.log(this.cart.items)
      // this.items.push({
      //   id: item.id,
      //   code: item.code,
      //   name: item.name,
      //   image: item.image,
      //   unitCost: item.unitCost,
      //   cost: 0,
      //   quantity: 1
      // });
    } else {
      this.editQuantity("+",index)
    }
    // console.log(JSON.stringify(this.cart));
    await this.updateCart();
    //this.logCart();
  }

  delete(index: number) {
    this.items.splice(index,1);
  }

  editQuantity(option:string, index: number) {
    // const unitCost = (this.items[index].unitCost === undefined)? 0: this.items[index].unitCost
    if(option === "+") {
      this.items[index].quantity++;
      // this.items[index].cost =  unitCost * this.items[index].quantity
    }
    if(option === "-") {
      if(this.items[index].quantity > 1) {
        this.items[index].quantity--;
        // this.items[index].cost =  this.items[index].unitCost * this.items[index].quantity
      } else {
        this.delete(index);
      }
    }
  }

  async saveCart() {
    const colRef = collection(this.db, "cart")
    return await addDoc(colRef, {
      userId: this.userId,
      totalCount: this.totalCount,
      totalCost: this.totalCost,
      created: this.datepipe.transform(this.created, 'dd-MM-yyyy')
    });
  }
  async updateCart() {
    // const items= this.items as Array<any>;
    const docRef = doc(this.db, "cart", (this.cartId === null)? "": this.cartId);
    return setDoc(docRef, {
      items: this.items
    }, {
      merge: true
    })
  }

  logCart() {
    console.log(JSON.stringify(this.cart))
  }

}
