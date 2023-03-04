import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css'],
})
export class HamburgerMenuComponent {
  loggedIn = false;
  constructor(private auth: AuthenticateService, private router: Router) {}

  ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn();
  }

  logOutUser() {
    sessionStorage.clear();
    localStorage.removeItem('currentUserData');
    this.router.navigate(['login']);
  }
}
