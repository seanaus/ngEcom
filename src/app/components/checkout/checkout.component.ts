import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
export interface IField {
  name: string;
  value: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  cartId = "";
  cart: any;

  constructor(private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

    checkoutForm = this.fb.group({
      delivery: this.fb.group({
        forename: ['', Validators.required],
        surname: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        town: ['', Validators.required],
        city: ['', Validators.required],
        county: ['', Validators.required],
        postcode: ['', Validators.required],
        telephone: ['', Validators.required],
        email: ['', Validators.required]
      })
    });

    async ngOnInit() {
      this.cartId  = this.route.snapshot.paramMap.get('id') ?? "";
      if (this.cartId  !== "") {
        const cart$ = await this.cartService.getCart(this.cartId)
        cart$.subscribe((cart) => {
          this.cart = cart
        })
      }
    }
    onCancel() {
      this.router.navigateByUrl("/cart");
    }
    async onSubmit() {
      const submission = this.checkoutForm.getRawValue();
      await this.cartService.checkout(submission);
      this.router.navigateByUrl(`/cart/checkout/payment/${ this.cartId}`);
    }

    // printForm(obj: any) {
    //   console.log("printForm");
    //   Object.entries(obj).forEach(([key, value], index) => {
    //     // 👇️👇️👇️👇️ name Tom 0, country Chile 1
    //     console.log(key, value, index);
    //   });

    // }

}
