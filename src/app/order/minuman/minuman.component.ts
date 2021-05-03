import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderDialogComponent } from 'src/app/dialog/order-dialog/order-dialog.component';
import { DataserviceService } from 'src/app/service/dataservice.service';
declare var $: any;

@Component({
  selector: 'app-minuman',
  templateUrl: './minuman.component.html',
  styleUrls: ['./minuman.component.css']
})
export class MinumanComponent implements OnInit {
  @Output() someEvent = new EventEmitter<string>();

  coffee;
  noncoffee;
  juice;
  mocktail;

  ads;

  constructor(private dataService: DataserviceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.dataService.getAds().subscribe(res => {
      // console.log(res);
      // this.testData(res)
      if (res.codestatus == "00") {
        this.ads = res.values;
      }
    })

    this.dataService.getProductById(1).subscribe(res => {
      // console.log(res);
      if (res.codestatus == "00") {
        this.coffee = res.values;
      }
    })

    this.dataService.getProductById(2).subscribe(res => {
      // console.log(res);
      if (res.codestatus == "00") {
        this.noncoffee = res.values;
      }
    })

    this.dataService.getProductById(3).subscribe(res => {
      // console.log(res);
      if (res.codestatus == "00") {
        this.juice = res.values;
      }
    })

    this.dataService.getProductById(4).subscribe(res => {
      // console.log(res);
      if (res.codestatus == "00") {
        this.mocktail = res.values;
      }
    })


  }


  getDataImage(event) {
    if (event == "" || event == null) {
      return 'assets/images/sample_minuman.png'
    } else {
      return event;
    }
  }

  choose(event) {
    // console.log(event);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = event;
    dialogConfig.backdropClass = "backdropBackground";
    dialogConfig.disableClose = true;
    dialogConfig.minWidth = "min-content";

    const dialogChooseMenu = this.dialog.open(
      OrderDialogComponent,
      dialogConfig
    );

    dialogChooseMenu.afterClosed().subscribe(res => {
      if (res != undefined) {
        // console.log(res);

        // let list: any = new Array;
        // list = [data];
        // finalData = list;
        // localStorage.setItem('history', JSON.stringify(list));

        let a = new Array;
        if (localStorage.getItem('cart') == null) {
          // console.log(res);
          a.push(res)
          localStorage.setItem('cart', JSON.stringify(a));
          this.callParent()
        } else {
          // console.log('ada isi');
          a = JSON.parse(localStorage.getItem('cart') || '[]');
          a.push(res)
          localStorage.removeItem('cart')
          localStorage.setItem('cart', JSON.stringify(a));
          // console.log(a);
          this.callParent()
        }


        // localStorage.setItem('cart', JSON.stringify(res));
      }
    })
  }

  callParent() {
    this.someEvent.emit('update');
  }

}
