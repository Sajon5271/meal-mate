const fitnessCalc = require('fitness-calculator');
const fs = require('fs');
const Meals = require('../models/Meals');

const eachMealCalorie = {};

const generateMealPlan = async (req) => {
  let userData = {};

  userData = req.currentUser.userData;

  const calorieNeeded = calorieCalculate(userData);
  req.currentUser.userData.calculatedDailyCalorie = calorieNeeded;
  const mealPlanData = await fetchPresetData();
  await getAllMealCalorie();
  console.time();
  const mealplan = await generator(mealPlanData, calorieNeeded);
  console.timeEnd();
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
    req.currentUser.mealPlan[day] = mealplan;
  }
  if (req.currentUser.email) await req.currentUser.save();
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
      await fs.promises.readFile(__dirname + '/../data/mealPlan.json', 'utf-8')
    );
    return mealPlanData;
  } catch (error) {
    console.log(error);
  }
};

const generator = async (mealPlan, calorieNeeded) => {
  let count1stCondition = 0;
  let count2ndCondition = 0;
  let count3rdCondition = 0;
  let count4thCondition = 0;
  let count5thCondition = 0;

  let ratio = 0;

  const breakfastCalories = [];
  const lunchCalories = [];
  const snacksCalories = [];
  const dinnerCalories = [];
  const eligibleMealPlan = [];
  for (const [bfidx, bf] of Object.entries(mealPlan.breakfasts)) {
    const bfCal = addAllCalorieOfaPreset(bf);
    breakfastCalories.push(bfCal);
    for (const [lidx, l] of Object.entries(mealPlan.lunch)) {
      const lCal = addAllCalorieOfaPreset(l);
      lunchCalories.push(lCal);
      for (const [sidx, s] of Object.entries(mealPlan.snacks)) {
        const sCal = addAllCalorieOfaPreset(s);
        snacksCalories.push(sCal);
        for (const [didx, d] of Object.entries(mealPlan.dinner)) {
          const dCal = addAllCalorieOfaPreset(d);
          dinnerCalories.push(dCal);
          const totalCal = bfCal + lCal + sCal + dCal;
          if (
            Math.abs(bfCal / totalCal - 0.27) > 0.03 ||
            Math.abs(lCal / totalCal - 0.37) > 0.03 ||
            Math.abs(sCal / totalCal - 0.12) > 0.03 ||
            Math.abs(dCal / totalCal - 0.27) > 0.03 ||
            Math.abs(calorieNeeded - totalCal) > 200
          ) {
            if (Math.abs(bfCal / totalCal - 0.27) > 0.03) count1stCondition++;
            if (Math.abs(lCal / totalCal - 0.37) > 0.03) count2ndCondition++;
            if (Math.abs(sCal / totalCal - 0.12) > 0.03) count3rdCondition++;
            if (Math.abs(dCal / totalCal - 0.27) > 0.03) count4thCondition++;
            if (Math.abs(calorieNeeded - totalCal) > 200) count5thCondition++;
            ratio++;
            continue;
          } else {
            console.log(calorieNeeded - totalCal);
            eligibleMealPlan.push({
              diff: Math.abs(calorieNeeded - totalCal),
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
  console.log(
    count1stCondition,
    count2ndCondition,
    count3rdCondition,
    count4thCondition,
    count5thCondition,
    ratio
  );
  eligibleMealPlan.forEach((el, idx) => {
    if (el.diff < lowestDiff) {
      lowestDiff = el.diff;
      lowestIdx = idx;
    }
  });
  console.log(eligibleMealPlan);

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
