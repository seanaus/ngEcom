import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docSnapshots, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private db: Firestore,) { }

  // async getCarousel() {
  //   const colRef = collection(this.db, 'carousel');
  //   return collectionData(
  //     colRef, { idField: 'id' }
  //   )
  // }

  async getCarousel(id:string) {
    const docRef = doc(this.db, 'carousel', id);
    return docSnapshots(docRef).pipe(map(data => ({...data.data(), id})));
  }
}
