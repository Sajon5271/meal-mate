import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User.interface';
import { UserData } from './UserData.interface';

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

  private getAuthToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }
}
