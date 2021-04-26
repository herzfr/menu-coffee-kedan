import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';

@Component({
  selector: 'app-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {

  private daftarPesanan
  private desc;
  private total: number = 0;
  // private totalPajak: number = 0;
  // private grandTotal: number = 0;
  private nama = "";


  constructor(private dialogRef: MatDialogRef<SendDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private dialog: MatDialog) {
    this.daftarPesanan = data.pesanan;
    this.total = data.total;
    // this.totalPajak = data.pajak;
    // this.grandTotal = data.grandTotal;
    console.log(this.daftarPesanan);

  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close()
  }

  onYesOrder(event) {

    if (this.nama != null && this.nama != "" && this.nama != undefined) {

      switch (event) {
        case 1:
          this.viaMeja();
          break;
        case 2:
          this.viaKasir();
          break;
        case 3:
          this.viaWhatsApp();
          break;

      }

    } else {
      const dialogConfig2 = new MatDialogConfig();

      let obj: any = new Object();
      obj.icon = "priority_high";
      obj.message = "Silahkan inputkan nama terlebih dahulu agar kami tahu siapa yang memesan";

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

  viaKasir() {

    let infoOrder = new Array;
    let order: string;

    this.daftarPesanan.forEach((item, index) => {
      infoOrder.push((index + 1) + ". " + item.name + ", qty : " + item.qty);
    });
    order = infoOrder.map(x => x).join("\n");

    let obj: any = new Object;
    obj.nama = this.nama;
    obj.meja = 0;
    obj.menu = order;
    obj.desc = this.desc ? this.desc : "";
    obj.total = this.total;
    // obj.pajak = this.totalPajak;
    // obj.grandTotal = this.grandTotal;

    const pesanan = { ordercode: 2, ordervalue: obj }
    this.dialogRef.close(pesanan)
  }

  viaMeja() {


    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "";
    dialogConfig.backdropClass = "backdropBackground";
    dialogConfig.disableClose = true;
    dialogConfig.minWidth = "min-content";

    const dialogGetMeja = this.dialog.open(
      TableDialogComponent,
      dialogConfig
    );

    dialogGetMeja.afterClosed().subscribe(response => {
      console.log(response);
      if (response !== undefined) {
        let infoOrder = new Array;
        let order: string;

        this.daftarPesanan.forEach((item, index) => {
          infoOrder.push((index + 1) + ". " + item.name + ", qty : " + item.qty);
        });
        order = infoOrder.map(x => x).join("\n");

        let obj: any = new Object;
        obj.nama = this.nama;
        obj.meja = response;
        obj.menu = order;
        obj.desc = this.desc ? this.desc : "";
        obj.total = this.total;
        // obj.pajak = this.totalPajak;
        // obj.grandTotal = this.grandTotal;

        const pesanan = { ordercode: 1, ordervalue: obj }
        this.dialogRef.close(pesanan)
      }
    })














  }


  viaWhatsApp() {
    let infoOrder = new Array;
    let order

    this.daftarPesanan.forEach((item, index) => {
      infoOrder.push((index + 1) + ". " + item.name + ", qty : " + item.qty + "%0a")
    });
    order = infoOrder.map(x => x).join("\n");


    let obj: any = new Object;
    obj.nama = "Hi, Saya " + this.nama;
    obj.menu = "Saya ingin memesan:%0a" + order + "%0a";
    obj.desc = this.desc ? this.desc : "";
    obj.total = "Item Total : " + this.total;
    // obj.pajak = "Pajak 10% : " + this.totalPajak;
    // obj.grandTotal = "Total : " + this.grandTotal;
    this.dialogRef.close(obj)
  }
}
