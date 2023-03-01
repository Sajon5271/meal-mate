import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './material-ui/material-ui.module';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondaryButtonComponent } from './secondary-button/secondary-button.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserDataFormComponent } from './user-data-form/user-data-form.component';
import { HomePageComponent } from './home-page-component/home-page-component.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TodaysMealPlanComponent } from './todays-meal-plan/todays-meal-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    InputFieldComponent,
    SecondaryButtonComponent,
    SignupPageComponent,
    UserDataFormComponent,
    HomePageComponent,
    TodaysMealPlanComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MaterialUIModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
