import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickMealDialogueComponent } from './pick-meal-dialogue.component';

describe('PickMealDialogueComponent', () => {
  let component: PickMealDialogueComponent;
  let fixture: ComponentFixture<PickMealDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickMealDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickMealDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
