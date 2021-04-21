import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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

  constructor() {

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

}
