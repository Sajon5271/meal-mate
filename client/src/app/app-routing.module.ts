import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GeneratedMealPlanComponent } from './components/generated-meal-plan/generated-meal-plan.component';
import { GoogleOauthComponent } from './components/google-oauth/google-oauth.component';
import { HistoryComponent } from './components/history/history.component';
import { HomePageComponent } from './components/home-page-component/home-page-component.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { TodaysMealPlanComponent } from './components/todays-meal-plan/todays-meal-plan.component';
import { UpdateMealPlanComponent } from './components/update-meal-plan/update-meal-plan.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UpdateUserDataComponent } from './components/update-user-data/update-user-data.component';
import { UserDataFormComponent } from './components/user-data-form/user-data-form.component';
import { DailyCalorieChartComponent } from './components/daily-calorie-chart/daily-calorie-chart.component';
import { UpdateWhatYouAteTodayComponent } from './components/update-what-you-ate-today/update-what-you-ate-today.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignupPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'questions', component: UserDataFormComponent },
  { path: 'redirect_google', component: GoogleOauthComponent },
  {
    path: 'generated-meal-plan',
    component: GeneratedMealPlanComponent,
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-mealplan',
    component: UpdateMealPlanComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DailyCalorieChartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mealplan/today/update',
    component: UpdateWhatYouAteTodayComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-user-data',
    component: UpdateUserDataComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mealplan/today',
    component: TodaysMealPlanComponent,
    canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
