import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GuardUserService } from './guard-user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthguardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: GuardUserService
  ) { }

 canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.check();
    if (!user) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
