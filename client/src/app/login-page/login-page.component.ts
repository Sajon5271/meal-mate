import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateServiceService } from '../authenticate-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateServiceService
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  handleSubmit() {
    console.log(this.loginForm.value);
  }
  googleOAuth() {
    this.authService.googleOAuthLogin();
  }
  facebookOAuth() {
    this.authService.facebookOAuthLogin();
  }
}
