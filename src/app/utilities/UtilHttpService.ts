import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Util, MessagesError } from './util';


import { Router } from '@angular/router';


const util: Util = new Util();
const messages: MessagesError = new MessagesError();
let router: Router;


@Injectable({
  providedIn: 'root'
})
export class UtilHttpService {

  fake: any;
  //URL_BASE = 'http://localhost:8080/api/v1/files';
  private http: HttpClient;
  port: any;


  constructor(injector: Injector) {
 
    console.log('Service loading');
    this.http = injector.get(HttpClient);
    this.fake = {};
    router = injector.get(Router);

  }



  get<T>(url: string): Observable<any> {
      console.log("get "+url);
    return this.http.get<T>(this.getUrl(url), { headers: this.createHeaders() })
      .pipe(catchError(this.handlerErrorAndRaise));
  }

  post<T>(url: string, data: any): Observable<any> {
    return this.http.post<T>(this.getUrl(url), data, { headers: this.createHeaders() })
      .pipe(catchError(this.handlerErrorAndRaise));
  }

  postCreateFile<T>(url: string, data: any): Observable<any> {
      return this.http.post(this.getUrl(url), data, { responseType: 'blob' })
        .pipe(catchError(this.handlerErrorAndRaise));
  }
 
  put<T>(url: string, data: any): Observable<any> {
    return this.http.put<T>(this.getUrl(url), data, { headers: this.createHeaders() })
      .pipe(catchError(this.handlerErrorAndRaise));
  }

  delete<T>(url: string): Observable<any> {
    return this.http.delete<T>(this.getUrl(url), { headers: this.createHeaders() })
      .pipe(catchError(this.handlerErrorAndRaise));
  }

  deleteCatalogs<T>(url: string, modificateBy): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { "idModificationUser": modificateBy } };
    return this.http.delete<T>(this.getUrl(url), httpOptions)
      .pipe(catchError(this.handlerErrorAndRaise));
  }

  private getUrl(url: string) {
    // console.log('PORT TO INVOKE', this.port);
    console.log("getUrl "+url);
    return "http://localhost:8080"+url;
   // return `${this.URL_BASE}/`;
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


  private handlerErrorAndRaise(error: HttpErrorResponse) {
    // console.log('Error Serser Side', error);
    let message: string = '';
    if (error.status === 0) {
      message = messages._0_SERVER_CONNECTION_ERROR;
    } else if (error.status === 401) {
      if (!error.url.includes('/auth/logout') && !error.url.includes('/auth/reset-session')) {
        switch (error.error.code) {
          case -1:
            util.warningToast(messages._401_EXISTS_ACTIVE_SESSION);
            break;
          case 1:
            util.warningToast(messages._401_INVALID_SESSION);
            break;
          default:
            util.warningToast(messages._401_EXISTS_ACTIVE_SESSION);
            break;
        }
      }
      setTimeout(() => {
        sessionStorage.clear();
        localStorage.clear();
        util.removeEventListenerTimeOut();
        router.navigate(['/auth/login']);
      }, 500);
    } else if (error.status === 403) {
      message = messages._403_FORBIDDEN_ACCESS;
    } else if (error.status === 500) {
      message = messages._500_GENERAL_ERROR;
    }
    if (message) {
      // ErrorAlert(message);
      util.errorToast(message);
    }

    // console.log('Se propaga error para el control personalizado:: ', error.message, error.status);
    return throwError(error);
  }

}
