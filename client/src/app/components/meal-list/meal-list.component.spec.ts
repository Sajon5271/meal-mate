import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealListComponent } from './meal-list.component';

describe('MealListComponent', () => {
  let component: MealListComponent;
  let fixture: ComponentFixture<MealListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
