import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/models/product';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';
import { CookieService } from 'src/services/cookie.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: any;
  gallery: any;
  subscription: any
  userId: string | undefined ;
  Id: string ="";

  constructor(private authService: AuthService,
              private productService: ProductService,
              private cookieService: CookieService,
              private cartService: CartService,
              private router: Router,
              private route: ActivatedRoute) { }

  async ngOnInit() {
    // this.subscription = this.authService.user.subscribe(user => {
    //   this.userId = user?.uid
    // });
    const routeParams = this.route.snapshot.paramMap;
    const pId = routeParams.get('id');
    this.Id = (pId !== null) ? pId : "-1";
    this.getProduct(this.Id);
  }
  async getProduct(id: string) {
    const product$ = await this.productService.getProduct(id)
    product$.subscribe((product) => {
      this.product = product
      // console.log(product)
    })
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  refreshImage(event: any) {
    const target = event.target as HTMLImageElement;
    this.product.image = target.id;
  }

  addToCart(item: Product) {
    //this.cookieService.setCookie("cartId", "xcgertu2091", 30);
    // if(this.cartService.userId === undefined) {
    //   this.cartService.init(this.userId)
    // }
    this.cartService.add(item)
    // this.router.navigateByUrl("/parts") 
    this.router.navigateByUrl("/parts");
  }

}
