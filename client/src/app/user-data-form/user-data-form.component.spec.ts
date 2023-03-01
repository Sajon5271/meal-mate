import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataFormComponent } from './user-data-form.component';

describe('UserDataFormComponent', () => {
  let component: UserDataFormComponent;
  let fixture: ComponentFixture<UserDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
