import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { MealsService } from './services/meals.service';
import { Socket } from 'ngx-socket-io';
import { FetchDataService } from './services/fetch-data.service';
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';
import { MealPlan } from './interfaces/MealPlan.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Meal Mate';
  weekdays = [
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];

  constructor(
    private authClient: AuthenticateService,
    private mealsService: MealsService,
    private fetchData: FetchDataService,
    private ioMod: Socket,
    readonly swPush: SwPush,
    private router: Router
  ) {
    let data: MealPlan;
    if (authClient.isLoggedIn()) {
      data = JSON.parse(localStorage.getItem('todaysMealData') || '""');
      if (!data) {
        const today = this.weekdays[(new Date().getDay() + 1) % 7];
        const userData = fetchData.getLoggedInUser().mealPlan || {};
        type objType = keyof typeof userData;
        data = userData[today as objType];
        localStorage.setItem(
          'todaysMealData',
          JSON.stringify(userData[today as objType])
        );
      }
    }

    ioMod.on('saveTodaysData', () => {
      if (data) {
        fetchData.sendTodaysData(data).subscribe((res) => {
          console.log('sent', res);
        });
      }
    });
  }

  ngOnInit() {
    this.mealsService.getAllMeal().subscribe((meals) => {
      localStorage.setItem('Meals', JSON.stringify(meals));
    });
    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      // TODO: Do something in response to notification click.
      this.router.navigate(['mealplan/today']);
    });
  }
}
