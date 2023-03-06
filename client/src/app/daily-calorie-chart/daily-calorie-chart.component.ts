import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-daily-calorie-chart',
  templateUrl: './daily-calorie-chart.component.html',
  styleUrls: ['./daily-calorie-chart.component.css'],
})
export class DailyCalorieChartComponent {
  chart: any;

  ngOnInit() {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          '7d ago',
          '6d ago',
          '5d ago',
          '4d ago',
          '3d ago',
          '2d ago',
          '1d ago',
          'Today',
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
