import { MealPlan } from './MealPlan.interface';

export interface MealHistory {
  recordDate: Date;
  userID?: string;
  calorieNeeded?: number;
  mealsData: MealPlan;
}
