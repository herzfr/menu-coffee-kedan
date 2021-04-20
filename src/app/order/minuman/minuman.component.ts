import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/service/dataservice.service';
declare var $: any;

@Component({
  selector: 'app-minuman',
  templateUrl: './minuman.component.html',
  styleUrls: ['./minuman.component.css']
})
export class MinumanComponent implements OnInit {

  private coffee;
  private noncoffee;
  private juice;
  private mocktail;

  constructor(private dataService: DataserviceService) { }

  ngOnInit() {

    this.dataService.getProductById(1).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.coffee = res.values;
      }
    })

    this.dataService.getProductById(2).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.noncoffee = res.values;
      }
    })

    this.dataService.getProductById(3).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.juice = res.values;
      }
    })

    this.dataService.getProductById(4).subscribe(res => {
      console.log(res.values);
      if (res.status == 200) {
        this.mocktail = res.values;
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
      return 'assets/images/sample_minuman.png'
    } else {
      return event;
    }
  }

}
