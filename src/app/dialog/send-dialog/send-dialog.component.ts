import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {

  private daftarPesanan
  private desc;
  private total: number = 0;
  private totalPajak: number = 0;
  private grandTotal: number = 0;
  private nama = "";

  constructor(private dialogRef: MatDialogRef<SendDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private dialog: MatDialog) {
    this.daftarPesanan = data.pesanan;
    this.total = data.total;
    this.totalPajak = data.pajak;
    this.grandTotal = data.grandTotal;
    console.log(this.daftarPesanan);

  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close()
  }

  onYesOrder() {

    if (this.nama != null && this.nama != "" && this.nama != undefined) {

      let infoOrder = new Array;
      let order

      this.daftarPesanan.forEach((item, index) => {
        infoOrder.push((index + 1) + ". " + item.name + ", qty : " + item.qty + "%0a")
      });
      order = infoOrder.map(x => x).join("\n");


      let obj: any = new Object;
      obj.nama = "Hi, Saya " + this.nama;
      obj.menu = "Saya ingin memesan:%0a" + order;
      obj.desc = this.desc ? this.desc : "";
      obj.total = "Item Total : " + this.total;
      obj.pajak = "Pajak 10% : " + this.totalPajak;
      obj.grandTotal = "Total : " + this.grandTotal;
      this.dialogRef.close(obj)
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
}
