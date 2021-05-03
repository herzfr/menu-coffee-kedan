import { LocationStrategy } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { Router } from '@angular/router';
import { PesananComponent } from './pesanan/pesanan.component';
declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, AfterViewInit {
  @ViewChild('tabGroup', { static: true }) tabGroup;
  @ViewChild(MatTabGroup, { static: true }) tabGroups: MatTabGroup;
  @ViewChild('child', { static: true }) child: PesananComponent;




  cart: number;
  constructor(private location: LocationStrategy, private router: Router) {

    // check if back or forward button is pressed.
    this.location.onPopState(() => {
      // console.log("test");
      // router.navigateByUrl("/home", { skipLocationChange: true });
    });
  }

  ngOnInit() {
    this.checkBadge()
  }

  ngAfterViewInit() {
    // console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  }

  checkBadge() {
    let a = new Array;
    a = JSON.parse(localStorage.getItem('cart') || '[]');
    // console.log(a.length);
    this.cart = a.length;
    this.submit()
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // console.log('tabChangeEvent => ', tabChangeEvent);
    // console.log('index => ', tabChangeEvent.index);
  }

  goToListOrder() {
    this.tabGroups.selectedIndex = 2;
  }

  getBadge(event) {
    if (event == "update") {
      this.checkBadge()
    }
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    const verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    // console.log(verticalOffset);
    if (verticalOffset > 100) {
      $('.navbar-brand').addClass('fixed-bottom')
      $('.mat-tab-header').addClass('fixed-t')
    } else {
      $('.navbar-brand').removeClass('fixed-bottom')
      $('.mat-tab-header').removeClass('fixed-t')
    }

  }

  submit() {
    // console.log(this.child.checkBadge());
    this.child.checkBadge()
  }

}
