import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyMeals } from '../interfaces/DailyMeals.interface';
import { Meal } from '../interfaces/Meal.interface';
import { MealPlan } from '../interfaces/MealPlan.interface';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  private baseUrl = 'http://localhost:3000/meal';

  constructor(private http: HttpClient) {}
  getAllMeal(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.baseUrl + '/all');
  }
  getMealById(id: string): Meal | null {
    const allMeals: Meal[] = this.getMealsfromStorage();
    for (const meal of allMeals) {
      if (meal._id === id) return meal;
    }
    return null;
  }

  getMealsfromStorage(): Meal[] {
    return JSON.parse(localStorage.getItem('Meals') || '[]');
  }

  getUserMealPlan(): {
    saturday: MealPlan;
    sunday: MealPlan;
    monday: MealPlan;
    tuesday: MealPlan;
    wednesday: MealPlan;
    thursday: MealPlan;
    friday: MealPlan;
  } {
    return JSON.parse(localStorage.getItem('currentUserData') || '""').mealPlan;
  }

  getAnonymousUserMealPlan(): {
    saturday: MealPlan;
    sunday: MealPlan;
    monday: MealPlan;
    tuesday: MealPlan;
    wednesday: MealPlan;
    thursday: MealPlan;
    friday: MealPlan;
  } {
    return JSON.parse(localStorage.getItem('anonymousUserData') || '""')
      .mealPlan;
  }

  getWithActualMeals(mealPlan: MealPlan): DailyMeals {
    const thisDayMeal: DailyMeals = {
      breakfast: [],
      lunch: [],
      snacks: [],
      dinner: [],
    };
    for (const b of mealPlan.breakfast) {
      const meal = this.getMealById(b.mealId);
      if (meal) thisDayMeal.breakfast.push({ meal, quantity: b.quantity });
    }
    for (const l of mealPlan.lunch) {
      const meal = this.getMealById(l.mealId);
      if (meal) thisDayMeal.lunch.push({ meal, quantity: l.quantity });
    }
    for (const s of mealPlan.snacks) {
      const meal = this.getMealById(s.mealId);
      if (meal) thisDayMeal.snacks.push({ meal, quantity: s.quantity });
    }
    for (const d of mealPlan.dinner) {
      const meal = this.getMealById(d.mealId);
      if (meal) thisDayMeal.dinner.push({ meal, quantity: d.quantity });
    }
    return thisDayMeal;
  }
}
