import { Component } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-google-oauth',
  templateUrl: './google-oauth.component.html',
  styleUrls: ['./google-oauth.component.css'],
})
export class GoogleOauthComponent {
  constructor(private oauth: AuthenticateService) {
    const userDetails = oauth.googleOAuthLogin();
    
  }
}
