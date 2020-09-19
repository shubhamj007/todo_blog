import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/do';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor {

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private toastr: ToastrService
    ) { }

    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `${this.localStorage.getData("token")}`
        }   
      })
      return next.handle(authRequest).do(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if(err){
            this.localStorage.remove('token');
            this.toastr.warning('Your session has timed out. Please sign in again.');
            this.router.navigate(['/login']);
          }
        }
      );
    }
}
