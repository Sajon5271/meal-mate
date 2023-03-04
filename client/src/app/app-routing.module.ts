import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GeneratedMealPlanComponent } from './generated-meal-plan/generated-meal-plan.component';
import { HomePageComponent } from './home-page-component/home-page-component.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { TodaysMealPlanComponent } from './todays-meal-plan/todays-meal-plan.component';
import { UpdateMealPlanComponent } from './update-meal-plan/update-meal-plan.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserDataFormComponent } from './user-data-form/user-data-form.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignupPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'questions', component: UserDataFormComponent },
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
