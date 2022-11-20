import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/models/product';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  gallery: any;
  subscription: any
  userId: string | undefined ;
  Id: string = "";
  auth = this.authService.isLoggedIn;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      await this.getProduct(id);
    }
  }

  async getProduct(id: string) {
    const product$ = await this.productService.getProduct(id)
    product$.subscribe((product) => {
      this.product = product
    })
  }

  refreshImage(event: any) {
    const target = event.target as HTMLImageElement;
    this.product.image = target.id;
  }

  addToCart(item: Product) {
    if(this.auth) {
      this.cartService.add(item)
      this.router.navigateByUrl("/products");
    } else {
      this.router.navigateByUrl("/logIn");
    }
  }

}
