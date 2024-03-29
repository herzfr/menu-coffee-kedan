import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { DataserviceService } from '../service/dataservice.service';
import { SocketserviceService } from '../service/socketservice.service';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.css']
})
export class TrackingOrderComponent implements OnInit {
  @ViewChild('steppers', { static: false }) private steper: MatStepper;
  optionsOne: AnimationOptions = {
    path: '/assets/json/waiting_animation.json',
  };
  optionsTwo: AnimationOptions = {
    path: '/assets/json/prepared_animation.json',
  };
  optionsThree: AnimationOptions = {
    path: '/assets/json/cook_animation.json',
  };
  optionsFour: AnimationOptions = {
    path: '/assets/json/done_animation.json',
  };
  idTrack;
  statusBar;
  nama;
  isFinish = false;
  stepDisabled: boolean = true;
  message;
  constructor(private dataService: DataserviceService, private route: Router, private socketService: SocketserviceService) {

  }

  ngOnInit() {
    this.checkTrackId()
    this.socketService
      .getMessages()
      .subscribe((message: string) => {
        // console.log(message);
        this.checkTrackId()
      });

  }

  checkTrackId() {
    if (localStorage.getItem('track') !== null) {
      this.idTrack = JSON.parse(localStorage.getItem('track'));
      // console.log(this.idTrack);
      this.getStatusOrder()
    } else {
      this.route.navigate(['/home'])
    }
  }

  getStatusOrder() {
    this.idTrack['trackid']
    let obj: any = new Object;
    obj.id = this.idTrack['trackid'];
    obj.nama = this.idTrack['trackname'];
    this.dataService.getStatusById(obj).subscribe(res => {
      // // console.log(res);
      if (res['codestatus'] == "00") {
        this.statusBar = res['values']
        this.changStepper()
      }
    })
  }

  public changStepper() {
    // event: StepperSelectionEvent
    // // console.log(this.statusBar[0]);
    if (this.statusBar[0] !== undefined) {
      this.nama = this.statusBar[0].nama;
      var test = 2;
      switch (this.statusBar[0].status) {
        case 0:
          this.steper.selectedIndex = 0;
          break;
        case 1:
          this.steper.selectedIndex = 1;
          break;
        case 2:
          this.steper.selectedIndex = 2;
          break;
        case 3:
          this.steper.selectedIndex = 3;
          this.isFinish = true;
          break;
        case 4:
          this.steper.selectedIndex = 3;
          this.isFinish = true;
          break;
        default:
          this.route.navigate(['/home'])
          break;
      }
    } else {
      this.route.navigate(['/home'])
    }
    // // console.log(this.steper.selectedIndex);
  }

  animationCreated(animationItem: AnimationItem): void {
    // // console.log(animationItem);
  }


  refresh() {
    this.checkTrackId()
  }

  done() {
    localStorage.removeItem('track')
    this.route.navigate([''])
  }

}
