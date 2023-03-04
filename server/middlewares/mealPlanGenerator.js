const fitnessCalc = require('fitness-calculator');
const fs = require('fs');
const Meals = require('../models/Meals');

const eachMealCalorie = {};

const generateMealPlan = (req) => {
  let userData = {};
  if (!req.currentUser) userData = req.body;
  else userData = req.currentUser.userData;

  const calorieNeeded = calorieCalculate(userData);
  req.currentUser.userData.calculatedDailyCalorie = calorieNeeded;
  // const mealPlanData = fetchPresetData();
  // getAllMealCalorie();
  // const mealplan = generator(mealPlanData, calorieNeeded);
  console.log('here');
  const days = [
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];
  for (const day of days) {
    req.currentUser.mealPlan[day] = {
      breakfast: [
        { mealId: '63fdca71ad93589dcd03571d', quantity: 2 },
        { mealId: '63fdca71ad93589dcd03571e', quantity: 1 },
        { mealId: '63fdca71ad93589dcd03571f', quantity: 1 },
      ],
      lunch: [
        { mealId: '63fdca71ad93589dcd035720', quantity: 1 },
        { mealId: '63fdca71ad93589dcd035721', quantity: 1 },
      ],
      snacks: [{ mealId: '63fdca71ad93589dcd035746', quantity: 1 }],
      dinner: [{ mealId: '63fdca71ad93589dcd03574b', quantity: 1 }],
    };
  }

  // const distributedCalories = calorieDivide(calorieNeeded);
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

const fetchPresetData = async () => {
  try {
    const mealPlanData = await JSON.parse(
      await fs.promises.readFile('../data/mealPlan.json', 'utf-8')
    );
    return mealPlanData;
  } catch (error) {
    console.log(error);
  }
};

const generator = async (mealPlan, calorieNeeded) => {
  const eligibleMealPlan = [];
  for (const [bf, bfidx] of mealPlan.breakfasts.entries()) {
    const bfCal = addAllCalorieOfaPreset(bf);
    breakfastCalories.push(bfCal);
    for (const [l, lidx] of mealPlan.lunch.entries()) {
      const lCal = addAllCalorieOfaPreset(l);
      lunchCalories.push(lCal);
      for (const [s, sidx] of mealPlan.snacks.entries()) {
        const sCal = addAllCalorieOfaPreset(s);
        snacksCalories.push(sCal);
        for (const [d, didx] of mealPlan.dinner.entries()) {
          const dCal = addAllCalorieOfaPreset(d);
          dinnerCalories.push(dCal);
          const totalCal = bfCal + lCal + sCal + dCal;
          if (
            Math.abs(totalCal / bfCal - 0.27) > 0.3 ||
            Math.abs(totalCal / lCal - 0.37) > 0.3 ||
            Math.abs(totalCal / sCal - 0.12) > 0.3 ||
            Math.abs(totalCal / dCal - 0.27) > 0.3 ||
            Math.abs(calorieNeeded - totalCal) > 100
          )
            continue;
          else {
            eligibleMealPlan.push({
              diff: calorieNeeded - totalCal,
              bfidx,
              lidx,
              sidx,
              didx,
            });
          }
        }
      }
    }
  }
  let lowestDiff = 100;
  let lowestIdx = 0;
  eligibleMealPlan.forEach((el, idx) => {
    if (el.diff < lowestDiff) {
      lowestDiff = el.diff;
      lowestIdx = idx;
    }
  });

  return {
    breakfast: mealPlan.breakfasts[eligibleMealPlan[lowestIdx].bfidx],
    lunch: mealPlan.lunch[eligibleMealPlan[lowestIdx].lidx],
    snacks: mealPlan.snacks[eligibleMealPlan[lowestIdx].sidx],
    dinner: mealPlan.dinner[eligibleMealPlan[lowestIdx].didx],
  };
};

const getAllMealCalorie = async () => {
  try {
    const allMeals = await Meals.find({}).select('_id mealCalorie');
    allMeals.forEach((el) => {
      eachMealCalorie[el._id] = el.mealCalorie;
    });
  } catch (err) {
    console.log(err);
  }
};

const addAllCalorieOfaPreset = (data) => {
  let total = 0;
  data.forEach((el) => {
    total += eachMealCalorie[el.mealId] * el.quantity;
  });
  return total;
};

module.exports = generateMealPlan;
