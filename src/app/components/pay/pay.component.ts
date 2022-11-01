import { CartService } from 'src/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  cartId = "";
  cart: any;
  nameOnCard : any;
  cardNo: any;
  expiryDate: any;
  csv : any;

  payForm = this.fb.group({
    nameOnCard: ['', Validators.required],
    cardNo: ['', Validators.required],
    expiryDate: ['', Validators.required],
    csv: ['', Validators.required]
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
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
  onSubmit() {
    const submission = this.payForm.getRawValue();
    this.nameOnCard = submission?.nameOnCard ?? '';
    this.cardNo = submission?.cardNo ?? '';
    this.expiryDate = submission?.expiryDate ?? '';
    this.csv = submission?.csv ?? '';
    this.logInfo();
  }
  logInfo() {
    console.log(`NameOnCard: ${ this.nameOnCard }`);
    console.log(`CardNo: ${ this.cardNo }`);
    console.log(`EXPIRY: ${ this.expiryDate }`);
    console.log(`CSV: ${ this.csv }`);
  }

}
