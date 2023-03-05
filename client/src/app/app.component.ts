import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { MealsService } from './services/meals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Meal Mate';

  constructor(
    private authClient: AuthenticateService,
    private mealsService: MealsService
  ) {}

  ngOnInit() {
    this.mealsService.getAllMeal().subscribe((meals) => {
      localStorage.setItem('Meals', JSON.stringify(meals));
    });
  }
}
