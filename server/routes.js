const router = require('express').Router();
const MealController = require('./controllers/Meals');

router.post('/meal/createOne', MealController.createAMeal);
router.post('/meal/createMany', MealController.createMeals);
router.post('/meal/byCalorie', MealController.getMealbyCalorie);

router.get('/meal/all', MealController.getAllMeals);
router.get('/meal/all/:mealTime', MealController.getSpecificTimeMeal);

router.get('/*', (req, res, next) => {
  res.status(404).send('Not Found');
});

module.exports = router;
