import { Component, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { DailyMeals } from 'src/app/interfaces/DailyMeals.interface';
import { Meal } from 'src/app/interfaces/Meal.interface';
import { MealHistory } from 'src/app/interfaces/MealHistory.interface';
import { MealPlan } from 'src/app/interfaces/MealPlan.interface';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-daily-calorie-chart',
  templateUrl: './daily-calorie-chart.component.html',
  styleUrls: ['./daily-calorie-chart.component.css'],
})
export class DailyCalorieChartComponent implements OnDestroy {
  calorieChart: any;
  progressChart: any;
  private destroy$: Subject<void> = new Subject<void>();
  UserHistory: MealHistory[] = [];
  constructor(
    private fetchData: FetchDataService,
    private mealService: MealsService
  ) {
    fetchData
      .get7dayHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.UserHistory = res;
        this.createChart();
      });
  }
  ngOnInit() {}
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

  calculateWholeDayCalorie(data: DailyMeals) {
    let total = 0;
    type objType = keyof typeof data;
    for (const portion in data) {
      total += this.calculateCalorie(data[portion as objType]);
    }
    return total;
  }

  createChart() {
    const labels = [
      '7d ago',
      '6d ago',
      '5d ago',
      '4d ago',
      '3d ago',
      '2d ago',
      '1d ago',
    ];
    const allMeals = this.UserHistory.map((el) => {
      return this.mealService.getWithActualMeals(el.mealsData);
    }).reverse();
    const allCalories: number[] = [];
    allMeals.forEach((el, idx) =>
      allCalories.push(
        (this.UserHistory[idx].calorieNeeded || 0) -
          this.calculateWholeDayCalorie(el)
      )
    );
    const colors: string[] = allCalories.map((el) =>
      Math.abs(el) < 100 ? '#6CC57C' : '#EB7070'
    );
    const achievePercent =
      (colors.reduce(
        (a, b, idx) => (colors[idx] === '#6CC57C' ? a + 1 : a),
        0
      ) /
        7) *
      100;
    const minY = Math.min(...allCalories);
    const maxY = Math.max(...allCalories);
    this.calorieChart = new Chart('calorieChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: labels,
        datasets: [
          {
            label: 'Max',
            data: [100, 100, 100, 100, 100, 100, 100],

            borderWidth: 1,
            borderColor: '#2c8b5c',
            type: 'line',
            pointStyle: false,
            // clip: { left: 2 },
            spanGaps: true,
          },
          {
            label: 'Calories',
            data: allCalories,
            backgroundColor: colors,
          },
          {
            label: 'Min',
            data: [-100, -100, -100, -100, -100, -100, -100],

            borderWidth: 1,
            borderColor: '#2c8b5c',
            type: 'line',
            pointStyle: false,
            // clip: { left: 2 },
            spanGaps: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          x: {},
          y: {
            title: {
              display: true,
              text: 'Calorie Difference',
            },
            min: (parseInt('' + minY / 100) - 1) * 100,
            max: (parseInt('' + maxY / 100) + 1) * 100,
            display: 'auto',
          },
        },
      },
    });
    this.progressChart = new Chart('progressChart', {
      type: 'doughnut',
      data: {
        labels: ['Achieved', 'Missed'],
        datasets: [
          {
            label: 'percent',
            data: [achievePercent, 100 - achievePercent],
            backgroundColor: ['#6CC57C', '#EB7070'],
            borderColor: ['#6CC57C', '#EB7070'],
            circumference: 180,
            rotation: -90,
          },
        ],
      },
      options: {
        aspectRatio: 2.25,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
          },
        },
      },
    });
  }

  get userName() {
    const usrName = this.fetchData.getLoggedInUser().name;
    return usrName ? `, ${usrName}` : '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
