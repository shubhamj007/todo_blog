import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isStorage: boolean;
  public apiUrl = 'http://localhost:3000/api';
  public currentDate: Date;
  public currentDateUnix: number;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.isStorage = localStorageService.isLocalStorageAvailable();
  }

  login(params: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post(`${this.apiUrl}/users/login`, params, httpOptions)
      .pipe(
        map(response => {
          if (response["success"]) {
            if (this.isStorage) {
              this.localStorageService.setData('userData', response["user"]);
              this.localStorageService.setData('token', response["token"]);
              this.localStorageService.setData('isLoggedin', 'true');
            }
          }
          return response;
        })
      );
  }
}
