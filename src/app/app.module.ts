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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { DatePipe } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartTotalsComponent } from './components/cart-totals/cart-totals.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemCardPannelComponent } from './components/item-card-pannel/item-card-pannel.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PayComponent } from './components/pay/pay.component'

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
    ProductDetailsComponent,
    CartComponent,
    CartTotalsComponent,
    CarouselComponent,
    ItemCardComponent,
    ItemCardPannelComponent,
    CheckoutComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
