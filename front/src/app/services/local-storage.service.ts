import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
 
  constructor() { }
 
  isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  setData(key: any, value: any){
    localStorage.setItem(key, JSON.stringify(value))
  }
  
  getData(key: any){
    let data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  remove(key: string) {
    delete localStorage[key];
    return this;
  }
}

