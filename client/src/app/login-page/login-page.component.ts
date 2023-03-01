import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginError = false;
  errorMessage = '';
  validDatas = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private dataService: FetchDataService,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit() {
    if (this.authService.isLoggedIn()) this.router.navigate(['home']);
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginForm.valid) {
        this.validDatas = true;
      } else {
        this.validDatas = false;
      }
    });
  }

  handleSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.loginUser({ email, password }).subscribe({
        next: (res) => {
          sessionStorage.setItem('accessToken', res.accessToken);
          this.dataService
            .getUser()
            .subscribe((res) =>
              localStorage.setItem('currentUserData', JSON.stringify(res))
            );
          this.router.navigate(['mealplan/today']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.loginError = true;
        },
      });
    }
  }
  googleOAuth() {
    this.authService.googleOAuthLogin();
  }
  facebookOAuth() {
    this.authService.facebookOAuthLogin();
  }
}
