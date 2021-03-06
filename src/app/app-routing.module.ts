import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path:'home', component: HomeComponent },
  { path:'about', component: AboutComponent },
  { path:'products', component: ProductListComponent },
  { path:'product/:id', component: ProductDetailsComponent },
  { path:'location', component: LocationComponent },
  { path:'cart', component: CartComponent },
  { path:'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
