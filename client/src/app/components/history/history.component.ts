import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil, first } from 'rxjs';
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
export class HistoryComponent implements OnDestroy {
  imageBase = 'http://localhost:3000/images/meals/';
  History: MealHistory[] = [];
  HistoryWithMeals: DailyMeals[] = [];
  dateArray: Date[] = [];

  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    public fetchService: FetchDataService,
    private mealService: MealsService
  ) {
    fetchService
      .getHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.History = res;
        this.History.forEach((el) => {
          this.dateArray.push(el.recordDate);
          this.HistoryWithMeals.push(
            mealService.getWithActualMeals(el.mealsData)
          );
        });
      });
  }

  getCurrentMealPlanArray(mealHistory: DailyMeals) {
    const temp = [];
    for (const [daytime, meals] of Object.entries(mealHistory)) {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
