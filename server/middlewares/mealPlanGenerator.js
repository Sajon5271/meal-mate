const fitnessCalc = require('fitness-calculator');

const generateMealPlan = (req, res, next) => {
  let userData = {};
  if (!req.currentUser) userData = req.body;
  else userData = req.currentUser.userData;
  req.body = generator(userData);
  next();
};
const generator = (userData) => {
  const { currentWeight, currentHeight, sex, age, activityLevel, weightGoal } =
    userData;

  const calculatedDailyCalorie = fitnessCalc.calorieNeeds(
    sex,
    age,
    currentHeight,
    currentWeight,
    activityLevel
  )[weightGoal];
  //Here will be the algorithm
  // return generatedPlan
};

module.exports = generateMealPlan;
