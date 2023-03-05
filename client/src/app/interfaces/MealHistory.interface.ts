import { MealPlan } from './MealPlan.interface';

export interface MealHistory {
  recordDate: Date;
  mealsData: MealPlan;
}
