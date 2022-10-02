import { Injectable, Optional } from '@angular/core';
import { Auth, authState, User, UserCredential } from '@angular/fire/auth';
import { signOut, 
          GoogleAuthProvider, 
          signInWithPopup, 
          createUserWithEmailAndPassword, 
          signInWithEmailAndPassword } from "firebase/auth";
import { EMPTY, Observable, Subscription, tap } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';
import { map } from 'rxjs/operators';
import { SignInOptions } from '../enums/signInOptions'
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;
  public isLoggedIn: boolean = false;
  public userId: string = "";
  public errorCode: string = "";

  constructor(@Optional() private auth: Auth) {
    if (auth) {
      this.user = authState(this.auth).pipe(
        tap(user => console.log('AuthService: user: ', user?.email))
      );
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn
      });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  logIn = async (email: string, password: string, option?: SignInOptions | SignInOptions.UseGoogleAuthentication) => {

    switch(option) {
      case SignInOptions.UseGoogleAuthentication:
        return await this.signInWithGoogle();
      case SignInOptions.SignInWithEmailAndPassword:
        return await this.signInUserWithEmail(email, password);
      case SignInOptions.CreateWithEmailAndPassword:
        return await this.createUserWithEmail(email, password);
      default:
        return await this.signInWithGoogle();
    }

  }
  signInWithGoogle = async () => {
    try {
      return await signInWithPopup(this.auth, new GoogleAuthProvider());
    } catch(error) {
      return false
    }
  }
  signInUserWithEmail = async(email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password)
    } catch (error) {
      this.errorCode = this.errorLog(error).code;
      return false
    }
  }
  createUserWithEmail = async (email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password)
    } catch (error) {
      this.errorCode = this.errorLog(error).code;
      return false
    }
  }
  logOut = async () => {
    this.isLoggedIn = false;
    return signOut(this.auth)
  }

  errorLog(error: any): FirebaseError {
    return error
  }
  // TypeCheck(check: UserCredential| FirebaseError): boolean {
  //   if (typeof check === typeof "UserCredential") {
  //     console.log()
  //   }
  //   return err
  // }
}
