import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedMealPlanComponent } from './generated-meal-plan.component';

describe('GeneratedMealPlanComponent', () => {
  let component: GeneratedMealPlanComponent;
  let fixture: ComponentFixture<GeneratedMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedMealPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
