import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  public apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  publish(params: any): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('token:-------', token);
    const httpOptions = {
      headers: new HttpHeaders({
        //  'Content-Type': 'application/json',
         Authorization: token,
       })
   };
    return this.http.post(`${this.apiUrl}/blog`, params, httpOptions);
  }


  details(blog_id: number): Observable<any> {
    const token = JSON.parse(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
         Authorization: token,
       })
   };
    return this.http.get<any[]>(`${this.apiUrl}/getBlogById/${blog_id}`, httpOptions);
  }

  blogEdit(id: number, params: any) {
    const token =  JSON.parse(localStorage.getItem('token'));
    console.log('token:-------------- ', token);
    const httpOptions = {
      headers: new HttpHeaders({
        //  'Content-Type': 'application/json',
         Authorization: token,
       })
   };
    return this.http.put(`${this.apiUrl}/updateblog/${id}`, params, httpOptions);
  }

  removeImage(id: number){
    const token =  JSON.parse(localStorage.getItem('token'));
    console.log('token:-------------- ', token);
    const httpOptions = {
      headers: new HttpHeaders({
        //  'Content-Type': 'application/json',
         Authorization: token,
       })
   };
    return this.http.put(`${this.apiUrl}/deleteImage/${id}`, httpOptions);
  }

}
