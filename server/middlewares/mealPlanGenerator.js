const fitnessCalc = require('fitness-calculator');
const Meals = require('../models/Meals');

const generateMealPlan = (req) => {
  let userData = {};
  if (!req.currentUser) userData = req.body;
  else userData = req.currentUser.userData;

  const calorieNeeded = calorieCalculate(userData);
  req.currentUser.userData.calculatedDailyCalorie = calorieNeeded;
  const distributedCalories = calorieDivide(calorieNeeded);
};
const calorieCalculate = (userData) => {
  const { currentWeight, currentHeight, sex, age, activityLevel, weightGoal } =
    userData;

  const calculatedDailyCalorie = fitnessCalc.calorieNeeds(
    sex,
    age,
    currentHeight,
    currentWeight,
    activityLevel
  )[weightGoal];
  return calculatedDailyCalorie;
};

const calorieDivide = (totalCalorie) => {
  return {
    breakfast: totalCalorie * 0.25,
    lunch: totalCalorie * 0.35,
    snacks: totalCalorie * 0.15,
    dinner: totalCalorie * 0.25,
  };
};

module.exports = generateMealPlan;
