import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButton, MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatRippleModule, MatSelectModule, MatStepperModule, MatTabsModule } from '@angular/material';
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
import { SendDialogComponent } from './dialog/send-dialog/send-dialog.component';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodeDialogComponent } from './dialog/qrcode-dialog/qrcode-dialog.component';
import { TableDialogComponent } from './dialog/table-dialog/table-dialog.component';
import { TrackingOrderComponent } from './tracking-order/tracking-order.component';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { SocketserviceService } from './service/socketservice.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

export function playerFactory() {
  return player;
}

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };


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
    CustomDialogComponent,
    SendDialogComponent,
    QrcodeDialogComponent,
    TableDialogComponent,
    TrackingOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    // OTHER
    CarouselModule,
    QRCodeModule,
    LottieModule.forRoot({ player: playerFactory }),
    SocketIoModule.forRoot(config),


    // MATERIAL
    MatRippleModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule

  ],
  entryComponents: [CustomDialogComponent, OrderDialogComponent, SendDialogComponent, QrcodeDialogComponent, TableDialogComponent],
  providers: [DataserviceService, SocketserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
