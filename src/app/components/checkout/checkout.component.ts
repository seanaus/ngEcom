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
  forename: any;
  surname: any;
  address1: any;
  address2 : any;
  town: any;
  city : any;
  county: any;
  postcode: any;
  telephone: any;
  email: any;

  fieldList: IField[] = [];

  constructor(private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

    checkoutForm = this.fb.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      address: this.fb.group({
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
      // console.log(submission);

      //this.fieldList = [...this.fieldList, { name: "", value: ""}]
      // this.forename = submission?.forename ?? '';
      // this.surname = submission?.surname ?? '';
      // this.address1 = submission?.address?.address1 ?? '';
      // this.address2 = submission?.address?.address2 ?? '';
      // this.town = submission?.address?.town ?? '';
      // this.city = submission?.address?.city ?? '';
      // this.county = submission?.address?.county ?? '';
      // this.postcode = submission?.address?.postcode ?? '';
      // this.telephone = submission?.address?.telephone ?? '';
      // this.email = submission?.address?.email ?? '';
      // this.logInfo();
      // this.printForm(submission);
      await this.cartService.checkout(submission);
      this.router.navigateByUrl(`/cart/checkout/payment/${ this.cartId}`);
    }

    printForm(obj: any) {
      console.log("printForm");
      Object.entries(obj).forEach(([key, value], index) => {
        // 👇️👇️👇️👇️ name Tom 0, country Chile 1
        console.log(key, value, index);
      });

    }


    logInfo() {
      console.log(`Forename: ${ this.forename }`);
      console.log(`Surname: ${ this.surname }`);
      console.log(`Address1: ${ this.address1 }`);
      console.log(`Address2: ${ this.address2 }`);
      console.log(`Town: ${ this.town }`);
      console.log(`City: ${ this.city }`);
      console.log(`County: ${ this.county }`);
      console.log(`Postcode: ${ this.postcode }`);
      console.log(`Telephone: ${ this.telephone }`);
      console.log(`Email: ${ this.email }`);
    }
}
