import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCalorieChartComponent } from './daily-calorie-chart.component';

describe('DailyCalorieChartComponent', () => {
  let component: DailyCalorieChartComponent;
  let fixture: ComponentFixture<DailyCalorieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyCalorieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyCalorieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
