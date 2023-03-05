import { Meal } from './Meal.interface';

export interface DailyMeals {
  breakfast: { meal: Meal; quantity: number }[];
  lunch: { meal: Meal; quantity: number }[];
  snacks: { meal: Meal; quantity: number }[];
  dinner: { meal: Meal; quantity: number }[];
}
