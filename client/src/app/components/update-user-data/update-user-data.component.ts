import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css'],
})
export class UpdateUserDataComponent {
  constructor(
    private formBuilder: FormBuilder,
    private fetchData: FetchDataService
  ) {}

  userDataFormGroup = this.formBuilder.group({
    age: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    currentHeight: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
    currentWeight: ['', [Validators.required, Validators.pattern('[0-9.]+')]],
    sex: ['male', Validators.required],
    activityLevel: ['sedentary', Validators.required],
    weightGoal: ['mildWeightLoss', Validators.required],
  });

  ngOnInit() {
    const {
      age,
      currentHeight,
      currentWeight,
      sex,
      activityLevel,
      weightGoal,
    } = this.fetchData.getLoggedInUser().userData;
    this.userDataFormGroup.controls.age.setValue('' + age);
    this.userDataFormGroup.controls.currentHeight.setValue('' + currentHeight);
    this.userDataFormGroup.controls.currentWeight.setValue('' + currentWeight);
    this.userDataFormGroup.controls.sex.setValue(sex);
    this.userDataFormGroup.controls.activityLevel.setValue(activityLevel);
    this.userDataFormGroup.controls.weightGoal.setValue(weightGoal);
  }

  handleSubmit() {
    const {
      age,
      currentHeight,
      currentWeight,
      sex,
      activityLevel,
      weightGoal,
    } = this.userDataFormGroup.value;
    if (
      age &&
      currentHeight &&
      currentWeight &&
      sex &&
      activityLevel &&
      weightGoal
    ) {
      this.fetchData
        .setData({
          age: parseInt(age),
          currentHeight: parseFloat(currentHeight),
          currentWeight: parseFloat(currentWeight),
          sex,
          activityLevel,
          weightGoal,
        })
        .subscribe(() => {
          this.fetchData.updateUser(() => {
            location.reload();
          });
        });
    }
  }
}
