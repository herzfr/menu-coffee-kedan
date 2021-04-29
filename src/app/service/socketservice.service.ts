import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketserviceService {

  constructor(private socket: Socket) {
  }

  sendMessage(message: string) {
    console.log(message);
    this.socket.emit('my message', message);
  }
  // getMessage() {
  //   return this.socket.fromEvent('my message').pipe(map((data) => data));
  // }

  getMessages() {
    return Observable.create((observer) => {
      this.socket.on('my message', (message) => {
        observer.next(message);
      });
    });
  }
}
