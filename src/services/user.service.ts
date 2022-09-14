import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, getDocs, docSnapshots, where, setDoc, addDoc } from '@angular/fire/firestore';
import { User } from '../models/user';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: Firestore, private authService: AuthService) {

  }

  // async getUsersAlt() {
  //   const colRef = collection(this.db, 'users');
  //   return getDocs<User>(colRef)
  // }

  async getUsers(){
    console.log("getUsers");
    const colRef = collection(this.db, 'users');
    return collectionData(
      colRef, { idField: 'id' }
    )
    // return getDocs<User>( TRY ME!!!
    //   colRef, { idField: 'id' }
    // )
    //   this.items.push(item)
    // })
    // return collectionData(
    //   query(q), { idField: 'id' }
    // )
    // const list = collection(this.db, 'items');
    // return query(list as CollectionReference,
    //   where('id','!==',null)
    // ), { idField: 'id' }
    // const docs = await getDocs(list);
    // const items = docs.docs.map(doc => { return { id: doc.id, ...doc.data() } });
    // console.log(items);
  }

  async getUser(id: string) {
    console.log("getUser");
    const ref = doc(this.db, 'users', id);
    return docSnapshots(ref).pipe(map(data => data.data()));
  }
  async addUser(data: User, id?: any) {

    const meta = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      displayName: data.displayName ? data.displayName : `${data.firstName} ${data.lastName}`
    }

    if (id) {
      const docRef = doc(this.db, 'users', id);
      await setDoc(docRef, meta , { merge: true });
    } else {
      const colRef = collection(this.db, "users");
      await addDoc(colRef, meta);
    }
  }

  appUser(): User {
    return {
      id: "",
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      password: ""
    };
  }
  // displayName(email: string) {
  //   const name = email.split("@")

  // }
}
