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
  selector: 'app-update-meal-plan',
  templateUrl: './update-meal-plan.component.html',
  styleUrls: ['./update-meal-plan.component.css'],
})
export class UpdateMealPlanComponent {
  emptyMeal: Meal = {
    _id: '',
    mealCalorie: 0,
    mealName: '',
    mealPicture: '',
    baseQuantity: 1,
    measurementUnit: '',
  };
  imageBase = 'http://localhost:3000/images/meals/';
  calorieNeeded = 0;
  selected = 'saturday';
  weekdays = [
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];

  everyMealCalorie: number[] = [];
  wholeDayCalorie: number = 0;

  currentMealPlan: DailyMeals = {
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  };

  userMealPlan: FullMealPlan;
  fullMealDetails: WeeklyMeals = {
    saturday: this.currentMealPlan,
    sunday: this.currentMealPlan,
    monday: this.currentMealPlan,
    tuesday: this.currentMealPlan,
    wednesday: this.currentMealPlan,
    thursday: this.currentMealPlan,
    friday: this.currentMealPlan,
  };

  constructor(
    private fetchData: FetchDataService,
    private mealService: MealsService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.userMealPlan = mealService.getUserMealPlan();
    type objkeys = keyof typeof this.fullMealDetails;
    this.weekdays.forEach((el) => {
      this.fullMealDetails[el as objkeys] = this.mealService.getWithActualMeals(
        this.userMealPlan[el as objkeys]
      );
    });
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
        type objkeys = keyof typeof this.fullMealDetails;

        type daytimetype = keyof typeof this.currentMealPlan;
        this.fullMealDetails[this.selected as objkeys][
          daytime as daytimetype
        ].push({ meal: result.selectedMeal, quantity: result.quantity });
        this.userMealPlan[this.selected as objkeys][
          daytime as daytimetype
        ].push({ mealId: result.selectedMeal._id, quantity: result.quantity });
      }
    });
  }

  get today() {
    return this.weekdays[(new Date().getDay() + 1) % 7];
  }

  changeSelected(selection: string) {
    this.selected = selection;
    type objkeys = keyof typeof this.fullMealDetails;

    this.currentMealPlan = this.fullMealDetails[selection as objkeys];
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
    type objkeys = keyof typeof this.fullMealDetails;

    type daytimetype = keyof typeof this.currentMealPlan;
    this.currentMealPlan[daytime as daytimetype] = this.currentMealPlan[
      daytime as daytimetype
    ].filter((el) => el.meal._id !== id);
    this.fullMealDetails[this.selected as objkeys][daytime as daytimetype] =
      this.currentMealPlan[daytime as daytimetype];
    this.userMealPlan[this.selected as objkeys][daytime as daytimetype] =
      this.userMealPlan[this.selected as objkeys][
        daytime as daytimetype
      ].filter((el) => el.mealId !== id);
  }
  updateMeals() {
    if (this.exceeding()) {
      const dialogRef = this.dialog.open(ConfirmationDialogueComponent, {
        data: this.calorieNeeded - this.wholeDayCalorie > 0 ? 'less' : 'more',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;
        else {
          this.updateData();
        }
      });
    } else this.updateData();
  }

  updateData() {
    const currentUser = this.fetchData.getLoggedInUser();
    this.fetchData.setMealPlan(this.userMealPlan).subscribe(() => {
      currentUser.mealPlan = this.userMealPlan;
      this.fetchData.updateLoggedInUser(currentUser);
      location.reload();
    });
    // this.router.navigate(['generated-meal-plan']);
  }

  exceeding() {
    return Math.abs(this.calorieNeeded - this.wholeDayCalorie) > 100;
  }
}
