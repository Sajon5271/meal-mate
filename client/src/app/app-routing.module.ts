import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page-component/home-page-component.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { TodaysMealPlanComponent } from './todays-meal-plan/todays-meal-plan.component';
import { UserDataFormComponent } from './user-data-form/user-data-form.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignupPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'questions', component: UserDataFormComponent },
  { path: 'mealplan/today', component: TodaysMealPlanComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
