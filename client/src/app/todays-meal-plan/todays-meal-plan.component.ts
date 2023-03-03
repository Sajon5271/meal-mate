import { Component } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { Meal } from '../Meal.interface';
import { MealPlan } from '../MealPlan.interface';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-todays-meal-plan',
  templateUrl: './todays-meal-plan.component.html',
  styleUrls: ['./todays-meal-plan.component.css'],
})
export class TodaysMealPlanComponent {
  imageBase = 'http://localhost:3000/images/meals/';
  breakFastMeals: Meal[] = [];
  lunchMeals: Meal[] = [];
  snacksMeals: Meal[] = [];
  dinnerMeals: Meal[] = [];
  constructor(
    private fetchData: FetchDataService,
    private mealService: MealsService
  ) {}
  ngOnInit() {
    const weekdays = [
      'saturday',
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
    ];
    const day = new Date().getDay();
    const mealPlan: MealPlan = JSON.parse(
      localStorage.getItem('currentUserData') || '""'
    ).mealPlan[weekdays[day]];
    console.log(mealPlan);
    for (const b of mealPlan.breakfast) {
      const meal = this.mealService.getMealById(b.mealId);
      if (meal) this.breakFastMeals.push(meal);
    }
    for (const l of mealPlan.lunch) {
      const meal = this.mealService.getMealById(l.mealId);
      if (meal) this.lunchMeals.push(meal);
    }
    for (const s of mealPlan.snacks) {
      const meal = this.mealService.getMealById(s.mealId);
      if (meal) this.snacksMeals.push(meal);
    }
    for (const d of mealPlan.dinner) {
      const meal = this.mealService.getMealById(d.mealId);
      if (meal) this.dinnerMeals.push(meal);
    }
  }
}
