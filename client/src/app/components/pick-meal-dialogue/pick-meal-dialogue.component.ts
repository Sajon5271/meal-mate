import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Meal } from 'src/app/interfaces/Meal.interface';
import { MealsService } from 'src/app/services/meals.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-pick-meal-dialogue',
  templateUrl: './pick-meal-dialogue.component.html',
  styleUrls: ['./pick-meal-dialogue.component.css'],
})
export class PickMealDialogueComponent {
  baseImagePath = 'http://localhost:3000/images/meals/';
  mealStateControl = new FormControl<Meal | string>(this.data);
  quantityForm = new FormControl<number>(1);
  filteredMeals: Observable<Meal[]>;
  allMeals: Meal[] = [];
  currMeal?: Meal;
  constructor(
    public dialogRef: MatDialogRef<PickMealDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal,
    private mealService: MealsService
  ) {
    this.filteredMeals = this.mealStateControl.valueChanges.pipe(
      startWith(''),
      map((meal) => {
        const name = typeof meal === 'string' ? meal : meal?.mealName;
        return name ? this._filterMeals(name as string) : this.allMeals.slice();
      })
    );
  }

  ngOnInit() {
    this.allMeals = this.mealService.getMealsfromStorage();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private _filterMeals(mealName: string) {
    const filterValue = mealName.toLowerCase();
    return this.allMeals.filter((meal) =>
      meal.mealName.toLowerCase().includes(filterValue)
    );
  }

  get formValue() {
    return {
      selectedMeal: this.mealStateControl.value,
      quantity: this.quantityForm.value,
    };
  }
  fullImagePath(name: string) {
    return this.baseImagePath + name;
  }

  displayFn(meal: Meal) {
    return meal ? meal.mealName : '';
  }
  changeCurrMeal(meal: Meal) {
    this.currMeal = meal;
  }
}
