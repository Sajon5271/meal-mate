import { Component } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { FetchDataService } from '../../services/fetch-data.service';
import { Meal } from '../../interfaces/Meal.interface';
import { MealPlan } from '../../interfaces/MealPlan.interface';
import { MealsService } from '../../services/meals.service';
import { DailyMeals } from 'src/app/interfaces/DailyMeals.interface';

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
  currentMealPlan: DailyMeals = {
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
    this.currentMealPlan =
      this.mealService.getWithActualMeals(
        this.userMealPlan[selection as objkeys]
      );
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
  recommendedCalorieIntake(daytime: string) {
    if (daytime === 'breakfast') return this.calorieNeeded * 0.25;
    if (daytime === 'lunch') return this.calorieNeeded * 0.35;
    if (daytime === 'snacks') return this.calorieNeeded * 0.15;
    if (daytime === 'dinner') return this.calorieNeeded * 0.25;
    return '';
  }
}
