import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.localStorage.remove('token');
    this.localStorage.remove('userData');
    this.localStorage.remove('isLoggedin');
    this.router.navigate(['/login']);
  }
}
