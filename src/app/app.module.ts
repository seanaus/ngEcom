import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
// import { CarsComponent } from './components/cars/cars.component';
// import { BreakingComponent } from './components/breaking/breaking.component';
import { ProductsComponent } from './components/products/products.component';
// import { RestorationComponent } from './components/restoration/restoration.component';
import { LocationComponent } from './components/location/location.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { DatePipe } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartItemQuantityComponent } from './components/cart-item-quantity/cart-item-quantity.component';
import { CartTotalsComponent } from './components/cart-totals/cart-totals.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemCardPannelComponent } from './components/item-card-pannel/item-card-pannel.component'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProductsComponent,
    LocationComponent,
    FooterComponent,
    LogInComponent,
    RegisterComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CartComponent,
    CartItemComponent,
    CartItemQuantityComponent,
    CartTotalsComponent,
    CarouselComponent,
    ItemCardComponent,
    ItemCardPannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
