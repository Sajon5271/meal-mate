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
      recordDate: { $gt: Date.now() - 7 * 24 * 60 * 60 * 1000 },
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
    await UserHistory.create({ mealsData: todaysData });
    res.status(201).send({ msg: 'Stored' });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {};
