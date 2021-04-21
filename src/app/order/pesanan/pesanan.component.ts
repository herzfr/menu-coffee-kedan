import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SendDialogComponent } from 'src/app/dialog/send-dialog/send-dialog.component';

@Component({
  selector: 'app-pesanan',
  templateUrl: './pesanan.component.html',
  styleUrls: ['./pesanan.component.css']
})
export class PesananComponent implements OnInit {
  @Output() someEvent = new EventEmitter<string>();

  private cart;

  private pajak = 10 / 100;

  private total: number = 0;
  private totalPajak: number = 0;
  private grandTotal: number = 0;

  constructor(private dialog: MatDialog) {

  }

  ngOnInit() {
    this.checkBadge()
    this.checkTotal()
  }

  checkBadge() {
    let a = new Array;
    a = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(a);
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
    console.log(event);
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
        console.log(item.harga);
        this.total = this.total + (item.harga * item.qty)
      })
      console.log(this.total);
      this.totalPajak = this.pajak * this.total;
      this.grandTotal = this.total - this.totalPajak;
    }
  }

  callParent() {
    this.someEvent.emit('update');
  }


  doOrder() {

    // this.cart.forEach((item, index) => {
    //   // console.log("pesanan ke " + (index + 1) + ":" + item.name + ", qty : " + item.qty + "%0a");
    //   // infoOrder.push((index + 1) + ". " + item.name + ", qty : " + item.qty + "%0a")
    // });
    // order = infoOrder.map(x => x).join("\n");
    // console.log(order);



    let obj: any = new Object;
    obj.pesanan = this.cart;
    obj.total = this.total;
    obj.pajak = this.totalPajak;
    obj.grandTotal = this.grandTotal;

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
      console.log(res);
      if (res != undefined) {

        for (const key in res) {
          if (Object.prototype.hasOwnProperty.call(res, key)) {
            const element = res[key];
            console.log(element);
            infoOrder.push(element + "%0a")
          }
        }
        infoOrder.push("%0a")
        infoOrder.push("Terima Kasih CK :) %0a")

        order = infoOrder.map(x => x).join("\n");
        console.log(order);

        window.open(
          "https://api.whatsapp.com/send?phone=" + phone + "&text=" + order,
          // "_blank"
        );
        localStorage.removeItem('cart')
      }

    })
  }

}
