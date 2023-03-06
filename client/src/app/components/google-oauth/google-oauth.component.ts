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

  ngOnInit() {
    const userDatas = JSON.parse(
      sessionStorage.getItem('id_token_claims_obj') || '""'
    );
    const newUser = {
      email: userDatas.email,
      name: userDatas.given_name + ' ' + userDatas.family_name,
      oAuthUser: true,
      picturePath: userDatas.picture,
    };
    this.oauth.signUpUser(newUser).subscribe({
      next: (res) => {
        localStorage.setItem('currentUserData', JSON.stringify(res));
        this.router.navigate(['update-profile']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
