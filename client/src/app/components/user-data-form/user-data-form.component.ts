import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FetchDataService } from '../../services/fetch-data.service';
import { UserData } from '../../interfaces/UserData.interface';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class UserDataFormComponent implements OnInit {
  ageFormGroup = this._formBuilder.group({
    age: ['', [Validators.required, Validators.pattern('[0-9]+')]],
  });
  currentHeightFormGroup = this._formBuilder.group({
    currentHeight: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
  });
  currentWeightFormGroup = this._formBuilder.group({
    currentWeight: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
  });
  sexFormGroup = this._formBuilder.group({
    sex: ['male', Validators.required],
  });
  activityLevelFormGroup = this._formBuilder.group({
    activityLevel: ['sedentary', Validators.required],
  });
  weightGoalFormGroup = this._formBuilder.group({
    weightGoal: ['mildWeightLoss', Validators.required],
  });

  formGroupArray = [
    this.ageFormGroup,
    this.currentHeightFormGroup,
    this.currentWeightFormGroup,
    this.sexFormGroup,
    this.activityLevelFormGroup,
    this.weightGoalFormGroup,
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private dataService: FetchDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const userData = localStorage.getItem('currentUserData');
      let user: User;
      if (userData) {
        user = JSON.parse(userData);
        if (user.dataAlreadyGiven) this.router.navigate(['mealplan/today']);
      }
    }
  }

  handleSubmit() {
    for (const i of this.formGroupArray) {
      if (!i.valid) return;
    }
    const dataObj: UserData = {
      age: parseInt(this.ageFormGroup.value.age || ''),
      currentHeight: parseFloat(
        this.currentHeightFormGroup.value.currentHeight || ''
      ),
      currentWeight: parseFloat(
        this.currentWeightFormGroup.value.currentWeight || ''
      ),
      sex: this.sexFormGroup.value.sex || 'male',
      activityLevel:
        this.activityLevelFormGroup.value.activityLevel || 'sedentary',
      weightGoal: this.weightGoalFormGroup.value.weightGoal || 'mildWeightLoss',
    };
    if (this.authService.isLoggedIn()) {
      this.dataService.setData(dataObj).subscribe({
        next: () => {},
        complete: () => {
          this.dataService.getUser().subscribe((user) => {
            localStorage.setItem('currentUserData', JSON.stringify(user));
            this.router.navigate(['generated-meal-plan']);
            // this.router.navigate(['/mealplan/today']); //change later
          });
        },
      });
    } else {
      this.dataService.generateAnonymousUserMealPlan(dataObj).subscribe({
        next: (anonUser) => {
          localStorage.setItem('anonymousUserData', JSON.stringify(anonUser));
          this.router.navigate(['generated-meal-plan']);
        },
      });
    }
  }
}
