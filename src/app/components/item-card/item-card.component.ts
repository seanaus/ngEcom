import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
// import { AuthService } from "../../../services/auth.service";
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthGuard } from "../../../services/auth-guard";

import { ItemCardOptions } from 'src/enums/itemCardOptions';
@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: any;
  @Input() idx: any;
  @Input() cardType: number = 0;

  cardOptions = ItemCardOptions
  routerLink: any = null;
  // auth = this.authService.isLoggedIn;
  // constructor(private authService: AuthService, 
  //             private router: Router,
  //             private route: ActivatedRoute ) { }

  constructor() {}
  ngOnInit(): void {
    if (this.cardType === this.cardOptions.Product) {
      // if (this.auth) {
      //   this.routerLink = ['product-detail/', this.item.id];
      // } else {
      //   this.routerLink = 'home';
      //   this.router.navigateByUrl("home")
      // }
      this.routerLink = ['product-detail/', this.item.id];
    }
  }

}
