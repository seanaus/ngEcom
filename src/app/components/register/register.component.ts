import { Component, OnDestroy } from '@angular/core';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { SignInOptions } from 'src/enums/signInOptions';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements  OnDestroy {
  logIns = SignInOptions
  subscription: any;
  password2: string = "";
  message = "";

  user = this.userService.appUser();

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router){}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  async register(option: SignInOptions) {
    if (!this.authService.isLoggedIn && this.validateForm()) {
      const cred = await this.authService.createUserWithEmail(this.user.email, this.user.password);
      if (!cred) this.message = this.authService.errorCode
    }
    this.subscription = this.authService.user.subscribe(async (user) => {
      if (this.authService.isLoggedIn) {
        this.user.id = user?.uid;
        // console.log(user);
        await this.userService.addUser(this.user, this.user.id);
        this.router.navigateByUrl("/");
      }
    })
  }
  // appUser(): User {
  //   return {
  //     id: "",
  //     firstName: "",
  //     lastName: "",
  //     displayName: "",
  //     email: "",
  //     password: ""
  //   };
  // }
  validateForm(): boolean {
    this.logMessage("");
    let isValid = true;

    isValid = this.passwordsMatch(this.user.password, this.password2)
    if (!isValid) this.logMessage("Passwords do not Match");

    if (isValid) {
      isValid = this.passwordRequirements(this.user.password)
      if (!isValid) this.logMessage("Password needs to be 8 chars or more");
    }
    return isValid;
  }
  passwordsMatch(password: string, password2: string): boolean {
    return password === this.password2? true: false
  }
  passwordRequirements(password: string): boolean {
    return password.length >= 8 ? true : false
  }
  logMessage(message: string) {
    this.message = message;
  }
}
