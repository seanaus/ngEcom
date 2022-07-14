import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword  } from "firebase/auth";
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}


}
