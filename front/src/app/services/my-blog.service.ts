import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MyBlogService {

  public apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }


  showMyBlog(id: number) {
    const token =  JSON.parse(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
         Authorization: token,
       })
   };
    return this.http.get<any[]>(`${this.apiUrl}/getMyBlog/${id}`, httpOptions);
  }

  delete(id: number) {
    const token =  JSON.parse(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
         Authorization: token,
       })
   };
    return this.http.delete(`${this.apiUrl}/deleteblog/${id}`, httpOptions);
  }

  edit(id: number) {
    const token =  JSON.parse(localStorage.getItem('token'));
    const httpOptions = {
      headers: new HttpHeaders({
         Authorization: token,
       })
   };
    return this.http.get(`${this.apiUrl}/getBlogById/${id}`, httpOptions);
  }

}


