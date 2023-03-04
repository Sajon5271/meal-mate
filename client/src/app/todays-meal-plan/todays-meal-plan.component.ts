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
  breakFastMeals: { meal: Meal; quantity: number }[] = [];
  lunchMeals: { meal: Meal; quantity: number }[] = [];
  snacksMeals: { meal: Meal; quantity: number }[] = [];
  dinnerMeals: { meal: Meal; quantity: number }[] = [];
  nextMeal: string = '';

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
    const [breakFastMeals, lunchMeals, snacksMeals, dinnerMeals] =
      this.mealService.getWithActualMeals(mealPlan);
    this.breakFastMeals = breakFastMeals;
    this.lunchMeals = lunchMeals;
    this.snacksMeals = snacksMeals;
    this.dinnerMeals = dinnerMeals;
    const hourOfDay = new Date().getHours();
    if (hourOfDay < 10) this.nextMeal = 'breakfast';
    else if (hourOfDay < 14) this.nextMeal = 'lunch';
    else if (hourOfDay < 18) this.nextMeal = 'snacks';
    else this.nextMeal = 'dinner';
  }

  get upcomingMeal() {
    switch (this.nextMeal) {
      case 'breakfast':
        return this.breakFastMeals;
      case 'lunch':
        return this.lunchMeals;
      case 'snacks':
        return this.snacksMeals;
      case 'dinner':
        return this.dinnerMeals;
      default:
        return null;
    }
  }
}
