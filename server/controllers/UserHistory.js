const UserHistory = require('../models/UserHistory');

const getAllHistory = async (req, res, next) => {
  try {
    const allHistory = await UserHistory.find({});
    res.status(200).send(allHistory);
  } catch (err) {
    console.log(err);
    next();
  }
};
const getLastSevenDaysHistory = async (req, res, next) => {
  try {
    const allHistory = await UserHistory.find({
      recordDate: { $gt: new Date().setDate(new Date().getDate() - 7) },
    });
    res.status(200).send(allHistory);
  } catch (err) {
    console.log(err);
    next();
  }
};

const saveTodaysHistory = async (req, res, next) => {
  try {
    const todaysData = req.body;
    const todaysSavedData = await UserHistory.findOne({
      recordDate: { $gte: new Date().toDateString() },
    });
    if (!todaysSavedData) await UserHistory.create({ mealsData: todaysData });
    else {
      todaysSavedData.mealsData = todaysData;
      await todaysSavedData.save();
    }
    res.status(201).send({ msg: 'Stored' });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
  getAllHistory,
  getLastSevenDaysHistory,
  saveTodaysHistory,
};
