const router = require('express').Router();
const MealController = require('./controllers/Meals');
const UserController = require('./controllers/Users');
const authMiddleware = require('./middlewares/auth');
const generateMealPlan = require('./middlewares/mealPlanGenerator');

//Meals
router.post('/meal/createOne', MealController.createAMeal);
router.post('/meal/createMany', MealController.createMeals);
router.post('/meal/byCalorie', MealController.getMealbyCalorie);

router.get('/meal/all', MealController.getAllMeals);
router.get('/meal/all/:mealTime', MealController.getSpecificTimeMeal);

//Users
router.post('/register', UserController.createNewUser);
router.post('/login', UserController.login);
router.post('/setData', authMiddleware, UserController.setUserData);

router.get('/user', authMiddleware, UserController.getUser)

router.post('/uploadProfilePic', authMiddleware, UserController.uploadPic);

router.get('/getMealPlan', authMiddleware, UserController.getMealPlans);
// router.get(
//   '/generateMealPlan',
//   authMiddleware,
//   generateMealPlan,
//   UserController.updateMealPlans
// );
router.put('/updateMealPlan', authMiddleware, UserController.updateMealPlans);
router.put('/updateUserInfo', authMiddleware, UserController.updateUserInfo);
router.put('/updateUserData', authMiddleware, UserController.setUserData);

router.get('/*', (req, res, next) => {
  res.status(404).send('Not Found');
});

module.exports = router;
