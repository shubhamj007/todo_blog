import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  show(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blogdetail`);
  }

}
