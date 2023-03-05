import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css'],
})
export class HamburgerMenuComponent {
  constructor(private auth: AuthenticateService, private router: Router) {}

  ngOnInit() {}

  logOutUser() {
    sessionStorage.clear();
    localStorage.removeItem('currentUserData');
    this.router.navigate(['login']);
  }

  get loggedIn() {
    return this.auth.isLoggedIn();
  }
}
