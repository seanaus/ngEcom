import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docSnapshots, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: Firestore) {

  }

  async getProducts() {
    const colRef = collection(this.db, 'products');
    return collectionData(
      colRef, { idField: 'id' }
    )
  }

  async getProduct(id: string) {
    const docRef = doc(this.db, 'products', id);
    return docSnapshots(docRef).pipe(map(data => data.data()));
  }
}
