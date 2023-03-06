import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { MealsService } from './services/meals.service';
import { Socket } from 'ngx-socket-io';
import { FetchDataService } from './services/fetch-data.service';
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Meal Mate';

  constructor(
    private authClient: AuthenticateService,
    private mealsService: MealsService,
    private fetchData: FetchDataService,
    private ioMod: Socket,
    readonly swPush: SwPush,
    private router: Router
  ) {
    ioMod.on('saveTodaysData', () => {
      if (authClient.isLoggedIn()) {
        const data = fetchData.getLoggedInUser().mealPlan?.sunday;
        if (data)
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
