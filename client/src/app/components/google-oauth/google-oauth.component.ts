import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User.interface';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-google-oauth',
  templateUrl: './google-oauth.component.html',
  styleUrls: ['./google-oauth.component.css'],
})
export class GoogleOauthComponent {
  constructor(private oauth: AuthenticateService, private router: Router) {
    this.oauth.googleOAuthLogin();
  }

  ngOnInit() {}
}
