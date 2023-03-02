const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MealUtil = require('./Meals');
const generateMealPlan = require('../middlewares/mealPlanGenerator');
const { SECRET_KEY, PORT } = require('../configs');

const createNewUser = async (req, res, next) => {
  const user = req.body;
  try {
    if (!user) throw new Error('No user data passed');
    const checkUser = await Users.findOne({ email: user.email });
    if (checkUser) {
      return res
        .status(409)
        .send({ error: '409', message: 'User with email already exists' });
    }
    if (!user.oAuthUser) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    const newUser = await Users.create(user);
    const { _id } = newUser;
    const accessToken = jwt.sign({ _id }, SECRET_KEY, { expiresIn: '30 days' });
    res.status(201).send({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'Could not create user' });
    next();
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).send({ error: '404', message: 'User not found' });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '30 days',
      });
      res.status(200).send({ accessToken });
    } else {
      res.status(403).send({ error: '403', message: 'Wrong Password' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'Something went wrong' });
    next();
  }
};

const getUser = async (req, res, next) => {
  res.status(200).send(req.currentUser);
};

const setUserData = async (req, res, next) => {
  try {
    req.currentUser.userData = req.body;
    generateMealPlan(req);
    const cal = req.currentUser.userData.calculatedDailyCalorie;
    if (cal > 1000 || cal < 4000) {
      req.currentUser.dataAlreadyGiven = true;
    }
    await req.currentUser.save();
    res.status(201).send({ message: 'Updated data' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'Something went wrong' });
    next();
  }
};

const getMealPlans = async (req, res, next) => {
  const mealPlanObj = {};
  for (const [key, value] of Object.entries(req.currentUser.mealPlan)) {
    mealPlanObj[key] = MealUtil.getMultipleMealById(value);
  }
  res.status(200).send(mealPlanObj);
  next();
};
// const getTodaysMealPlans = async (req, res, next) => {
//   const weekdays = [
//     'saturday',
//     'sunday',
//     'monday',
//     'tuesday',
//     'wednesday',
//     'thursday',
//     'friday',
//   ];
//   const today = new Date();
//   res.status(200).send(req.currentUser.mealPlan);
//   next();
// };

const updateMealPlans = async (req, res, next) => {
  req.currentUser.mealPlan = req.body;
  await req.currentUser.save();
  res.status(201).send('Updated');
  next();
};

const updateUserInfo = async (req, res, next) => {
  req.currentUser = { ...req.currentUser, ...req.body };
  await req.currentUser.save();
  res.status(201).send('Updated');
  next();
};

const uploadPic = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const { profilePic } = req.files;
  if (!profilePic) return res.status(400).send('Invalid image');
  if (/^image/.test(profilePic.mimetype)) return res.sendStatus(400);

  profilePic.mv(`/images/user/${req.currentUser._id}-${profilePic.name}`);
  req.currentUser.picturePath = `http://localhost:${PORT}/images/user/${req.currentUser._id}-${profilePic.name}`;
  await req.currentUser.save();
  res.sendStatus(201);
};

module.exports = {
  createNewUser,
  login,
  getUser,
  setUserData,
  getMealPlans,
  updateMealPlans,
  updateUserInfo,
  uploadPic,
};
