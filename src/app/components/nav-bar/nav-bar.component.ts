import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  links = [
    {
      name: 'home', 
      link: '/home',
      label: 'HOME'
    },
    {
      name: 'about', 
      link: '/about',
      label: 'ABOUT'
    },
    {
      name: 'products', 
      link: '/products',
      label: 'PRODUCTS'
    },
    {
      name: 'location', 
      link: '/location',
      label: 'LOCATION'
    },
    {
      name: 'cart', 
      link: '/cart',
      label: 'CART'
    },
    {
      name: 'login', 
      link: '/login',
      label: 'LOGIN'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
