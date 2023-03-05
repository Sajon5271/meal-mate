import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './material-ui/material-ui.module';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { UserDataFormComponent } from './components/user-data-form/user-data-form.component';
import { HomePageComponent } from './components/home-page-component/home-page-component.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TodaysMealPlanComponent } from './components/todays-meal-plan/todays-meal-plan.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { GeneratedMealPlanComponent } from './components/generated-meal-plan/generated-meal-plan.component';
import { UpdateMealPlanComponent } from './components/update-meal-plan/update-meal-plan.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { GoogleOauthComponent } from './components/google-oauth/google-oauth.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { PickMealDialogueComponent } from './components/pick-meal-dialogue/pick-meal-dialogue.component';
import { UpdateUserDataComponent } from './components/update-user-data/update-user-data.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HistoryComponent } from './components/history/history.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

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
    UpdateProfileComponent,
    MealListComponent,
    GeneratedMealPlanComponent,
    UpdateMealPlanComponent,
    HamburgerMenuComponent,
    GoogleOauthComponent,
    SpinnerComponent,
    PickMealDialogueComponent,
    UpdateUserDataComponent,
    HistoryComponent,
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
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
