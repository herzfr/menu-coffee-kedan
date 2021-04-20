import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewInit {
  @ViewChild('tabGroup', { static: true }) tabGroup;
  @ViewChild(MatTabGroup, { static: true }) tabGroups: MatTabGroup;


  cart: number;
  constructor() { }

  ngOnInit() {
    this.checkBadge()
  }

  ngAfterViewInit() {
    console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  }

  checkBadge() {
    let a = new Array;
    a = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(a.length);
    this.cart = a.length;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }

  goToListOrder() {
    this.tabGroups.selectedIndex = 2;
  }

  getBadge(event) {
    if (event == "update") {
      this.checkBadge()
    }
  }

}
