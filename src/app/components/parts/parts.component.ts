import { Component, OnInit, OnDestroy } from '@angular/core';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { Observable, of, map, tap } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { ProductService } from 'src/services/product.service';
export const afc = (message: string) => { console.log(message) }

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  products: any = [];
  subscription: any

  constructor(private firestore: Firestore,
    private productService: ProductService) { }

  async ngOnInit() {
    this.products = [];
    const product$ = await this.productService.getProducts()
    product$.subscribe((products) => {
        this.products= [...products]
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
