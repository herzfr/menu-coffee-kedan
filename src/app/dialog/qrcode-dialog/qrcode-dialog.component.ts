import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.css']
})
export class QrcodeDialogComponent implements OnInit {

  secretKey = "dcoffeekedan";

  order: string;
  constructor(private dialogRef: MatDialogRef<QrcodeDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.order = JSON.stringify(data);
    console.log(this.order);
  }



  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close('finish')
  }


  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

}
