import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const googleOauthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:
    '266306713628-3sr7nu7coupaa39tt47n0gpe0teliddo.apps.googleusercontent.com',
  scope: 'openid profile email',
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticateServiceService {
  baseUrl = 'http://localhost:3001';

  constructor(
    private http: HttpClient,
    private readonly oAuthService: OAuthService
  ) {
    this.oAuthService.configure(googleOauthConfig);
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
        } else {
          this.oAuthService.loadUserProfile().then((userProfile) => {
            console.log(userProfile);
          });
        }
      });
    });
  }

  OAuthLogin(): any {}
}