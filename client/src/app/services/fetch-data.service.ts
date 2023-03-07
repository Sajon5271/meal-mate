import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyMeals } from '../interfaces/DailyMeals.interface';
import { Meal } from '../interfaces/Meal.interface';
import { MealHistory } from '../interfaces/MealHistory.interface';
import { MealPlan } from '../interfaces/MealPlan.interface';
import { User } from '../interfaces/User.interface';
import { UserData } from '../interfaces/UserData.interface';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }

  setData(data: UserData): Observable<string> {
    return this.http.post<string>(this.baseUrl + '/setData', data, {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }
  setMealPlan(mealPlan: {
    saturday: MealPlan;
    sunday: MealPlan;
    monday: MealPlan;
    tuesday: MealPlan;
    wednesday: MealPlan;
    thursday: MealPlan;
    friday: MealPlan;
  }) {
    return this.http.put(this.baseUrl + '/updateMealPlan', mealPlan, {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }

  generateAnonymousUserMealPlan(data: UserData): Observable<any> {
    return this.http.post(this.baseUrl + '/anonymousGenerate', data);
  }

  sendTodaysData(data: MealPlan): Observable<{ msg: string }> {
    return this.http.post<{ msg: string }>(
      this.baseUrl + '/saveTodaysData',
      data,
      {
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      }
    );
  }
  saveNotificationSub(data: any): Observable<{ msg: string }> {
    const userID = this.getLoggedInUser()._id;
    return this.http.post<{ msg: string }>(
      this.baseUrl + '/subscribeToNotification',
      { userID, subscriptionObject: data },
      {
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`,
        },
      }
    );
  }

  getHistory(): Observable<MealHistory[]> {
    return this.http.get<MealHistory[]>(this.baseUrl + '/user-history', {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }
  get7dayHistory(): Observable<MealHistory[]> {
    return this.http.get<MealHistory[]>(this.baseUrl + '/user-history/7-days', {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }

  uploadPicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePic', file);
    return this.http.post<any>(this.baseUrl + '/uploadProfilePic', formData, {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }
  updateUserInfo(data: { name: string }): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateUserInfo', data, {
      headers: {
        Authorization: `Bearer ${this.getAuthToken()}`,
      },
    });
  }
  private getAuthToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('currentUserData') || '""');
  }

  updateLoggedInUser(user: User) {
    localStorage.setItem('currentUserData', JSON.stringify(user));
  }

  updateUser(cb?: () => void) {
    this.getUser().subscribe((res) => {
      localStorage.setItem('currentUserData', JSON.stringify(res));
      if (cb) cb();
    });
  }

  getAnonymousUserData() {
    return JSON.parse(localStorage.getItem('anonymousUserData') || '""');
  }
  clearAnonymousUserData() {
    return localStorage.removeItem('anonymousUserData');
  }
}
