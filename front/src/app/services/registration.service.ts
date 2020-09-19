import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  public apiUrl = 'http://localhost:3000/api';

  constructor(
    private http:HttpClient
  ) { }

  register(params: any): Observable<any>{

    return this.http.post( `${this.apiUrl}/users`, params);

  }
}
