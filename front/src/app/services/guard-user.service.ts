import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardUserService {

  constructor(
    private localStorageService: LocalStorageService
  ) {}
  
  check() {
    return this.localStorageService.getData('token');
  }
}
