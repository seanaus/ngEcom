import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: any;
  gallery: any;
  subscription: any
  // product: Product = {};
  Id: string ="";

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pId = routeParams.get('id');
    this.Id = (pId !== null) ? pId : "-1";
    this.getProduct(this.Id)
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
    // const url = target.style.backgroundImage
    // const url = target.id
    // console.log(url)
    this.product.image = target.id;
  }

}
