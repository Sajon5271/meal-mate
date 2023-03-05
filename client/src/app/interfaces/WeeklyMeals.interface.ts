import { DailyMeals } from './DailyMeals.interface';

export interface WeeklyMeals {
  saturday: DailyMeals;
  sunday: DailyMeals;
  monday: DailyMeals;
  tuesday: DailyMeals;
  wednesday: DailyMeals;
  thursday: DailyMeals;
  friday: DailyMeals;
}
