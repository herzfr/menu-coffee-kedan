import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButton, MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatRippleModule, MatTabsModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { MakananComponent } from './order/makanan/makanan.component';
import { MinumanComponent } from './order/minuman/minuman.component';
import { PesananComponent } from './order/pesanan/pesanan.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DataserviceService } from './service/dataservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ShortNumberPipe } from './pipe/short-number.pipe';
import { OrderDialogComponent } from './dialog/order-dialog/order-dialog.component';
import { CustomDialogComponent } from './dialog/custom-dialog/custom-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    MakananComponent,
    MinumanComponent,
    PesananComponent,
    ShortNumberPipe,
    OrderDialogComponent,
    CustomDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // OTHER
    CarouselModule,

    // MATERIAL
    MatRippleModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatIconModule

  ],
  entryComponents: [CustomDialogComponent, OrderDialogComponent],
  providers: [DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
