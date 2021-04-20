import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewInit {
  @ViewChild('tabGroup', { static: true }) tabGroup;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    if (tabChangeEvent.index == 2) {
      $()
    } else {

    }
  }

}
