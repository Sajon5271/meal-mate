import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateServiceService {
  baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(this.baseUrl + '/login', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  register(user: any): Observable<any> {
    return this.http.post(this.baseUrl + '/login', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
