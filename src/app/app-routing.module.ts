import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakingComponent } from './components/breaking/breaking.component';
import { CarsComponent } from './components/cars/cars.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LocationComponent } from './components/location/location.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { PartsComponent } from './components/parts/parts.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { RestorationComponent } from './components/restoration/restoration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'breaking', component: BreakingComponent },
  { path: 'parts', component: PartsComponent },
  { path: 'restoration', component: RestorationComponent },
  { path: 'location', component: LocationComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'parts/product-detail/:id', component: ProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
