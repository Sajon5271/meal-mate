import { MealPlan } from './MealPlan.interface';
import { UserData } from './UserData.interface';

export interface User {
  _id: string;
  name?: string;
  email: string;
  oAuthUser: boolean;
  picturePath: string;
  dataAlreadyGiven: boolean;
  userData: UserData;
  mealPlan?: {
    saturday: MealPlan;
    sunday: MealPlan;
    monday: MealPlan;
    tuesday: MealPlan;
    wednesday: MealPlan;
    thursday: MealPlan;
    friday: MealPlan;
  };
}
