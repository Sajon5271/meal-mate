import { MealPlan } from './MealPlan.interface';

export interface FullMealPlan {
  saturday: MealPlan;
  sunday: MealPlan;
  monday: MealPlan;
  tuesday: MealPlan;
  wednesday: MealPlan;
  thursday: MealPlan;
  friday: MealPlan;
}
