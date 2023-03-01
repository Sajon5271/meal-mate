import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysMealPlanComponent } from './todays-meal-plan.component';

describe('TodaysMealPlanComponent', () => {
  let component: TodaysMealPlanComponent;
  let fixture: ComponentFixture<TodaysMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysMealPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
