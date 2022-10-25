import { Injectable } from '@angular/core';
import { collection, collectionData, doc, docSnapshots, Firestore } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // id: string | null = null;
  // name: string | null = null;
  // vatMetric: number | null = null;

  // settings$: any;
  // settingsData: any;

  constructor(private db: Firestore) {}

  async getSettings(id:string) {
    const docRef = doc(this.db, 'settings', id);
    return docSnapshots(docRef).pipe(map(data => ({...data.data(),id})));
  }

}
