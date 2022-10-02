import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { addDoc, collection, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/models/cart';
import { CartItem } from 'src/models/cartItem';
import { Product } from 'src/models/product'
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // cart: Cart = {};
  //this.cart.items.push()
  // subscription: any;
  items: CartItem[] = [];
  totalCount = 0;
  totalCost = 0;
  userId: string | null = null;
  cartId: string | null = null;

  constructor(private db: Firestore,
              private cookieService: CookieService) {}

  init() {
    if(this.userId === null) this.userId = this.cookieService.getCookie("userId")
    if(this.cartId === null) {
      this.cartId = this.cookieService.getCookie("cartId")
      this.saveCart(this.cartId);
    }
  }
  add(item: Product) {
    this.init();
    const index = this.itemExists(item)
    if(index === -1) {
      this.items.push({
        id: item.id,
        code: item.code,
        name: item.name,
        image: item.image,
        unitCost: item.unitCost,
        quantity: 1
      });
    } else {
      this.editQuantity("+",index)
    }
  }
  delete(index: number) {
    this.items.splice(index,1);
  }
  itemExists(newItem: Product) {
    return this.items.findIndex(item => item.id === newItem.id)
  }
  editQuantity(option:string, index: number) {
    if(option === "+") {
      this.items[index].quantity++;
    }
    if(option === "-") {
      if(this.items[index].quantity > 1) {
        this.items[index].quantity--;
      } else {
        this.delete(index);
      }
    }
  }
  async saveCart(cartId:string | null) {
    if(cartId === null) {
      const timeStamp = new Date();
      const docRef = await addDoc(collection(this.db, "cart"), {
        userId: this.userId,
        totalCount: this.totalCount,
        totalCost: this.totalCost,
        createdDate: timeStamp
      });
      this.cartId = docRef.id;
      this.cookieService.setCookie("cartId", this.cartId, 30);
    }
    await this.saveCartItems();
  }
  async saveCartItems() {
    const Id = (this.cartId == null)? "" : this.cartId;
    const docRef = doc(this.db, "cart", Id);
    await updateDoc(docRef, { items:this.items,totalCount: this.totalCount,totalCost: this.totalCost });
  }
  // console.log("Document written with ID: ", docRef.id);
  // get():any[] {
  //   return this.cart
  // }
}
