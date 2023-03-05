import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  passwordMatches = false;
  signUpError = false;
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private dataService: FetchDataService,
    private router: Router
  ) {}

  signUpForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repassword: ['', [Validators.required]],
    }
    // { validators: passwordMatch() }
  );

  ngOnInit() {
    if (this.authService.isLoggedIn()) this.router.navigate(['home']);
    this.signUpForm.valueChanges.subscribe(() => {
      if (this.signUpForm.valid && this.password === this.rePassword) {
        this.passwordMatches = true;
      } else {
        this.passwordMatches = false;
      }
    });
  }

  handleSubmit() {
    const { email, password } = this.signUpForm.value;
    if (email && password)
      this.authService.signUpUser({ email, password }).subscribe({
        next: (res) => {
          sessionStorage.setItem('accessToken', res.accessToken);
          this.dataService.getUser().subscribe((res) => {
            const anonData = this.dataService.getAnonymousUserData();
            if (anonData) {
              this.dataService.setData(anonData.userData).subscribe();
              this.dataService.setMealPlan(anonData.mealPlan).subscribe();
              setTimeout(() => this.dataService.clearAnonymousUserData(), 5000);
            }
            localStorage.setItem('currentUserData', JSON.stringify(res));
            this.router.navigate(['update-profile']);
          });
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.signUpError = true;
        },
      });
  }
  googleOAuth() {
    this.authService.googleOAuthLogin();
  }
  facebookOAuth() {}

  get password() {
    return this.signUpForm.controls.password.value;
  }
  get rePassword() {
    return this.signUpForm.controls.repassword.value;
  }
}
// function passwordMatch(): ValidatorFn {
//   return (group: FormGroup): ValidationErrors | null => {
//     console.log(control);
//     return null;
//   };
// }
