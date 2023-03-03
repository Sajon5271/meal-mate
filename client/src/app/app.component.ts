import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { FetchDataService } from './fetch-data.service';
import { MealsService } from './meals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Meal Mate';

  constructor(
    private authClient: AuthenticateService,
    private fetchData: FetchDataService,
    private mealsService: MealsService
  ) {}

  ngOnInit() {
    this.mealsService.getAllMeal().subscribe((meals) => {
      localStorage.setItem('Meals', JSON.stringify(meals));
    });
  }
}
