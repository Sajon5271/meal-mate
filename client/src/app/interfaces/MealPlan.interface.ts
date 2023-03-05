export interface MealPlan {
  breakfast: { mealId: string; quantity: number }[];
  lunch: { mealId: string; quantity: number }[];
  snacks: { mealId: string; quantity: number }[];
  dinner: { mealId: string; quantity: number }[];
}
