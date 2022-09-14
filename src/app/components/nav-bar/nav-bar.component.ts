import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  subscription: any;
  // user: any;
  // userId: string | null | undefined = "";
  // email: string | null | undefined = "";
  // name: string | null | undefined = "";
  isLoggedIn: boolean = false;
  isCollapsed: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {

  }

  async ngOnInit() {
    this.subscription = this.authService.user.subscribe(user => {
      console.log("NavBarComponent: Id: " + user?.uid);
      this.isLoggedIn = this.authService.isLoggedIn

    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  logOut() {
    this.authService.logOut();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.router.navigateByUrl("/")
  }
  cacheUser(user: any): User | null {
    if (user !== null) {
      return {
        id: user?.uid,
        email: user?.email,
        firstName: "",
        lastName: "",
        password: "",
        displayName: user?.displayName
      }

    } else {
      return null
    }
  }
  toggleNavPills() {
    this.isCollapsed = !this.isCollapsed
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.matchMedia("(min-width: 768px)").matches) {
      this.isCollapsed = false;
    }
  }
}
