import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartId: string = "";
  cart: any;

  constructor(private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    // const id = routeParams.get('id') !== null ? routeParams.get('id') : "-1" ;
    const cId = routeParams.get('id');
    this.cartId = (cId !== null) ? cId : "-1";
    this.cart = await this.cartService.getCart(this.cartId);
    this.log(this.cartId)
  }

  log(id: string) {
    console.log(`CART_ID: ${id}`);
    console.log(this.cart);
  }

}
