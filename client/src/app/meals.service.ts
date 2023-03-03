import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from './Meal.interface';

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
}
