import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
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

  constructor() { }

  ngOnInit() {
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

}
