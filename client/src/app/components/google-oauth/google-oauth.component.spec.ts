import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleOauthComponent } from './google-oauth.component';

describe('GoogleOauthComponent', () => {
  let component: GoogleOauthComponent;
  let fixture: ComponentFixture<GoogleOauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleOauthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
