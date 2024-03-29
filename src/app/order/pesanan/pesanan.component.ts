import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { QRCodeComponent } from 'angularx-qrcode';
import { CustomDialogComponent } from 'src/app/dialog/custom-dialog/custom-dialog.component';
import { QrcodeDialogComponent } from 'src/app/dialog/qrcode-dialog/qrcode-dialog.component';
import { SendDialogComponent } from 'src/app/dialog/send-dialog/send-dialog.component';
import { DataserviceService } from 'src/app/service/dataservice.service';
import { SocketserviceService } from 'src/app/service/socketservice.service';

@Component({
  selector: 'app-pesanan',
  templateUrl: './pesanan.component.html',
  styleUrls: ['./pesanan.component.css']
})
export class PesananComponent implements OnInit {
  @Output() someEvent = new EventEmitter<string>();

  cart;

  pajak = 10 / 100;

  total: number = 0;
  totalPajak: number = 0;
  grandTotal: number = 0;

  isHaveOrder: boolean = false;
  isHaveTrack: boolean = false;

  constructor(private dialog: MatDialog, private dataService: DataserviceService, private route: Router, private socketService: SocketserviceService) {
  }

  ngOnInit() {
    this.checkBadge()
    this.checkTotal()
    this.checkButtonTrack()
  }

  checkBadge() {
    let a = new Array;
    a = JSON.parse(localStorage.getItem('cart') || '[]');
    // console.log(a);
    if (a.length > 0) {
      this.isHaveOrder = true;
    } else {
      this.isHaveOrder = false;
    }
    this.cart = a;
    this.checkTotal()
  }

  getDataImage(event) {
    if (event == "" || event == null) {
      return 'assets/images/sample_minuman.png'
    } else {
      return event;
    }
  }

  delete(event) {
    // console.log(event);
    this.cart.forEach((item, index) => {
      if (index === event) {
        this.cart.splice(index, 1);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.checkBadge()
        this.callParent()
      }
    });
  }

  checkTotal() {
    this.total = 0;
    this.totalPajak = 0;
    this.grandTotal = 0;
    let a = new Array;
    a = JSON.parse(localStorage.getItem('cart') || '[]');
    if (a.length > 0) {
      a.forEach(item => {
        // console.log(item.harga);
        this.total = this.total + (item.harga * item.qty)
      })
      // console.log(this.total);
      this.totalPajak = this.pajak * this.total;
      this.grandTotal = this.total + this.totalPajak;
    }
  }

  callParent() {
    this.someEvent.emit('update');
  }

  clearAllOrder() {
    localStorage.removeItem('cart');
    this.cart = []
    this.checkBadge()
    this.callParent()
  }


  doOrder() {

    let data = new Array;
    data = JSON.parse(localStorage.getItem('cart') || '[]');
    if (data.length > 0) {

      let obj: any = new Object;
      obj.pesanan = this.cart;
      obj.total = this.total;
      // obj.pajak = this.totalPajak;
      // obj.grandTotal = this.grandTotal;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = obj;
      dialogConfig.backdropClass = "backdropBackground";
      dialogConfig.disableClose = true;
      dialogConfig.minWidth = "min-content";

      const dialogChooseMenu = this.dialog.open(
        SendDialogComponent,
        dialogConfig
      );

      let phone = "+628561112025"
      let infoOrder = new Array;
      let order

      dialogChooseMenu.afterClosed().subscribe(res => {
        // console.log(res);
        if (res != undefined) {

          if (res['ordercode'] === 3) {
            for (const key in res) {
              if (Object.prototype.hasOwnProperty.call(res, key)) {
                const element = res[key];
                // console.log(element);
                infoOrder.push(element + "%0a")
              }
            }
            infoOrder.push("%0a")
            infoOrder.push("Terima Kasih CK :) %0a")

            order = infoOrder.map(x => x).join("\n");
            // console.log(order);

            window.open(
              "https://api.whatsapp.com/send?phone=" + phone + "&text=" + order,
              // "_blank"
            );
            localStorage.removeItem('cart')
          } if (res['ordercode'] === 2) {
            // console.log("via kasir");
            this.generateQrCode(res['ordervalue'])
          } else {
            // console.log("pesan 1");
            this.dataService.sendOrder(res['ordervalue']).subscribe(res => {
              if (res['codestatus'] === "00") {
                let track = res['ordertrack'];
                localStorage.setItem('track', JSON.stringify(track));
                localStorage.removeItem('cart');
                this.socketService.sendMessage("00")
                this.customDialog("check_circle", res['value'])
                this.checkButtonTrack();
              } else {
                this.customDialog("sms_failed", "Gagal Memesan")
              }
            })
          }

        }

      })

    } else {
      const dialogConfig2 = new MatDialogConfig();

      let obj: any = new Object();
      obj.icon = "priority_high";
      obj.message = "Mohon isi pemesanan terlebih dahulu";

      dialogConfig2.data = obj;
      dialogConfig2.backdropClass = "backdropBackground";
      dialogConfig2.disableClose = true;
      dialogConfig2.minWidth = "min-content";

      const dialogCustom = this.dialog.open(
        CustomDialogComponent,
        dialogConfig2
      );
      dialogCustom.afterClosed();
    }
  }

  checkButtonTrack() {
    if (localStorage.getItem('track') !== null) return this.isHaveTrack = true;
    else this.isHaveTrack = false;
  }

  checkTrack() {
    this.route.navigate(['/tracking'])
  }



  generateQrCode(obj) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = obj;
    dialogConfig.backdropClass = "backdropBackground";
    dialogConfig.disableClose = true;
    dialogConfig.minWidth = "min-content";

    const dialogGeneratQR = this.dialog.open(
      QrcodeDialogComponent,
      dialogConfig
    );

    dialogGeneratQR.afterClosed().subscribe(res => {
      // console.log(res);
      if (res === 'finish') {
        localStorage.removeItem('cart');
        this.checkBadge()
        this.callParent()
      }
    })
  }


  customDialog(icon, message) {

    let obj: any = new Object();
    obj.icon = icon;
    obj.message = message;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = obj;
    dialogConfig.backdropClass = "backdropBackground";
    dialogConfig.disableClose = true;
    dialogConfig.maxWidth = "300px";

    const dialogChooseMenu = this.dialog.open(
      CustomDialogComponent,
      dialogConfig
    );

    dialogChooseMenu.afterClosed()
  }

}
