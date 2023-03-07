import { Component } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { FetchDataService } from '../../services/fetch-data.service';
import { Meal } from '../../interfaces/Meal.interface';
import { MealPlan } from '../../interfaces/MealPlan.interface';
import { MealsService } from '../../services/meals.service';
import { DailyMeals } from 'src/app/interfaces/DailyMeals.interface';
import { FullMealPlan } from 'src/app/interfaces/FullMealPlan.interface';
import { WeeklyMeals } from 'src/app/interfaces/WeeklyMeals.interface';
import { MatDialog } from '@angular/material/dialog';
import { PickMealDialogueComponent } from '../pick-meal-dialogue/pick-meal-dialogue.component';
import { Router } from '@angular/router';
import { ConfirmationDialogueComponent } from '../confirmation-dialogue/confirmation-dialogue.component';

@Component({
  selector: 'app-update-what-you-ate-today',
  templateUrl: './update-what-you-ate-today.component.html',
  styleUrls: ['./update-what-you-ate-today.component.css'],
})
export class UpdateWhatYouAteTodayComponent {
  imageBase = 'http://localhost:3000/images/meals/';
  calorieNeeded = 0;

  everyMealCalorie: number[] = [];
  wholeDayCalorie: number = 0;

  currentMealPlan: DailyMeals = {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  };
  currentMealPlanToSend: MealPlan = {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  };

  constructor(
    private fetchData: FetchDataService,
    private mealService: MealsService,
    public dialog: MatDialog,
    private router: Router
  ) {
    type objkeys = keyof typeof this.currentMealPlanToSend;
    this.currentMealPlanToSend = JSON.parse(
      localStorage.getItem('todaysMealData') || '""'
    );
    this.currentMealPlan = this.mealService.getWithActualMeals(
      this.currentMealPlanToSend
    );
  }

  ngOnInit() {
    this.calorieNeeded =
      this.fetchData.getLoggedInUser().userData.calculatedDailyCalorie || 0;
  }

  openDialog(daytime: string): void {
    type objKey = keyof typeof this.currentMealPlan;
    const dataToSend = this.currentMealPlan[daytime as objKey];
    const dialogRef = this.dialog.open(PickMealDialogueComponent, {
      data: dataToSend,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.selectedMeal) {
        type daytimetype = keyof typeof this.currentMealPlan;
        this.currentMealPlan[daytime as daytimetype].push({
          meal: result.selectedMeal,
          quantity: result.quantity,
        });
        this.currentMealPlanToSend[daytime as daytimetype].push({
          mealId: result.selectedMeal._id,
          quantity: result.quantity,
        });
      }
    });
  }

  get currentMealPlanArray() {
    const temp = [];
    for (const [daytime, meals] of Object.entries(this.currentMealPlan)) {
      temp.push({ daytime, meals });
    }
    return temp;
  }

  calculateCalorie(
    meals: {
      meal: Meal;
      quantity: number;
    }[]
  ) {
    let totalCalorie = 0;
    meals.forEach((el) => {
      totalCalorie += el.meal.mealCalorie * el.quantity;
    });
    return totalCalorie;
  }

  calculateWholeDayCalorie() {
    this.everyMealCalorie = [];
    type objType = keyof typeof this.currentMealPlan;
    for (const portion in this.currentMealPlan) {
      this.everyMealCalorie.push(
        this.calculateCalorie(this.currentMealPlan[portion as objType])
      );
    }
    this.wholeDayCalorie = this.everyMealCalorie.reduce((a, b) => a + b, 0);
    return this.wholeDayCalorie;
  }

  deleteMealFromPlan(daytime: string, id: string) {
    type daytimetype = keyof typeof this.currentMealPlan;
    this.currentMealPlan[daytime as daytimetype] = this.currentMealPlan[
      daytime as daytimetype
    ].filter((el) => el.meal._id !== id);
    this.currentMealPlanToSend[daytime as daytimetype] =
      this.currentMealPlanToSend[daytime as daytimetype].filter(
        (el) => el.mealId !== id
      );
  }
  updateMeals() {
    let save = false;
    if (this.exceeding()) {
      const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
        data: this.calorieNeeded - this.wholeDayCalorie > 0 ? 'less' : 'more',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;
        else save = true;
      });
    } else save = true;
    if (save) {
      localStorage.setItem(
        'todaysMealData',
        JSON.stringify(this.currentMealPlanToSend)
      );
      this.fetchData
        .sendTodaysData(this.currentMealPlanToSend)
        .subscribe(() => this.router.navigate(['mealplan/today']));
    }
  }
  exceeding() {
    return Math.abs(this.calorieNeeded - this.wholeDayCalorie) > 100;
  }
}
