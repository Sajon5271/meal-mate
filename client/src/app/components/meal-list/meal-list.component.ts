import { Component, Input } from '@angular/core';
import { Meal } from '../../interfaces/Meal.interface';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent {
  @Input() mealList: { meal: Meal; quantity: number }[] = [];
  imageBase = 'http://localhost:3000/images/meals/';
}
