import { Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardUserService } from './guard-user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(
    private authService: GuardUserService,
    private router: Router
  ) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.check();
    // console.log('19--user--', user);
    if (user) {
      return true;
    }
    // navigate to not found page
    this.router.navigate(['/login']);
    return false;
  }
}
