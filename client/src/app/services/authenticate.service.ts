import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { User } from '../interfaces/User.interface';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

const googleOauthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/redirect_google',
  clientId:
    '266306713628-3sr7nu7coupaa39tt47n0gpe0teliddo.apps.googleusercontent.com',
  scope: 'openid profile email',
};
// const facebookOauthConfig: AuthConfig = {
//   issuer: 'https://facebook.com',
//   strictDiscoveryDocumentValidation: true,
//   redirectUri: window.location.origin,
//   clientId: '30af85ec9a9be5378bc8035c4c3e8ba4',
//   scope: 'openid profile email',
// };

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private readonly oAuthService: OAuthService,
    private jwthelper: JwtHelperService
  ) {}

  googleOAuthLogin(): any {
    this.oAuthService.configure(googleOauthConfig);
    this.oAuthService.loadDiscoveryDocument().then((doc) => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
        } else {
          this.oAuthService.loadUserProfile().then((userProfile) => {
            localStorage.setItem('google', JSON.stringify(userProfile));
            return userProfile;
            // this.signUpUser({email: })
          });
        }
      });
    });
  }
  facebookOAuthLogin(): any {
    // this.oAuthService.configure(facebookOauthConfig);
    // this.oAuthService.loadDiscoveryDocument().then(() => {
    //   // console.log(doc);
    //   this.oAuthService.tryLoginImplicitFlow().then(() => {
    //     if (!this.oAuthService.hasValidAccessToken()) {
    //       this.oAuthService.initLoginFlow();
    //     } else {
    //       this.oAuthService.loadUserProfile().then((userProfile) => {
    //         console.log(userProfile);
    //       });
    //     }
    //   });
    // });
  }

  signUpUser(user: {
    email: string;
    password: string;
  }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/register`,
      user
    );
  }

  loginUser(user: {
    email: string;
    password: string;
  }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/login`,
      user
    );
  }

  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUserData');
  }

  isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    if (!token || this.jwthelper.isTokenExpired(token)) return false;
    else return true;
  }
}
