import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButton, MatButtonModule, MatCardModule, MatIconModule, MatRippleModule, MatTabsModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { MakananComponent } from './order/makanan/makanan.component';
import { MinumanComponent } from './order/minuman/minuman.component';
import { PesananComponent } from './order/pesanan/pesanan.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    MakananComponent,
    MinumanComponent,
    PesananComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // OTHER
    CarouselModule,

    // MATERIAL
    MatRippleModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
