import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  constructor(private formBuilder: FormBuilder) {}

  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repassword: ['', [Validators.required]],
  });
  handleSubmit() {
    console.log(this.signUpForm);
  }
  googleOAuth() {}
  facebookOAuth() {}
}
