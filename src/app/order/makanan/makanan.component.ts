import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CustomDialogComponent } from 'src/app/dialog/custom-dialog/custom-dialog.component';
import { OrderDialogComponent } from 'src/app/dialog/order-dialog/order-dialog.component';
import { DataserviceService } from 'src/app/service/dataservice.service';
declare var $: any;

@Component({
  selector: 'app-makanan',
  templateUrl: './makanan.component.html',
  styleUrls: ['./makanan.component.css']
})
export class MakananComponent implements OnInit {
  @Output() someEvent = new EventEmitter<string>();

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    // responsive: {
    //   0: {
    //     items: 2
    //   },
    //   400: {
    //     items: 3
    //   },
    //   740: {
    //     items: 4
    //   },
    //   940: {
    //     items: 5
    //   },
    //   2000: {
    //     items: 7
    //   }
    // },
    nav: false
  }

  private makanan_agak_ringan;
  private makanan_agak_berat;
  private indomie;
  private nasigoreng;
  private chikensteak;
  private soup;
  private ayam_geprek;

  constructor(private dataService: DataserviceService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.dataService.getProductById(5).subscribe(res => {
      // console.log(res);
      // this.testData(res)
      if (res.codestatus == "00") {
        this.makanan_agak_ringan = res.values;
      }
    })

    this.dataService.getProductById(6).subscribe(res => {
      // console.log(res);
      if (res.codestatus == "00") {
        this.makanan_agak_berat = res.values;
      }
    })

    this.dataService.getProductById(7).subscribe(res => {
      // console.log(res);
      if (res.codestatus == "00") {
        this.indomie = res.values;
      }
    })

    this.dataService.getProductById(8).subscribe(res => {
      // console.log(res);
      if (res.codestatus == "00") {
        this.nasigoreng = res.values;
      }
    })

    this.dataService.getProductById(9).subscribe(res => {
      // console.log(res);
      if (res.codestatus == "00") {
        this.chikensteak = res.values;
      }
    })

    this.dataService.getProductById(10).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.soup = res.values;
      }
    })

    this.dataService.getProductById(11).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.ayam_geprek = res.values;
      }
    })


  }

  getDataImage(event) {
    if (event == "" || event == null) {
      return 'assets/images/sample_makanan.png'
    } else {
      return event;
    }
  }

  choose(event) {
    console.log(event);

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
        console.log(res);

        // let list: any = new Array;
        // list = [data];
        // finalData = list;
        // localStorage.setItem('history', JSON.stringify(list));

        let a = new Array;
        if (localStorage.getItem('cart') == null) {
          console.log(res);
          a.push(res)
          localStorage.setItem('cart', JSON.stringify(a));
          this.callParent()
        } else {
          console.log('ada isi');
          a = JSON.parse(localStorage.getItem('cart') || '[]');
          a.push(res)
          localStorage.removeItem('cart')
          localStorage.setItem('cart', JSON.stringify(a));
          console.log(a);
          this.callParent()
        }


        // localStorage.setItem('cart', JSON.stringify(res));
      }
    })
  }

  callParent() {
    this.someEvent.emit('update');
  }


  testData(event) {
    console.log(event);

    let obj: any = new Object();
    obj.icon = "priority_high";
    obj.message = JSON.stringify(event);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = obj;
    dialogConfig.backdropClass = "backdropBackground";
    dialogConfig.disableClose = true;
    dialogConfig.maxWidth = "300px";

    const dialogChooseMenu = this.dialog.open(
      CustomDialogComponent,
      dialogConfig
    );

    dialogChooseMenu.afterClosed().subscribe(res => {
      console.log(res);
    })
  }



}
