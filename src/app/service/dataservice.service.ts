import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  // private apiUrl = "https://api.dcoffeekedan.com/api/";
  private apiUrl = "http://192.168.100.16:8080/api/";
  private timeOut: number = 30000;

  headers_object = new HttpHeaders()
    .set('Content-Type', 'application/json')

  httpOptions = {
    headers: this.headers_object
  };


  constructor(private http: HttpClient) { }

  getProductById(id) {
    return this.http.get(this.apiUrl + "product/getById/" + id, this.httpOptions)
      .pipe(
        // tap(usr => {
        // }),
        timeout(this.timeOut),
        catchError(e => {
          if (e.name === "TimeoutError") {
            // this.showNotification("error", e.message)
          } else if (e.name === "HttpErrorResponse") {
            if (e.status == 401) {
              // this.showNotification("error", e.error.message);
            } else {
              // this.showNotification("error", e.message);
            }
          }
          return of(e);
        })
      )
  }



  getStatusById(obj) {
    const authObj = JSON.stringify(obj);
    console.log(authObj);

    return this.http.post(this.apiUrl + "track", authObj, this.httpOptions)
      .pipe(
        // tap(usr => {
        // }),
        timeout(this.timeOut),
        catchError(e => {
          if (e.name === "TimeoutError") {
            // this.showNotification("error", e.message)
          } else if (e.name === "HttpErrorResponse") {
            if (e.status == 401) {
              // this.showNotification("error", e.error.message);
            } else {
              // this.showNotification("error", e.message);
            }
          }
          return of(e);
        })
      )
  }



  sendOrder(obj) {
    const authObj = JSON.stringify(obj);
    return this.http.post(this.apiUrl + "order", authObj, this.httpOptions)
      .pipe(
        // tap(usr => {
        // }),
        timeout(this.timeOut),
        catchError(e => {
          if (e.name === "TimeoutError") {
            // this.showNotification("error", e.message)
          } else if (e.name === "HttpErrorResponse") {
            if (e.status == 401) {
              // this.showNotification("error", e.error.message);
            } else {
              // this.showNotification("error", e.message);
            }
          }
          return of(e);
        })
      )
  }

}

