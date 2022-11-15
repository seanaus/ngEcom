import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, doc, docSnapshots, Firestore, setDoc, increment } from '@angular/fire/firestore';
import { Product } from 'src/models/product'
import { CookieService } from './cookie.service';
import { DateService } from './date.service';
import { map } from 'rxjs';

const aggregate = (total: number, value: any) => { return total + value }
@Injectable({
  providedIn: 'root'
})
export class CartService {

  userId: string | null = null;
  cartId: string | null = null;
  // forename: any;
  // surname: any;
  // address1: any;
  // address2: any;
  // town: any;
  // city: any;
  // county: any;
  // postcode: any;
  // telephone: any;
  // email: any;
  // nameOnCard: any;
  // cardNo: any;
  // expiryDate: any;
  // csv: any;
  created = new Date();

  cart: any

  constructor(private db: Firestore,
    private cookieService: CookieService,
    private dateService: DateService) {
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
    const cart$ = await this.getCart(this.cartId)
    cart$.subscribe((cart: any) => {
      this.cart = cart;
    })
    return Promise.resolve(true)
  }
  clearCart() {
    this.cart = {};
    this.cartId = "";
  }
  async createCart() {
    const colRef = collection(this.db, "cart")
    return await addDoc(colRef, {
      userId: this.userId,
      // forename: "",
      // surname: "",
      // address1: "",
      // address2: "",
      // town: "",
      // city: "",
      // county: "",
      // postcode: "",
      // telephone: "",
      // email: "",
      // nameOnCard: "",
      // cardNo: "",
      // expiryDate: "",
      // csv: "",
      // processed: "",
      items: this.cart?.items ?? [] as Array<any>,
      totalCount: 0,
      totalCost: 0,
      created: this.dateService.getDateTime({}, "dd/mm/yyyy hh:mm:ss:ms")
    });
  }
  async getCart(cartId: string) {
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
      this.cart.items[index].cost =  +this.cart.items[index].unitCost * +this.cart.items[index].quantity
    }
    if(option === "-") {
      if(this.cart.items[index].quantity > 1) {
        this.cart.items[index].quantity--;
        this.cart.items[index].cost =  +this.cart.items[index].unitCost * +this.cart.items[index].quantity
      }
    }
    await this.updateCart();
  }

  calculateTotals() {
    // console.log("TOTALS");
    // console.log(JSON.stringify(this.cart));
    if (this.cart.items.length > 0) {
      this.cart.totalCount = this.cart.items.map((item: any) => { return +item.quantity }).reduce(aggregate)
      this.cart.totalCost = this.cart.items.map((item: any) => { return +item.cost }).reduce(aggregate)
    } else {
      this.cart.totalCount = 0
      this.cart.totalCost = 0
    }
  }
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
  async checkout(data: any) {
    const docRef = doc(this.db, "cart", (this.cartId === null) ? "" : this.cartId);
    return setDoc(docRef, data, { merge: true })
  }
  async complete() {
    const now = this.dateService.getDateTime({},"dd/mm/yyyy hh:mm:ss");
    const docRef = doc(this.db, "cart", (this.cartId === null) ? "" : this.cartId);
    return setDoc(docRef, {
      complete: true,
      completed: now
    },
    { merge: true })
  }
  logCart() {
    console.log("SHOPPING CART")
    console.log(JSON.stringify(this.cart))
  }

}
