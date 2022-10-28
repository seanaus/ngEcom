import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { ProductService } from 'src/services/product.service';
import { ItemCardOptions } from '../../../enums/itemCardOptions'
export const afc = (message: string) => { console.log(message) }

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  cardType = ItemCardOptions.Product

  constructor(private productService: ProductService) { }

  async ngOnInit() {
    this.products = [];
    const product$ = await this.productService.getProducts()
    product$.subscribe((products) => {
        this.products= [...products]
    })
  }

}
