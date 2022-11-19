import { CartService } from 'src/services/cart.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CookieService } from 'src/services/cookie.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cartId = "";
  cart: any;

  payForm = this.fb.group({
    payment: this.fb.group({
      nameOnCard: ['', Validators.required],
      cardNo: ['', Validators.required],
      expiryDate: ['', Validators.required],
      csv: ['', Validators.required]
    })
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private cookieService: CookieService,
    private fb: FormBuilder) { }

  async ngOnInit() {
    this.cartId = this.route.snapshot.paramMap.get('id') ?? "";
    if (this.cartId !== "") {
      const cart$ = await this.cartService.getCart(this.cartId)
      cart$.subscribe((cart) => {
        this.cart = cart
      })
    }
  }
  onCancel() {
    this.router.navigateByUrl(`/cart/checkout/${this.cartId}`);
  }
  async onSubmit() {
    const submission = this.payForm.getRawValue();
    await this.cartService.checkout(submission);
    await this.cartService.complete();
    await this.archiveCart();
  }
  async archiveCart() {
    this.cookieService.expireCookie("cartId", this.cartId)
    await this.cartService.clearCart();
    this.router.navigateByUrl(`/home`);
  }

}
