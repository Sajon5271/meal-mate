import { Component } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { Meal } from '../../interfaces/Meal.interface';
import { MealPlan } from '../../interfaces/MealPlan.interface';
import { MealsService } from '../../services/meals.service';
import { DailyMeals } from 'src/app/interfaces/DailyMeals.interface';

@Component({
  selector: 'app-todays-meal-plan',
  templateUrl: './todays-meal-plan.component.html',
  styleUrls: ['./todays-meal-plan.component.css'],
})
export class TodaysMealPlanComponent {
  imageBase = 'http://localhost:3000/images/meals/';
  todaysMeals: DailyMeals = {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  };
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
    let mealPlan: MealPlan = JSON.parse(
      localStorage.getItem('todaysMealData') || '""'
    );
    if (!mealPlan) {
      const today = weekdays[(new Date().getDay() + 1) % 7];
      const userData = this.fetchData.getLoggedInUser().mealPlan || {};
      type objType = keyof typeof userData;
      mealPlan = userData[today as objType];
      localStorage.setItem(
        'todaysMealData',
        JSON.stringify(userData[today as objType])
      );
    }
    this.todaysMeals = this.mealService.getWithActualMeals(mealPlan);
    const hourOfDay = new Date().getHours();
    if (hourOfDay < 10) this.nextMeal = 'breakfast';
    else if (hourOfDay < 14) this.nextMeal = 'lunch';
    else if (hourOfDay < 18) this.nextMeal = 'snacks';
    else this.nextMeal = 'dinner';
  }

  get upcomingMeal() {
    switch (this.nextMeal) {
      case 'breakfast':
        return this.todaysMeals.breakfast;
      case 'lunch':
        return this.todaysMeals.lunch;
      case 'snacks':
        return this.todaysMeals.snacks;
      case 'dinner':
        return this.todaysMeals.dinner;
      default:
        return null;
    }
  }
}
