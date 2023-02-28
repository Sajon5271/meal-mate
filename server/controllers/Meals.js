const { mealModel: Meals } = require('../models/Meals');

const createAMeal = async (req, res, next) => {
  const newMeal = req.body;
  try {
    if (newMeal) newMeal.mealLabel = newMeal.mealLabel.toLowerCase();
    else throw new Error('No data provided');
    await Meals.create(newMeal);
    res.status(201).send('Created a new meal');
  } catch (error) {
    console.log(error);
    next();
  }
};
const createMeals = async (req, res, next) => {
  const newMeals = req.body;
  try {
    await Meals.insertMany(newMeals);
    res.status(201).send('Created new meals');
  } catch (error) {
    console.log(error);
    next();
  }
};

const getAllMeals = async (req, res, next) => {
  try {
    const allMeals = await Meals.find({});
    res.status(200).send(allMeals);
  } catch (error) {
    console.log(error);
    next();
  }
};

const getSpecificTimeMeal = async (req, res, next) => {
  const mealTime = req.params.mealTime;
  try {
    const specificMeals = await Meals.find({
      mealLabel: mealTime.toLowerCase(),
    });
    res.status(200).send(specificMeals);
  } catch (error) {
    console.log(error);
    next();
  }
};

const getMealbyCalorie = async (req, res, next) => {
  const calorie = req.body.calorie;
  try {
    const matchedMeals = await Meals.find({
      mealCalorie: { $gt: calorie - 50, $lt: calorie + 50 },
    });
    res.status(200).send(matchedMeals);
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
  createAMeal,
  createMeals,
  getAllMeals,
  getSpecificTimeMeal,
  getMealbyCalorie,
};
