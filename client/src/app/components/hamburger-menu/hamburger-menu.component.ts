import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css'],
})
export class HamburgerMenuComponent {
  readonly VAPID_PUBLIC_KEY =
    'BMC_pb46-L-LPXMAr5pkIHRlTbqS6daWXhp6TVlx_pB-2yif92GwW7g12xGVw63qFivvSKiaKSo73nOoQKca-ek';

  constructor(
    private auth: AuthenticateService,
    private router: Router,
    readonly swPush: SwPush,
    private fetchData: FetchDataService
  ) {}

  ngOnInit() {}

  logOutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUserData');
    this.router.navigate(['login']);
  }

  get loggedIn() {
    return this.auth.isLoggedIn();
  }

  subscribe() {
    this.swPush
      .requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
      .then((res) => {
        console.log('Here', res);
        this.fetchData
          .saveNotificationSub(res)
          .subscribe((res) => console.log('Saved notification'));
      })
      .catch((err) => console.log(err));
  }
}
