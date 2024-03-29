import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    AOS.init();
    localStorage.removeItem('cart');
    localStorage.removeItem('track');
  }

  doOrder() {
    this.router.navigate(['/order'])
  }

}
