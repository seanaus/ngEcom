import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckoutComponent } from './components/checkout/checkout.component'
import { PaymentComponent } from './components/payment/payment.component';
import  {AuthGuard} from '../services/auth-guard'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'location', component: LocationComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: 'products/product-detail/:id', canActivate: [AuthGuard], component: ProductDetailsComponent },
  { path: 'cart/checkout/:id', canActivate: [AuthGuard], component: CheckoutComponent },
  { path: 'cart/checkout/payment/:id', canActivate: [AuthGuard], component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
