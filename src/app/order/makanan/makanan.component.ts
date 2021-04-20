import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataserviceService } from 'src/app/service/dataservice.service';
declare var $: any;

@Component({
  selector: 'app-makanan',
  templateUrl: './makanan.component.html',
  styleUrls: ['./makanan.component.css']
})
export class MakananComponent implements OnInit {

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

  constructor(private dataService: DataserviceService) {

  }

  ngOnInit() {
    this.dataService.getProductById(5).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.makanan_agak_ringan = res.values;
      }
    })

    this.dataService.getProductById(6).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.makanan_agak_berat = res.values;
      }
    })

    this.dataService.getProductById(7).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.indomie = res.values;
      }
    })

    this.dataService.getProductById(8).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.nasigoreng = res.values;
      }
    })

    this.dataService.getProductById(9).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
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





    $(document).ready(function () {
      $('.count').prop('disabled', true);
      $(document).on('click', '.plus', function () {
        $('.count').val(parseInt($('.count').val()) + 1);
      });
      $(document).on('click', '.minus', function () {
        $('.count').val(parseInt($('.count').val()) - 1);
        if ($('.count').val() == 0) {
          $('.count').val(0);
        }
      });
    });
  }

  getDataImage(event) {
    if (event == "" || event == null) {
      return 'assets/images/sample_makanan.png'
    } else {
      return event;
    }
  }



}
