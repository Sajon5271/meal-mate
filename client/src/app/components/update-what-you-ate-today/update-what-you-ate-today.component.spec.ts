import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWhatYouAteTodayComponent } from './update-what-you-ate-today.component';

describe('UpdateWhatYouAteTodayComponent', () => {
  let component: UpdateWhatYouAteTodayComponent;
  let fixture: ComponentFixture<UpdateWhatYouAteTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWhatYouAteTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateWhatYouAteTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
