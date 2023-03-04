import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMealPlanComponent } from './update-meal-plan.component';

describe('UpdateMealPlanComponent', () => {
  let component: UpdateMealPlanComponent;
  let fixture: ComponentFixture<UpdateMealPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMealPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMealPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
