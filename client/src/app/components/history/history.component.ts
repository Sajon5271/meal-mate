import { Component } from '@angular/core';
import { DailyMeals } from 'src/app/interfaces/DailyMeals.interface';
import { Meal } from 'src/app/interfaces/Meal.interface';
import { MealHistory } from 'src/app/interfaces/MealHistory.interface';
import { MealPlan } from 'src/app/interfaces/MealPlan.interface';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  imageBase = 'http://localhost:3000/images/meals/';
  History: MealHistory[] = [];
  HistoryWithMeals: DailyMeals[] = [];
  dateArray: Date[] = [];
  constructor(
    private fetchService: FetchDataService,
    private mealService: MealsService
  ) {
    fetchService.getHistory().subscribe((res) => {
      this.History = res;
      this.History.forEach((el) => {
        this.dateArray.push(el.recordDate);
        this.HistoryWithMeals.push(
          mealService.getWithActualMeals(el.mealsData)
        );
      });
    });
  }

  getCurrentMealPlanArray(mealplan: DailyMeals) {
    const temp = [];
    for (const [daytime, meals] of Object.entries(mealplan)) {
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

  // recommendedCalorieIntake(daytime: string) {
  //   if (daytime === 'breakfast') return this.calorieNeeded * 0.25;
  //   if (daytime === 'lunch') return this.calorieNeeded * 0.35;
  //   if (daytime === 'snacks') return this.calorieNeeded * 0.15;
  //   if (daytime === 'dinner') return this.calorieNeeded * 0.25;
  //   return '';
  // }
}
