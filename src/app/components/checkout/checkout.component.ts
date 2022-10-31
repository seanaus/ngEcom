import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart: any;

  forename = "";
  surname = "";
  address = "";
  town = "";
  city = "";
  county = "";
  postcode = "";
  telephone = "";
  email = "";
  nameOnCard = "";
  cardNo = "";
  expiryDate = "";
  csv = "";

  deliveryDetails = true;
  paymentDetails = false;
  message = "";

  constructor(private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
      
    if (id !== null) {
      const cart$ = await this.cartService.getCart(id)
      cart$.subscribe((cart) => {
        this.cart = cart
      })
    }
  }
  cancelPayment() {
    this.router.navigateByUrl("/cart");
  }
  pay() {
    console.log(`CART_ID: ${this.cart.id}`);
    console.log(this.cart);
  }
  deliveryView() {
    this.deliveryDetails = true;
    this.paymentDetails = false;
    this.resetPaymentDetails();
  }
  paymentView() {
    this.paymentDetails = true;
    this.deliveryDetails = false;
  }

  resetPaymentDetails() {
    this.nameOnCard = "";
    this.cardNo = "";
    this.expiryDate = "";
    this.csv = "";
  }

  validateForm(): boolean { 
    this.logMessage("");
    let isValid = true;

    return isValid;

  }
  logMessage(message: string) {
    this.message = message;
  }
}
