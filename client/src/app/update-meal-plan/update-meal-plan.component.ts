import { Component } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { FetchDataService } from '../fetch-data.service';
import { Meal } from '../Meal.interface';
import { MealPlan } from '../MealPlan.interface';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-update-meal-plan',
  templateUrl: './update-meal-plan.component.html',
  styleUrls: ['./update-meal-plan.component.css'],
})
export class UpdateMealPlanComponent {
  imageBase = 'http://localhost:3000/images/meals/';
  calorieNeeded = 0;
  selected = 'saturday';
  weekdays = [
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];
  currentMealPlan: {
    breakfast: {
      meal: Meal;
      quantity: number;
    }[];
    lunch: {
      meal: Meal;
      quantity: number;
    }[];
    snacks: {
      meal: Meal;
      quantity: number;
    }[];
    dinner: {
      meal: Meal;
      quantity: number;
    }[];
  } = {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  };
  userMealPlan;
  constructor(
    private fetchData: FetchDataService,
    private authService: AuthenticateService,
    private mealService: MealsService
  ) {
    this.userMealPlan = mealService.getUserMealPlan();
  }
  ngOnInit() {
    
    this.calorieNeeded =
      this.fetchData.getLoggedInUser().userData.calculatedDailyCalorie || 0;
  }

  get today() {
    return this.weekdays[(new Date().getDay() + 1) % 7];
  }
  changeSelected(selection: string) {
    type objkeys = keyof typeof this.userMealPlan;
    this.selected = selection;
    const [breakFastMeals, lunchMeals, snacksMeals, dinnerMeals] =
      this.mealService.getWithActualMeals(
        this.userMealPlan[selection as objkeys]
      );
    this.currentMealPlan.breakfast = breakFastMeals;
    this.currentMealPlan.lunch = lunchMeals;
    this.currentMealPlan.snacks = snacksMeals;
    this.currentMealPlan.dinner = dinnerMeals;
  }

  get currentMealPlanArray() {
    const temp = [];
    for (const [daytime, meals] of Object.entries(this.currentMealPlan)) {
      temp.push({ daytime, meals });
    }
    return temp;
  }

  calculateCalorie(
    meals: {
      meal: Meal;
      quantity: number;
    }[]
  ) {
    let totalCalorie = 0;
    meals.forEach((el) => {
      totalCalorie += el.meal.mealCalorie * el.quantity;
    });
    return totalCalorie;
  }
}