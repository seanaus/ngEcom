import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { User } from '@angular/fire/auth';
// import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { SignInOptions } from '../../../enums/signInOptions'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {

  logIns = SignInOptions
  email: string = "";
  password: string = "";
  subscription: any;
  message = "";
  user = this.userService.appUser();
  
  constructor(private authService: AuthService,
    private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cacheUser(id: string, email: string | null, displayName: string | null) {
    const firstName = 0;
    const lastName = 1;
    const splitBy = " ";

    this.user.id = id;
    this.user.email = email === null ? "undefined" : email;
    this.user.displayName = displayName === null ? "undefined undefined" : displayName;

    const names = this.user.displayName.split(splitBy);
    
    if (names && names.length > 0) {
      this.user.firstName = names[firstName];
    }
    if (names && names.length > 1) {
      this.user.lastName = names[lastName];
    }
  }
  async logIn(option: SignInOptions) {
    this.message = "";
    if (!this.authService.isLoggedIn) {
      if (option === SignInOptions.SignInWithEmailAndPassword) {
        const result = await this.authService.signInUserWithEmail(this.email, this.password)
        if (!result) this.message = this.authService.errorCode
      }
      if (option === SignInOptions.UseGoogleAuthentication) {
        const result = await this.authService.signInWithGoogle();
        if (!result) {
          this.message = "Invalid Google Credentials!!"
        } else {
          this.cacheUser(result.user.uid, result.user.email,result.user.displayName)
        }
      }
      this.subscription = this.authService.user.subscribe(async (user) => { 
        if (this.authService.isLoggedIn) {
          this.user.id = user?.uid;
          await this.userService.addUser(this.user, this.user.id);
          this.router.navigateByUrl('/')
        }
      })
    }
  }

}
