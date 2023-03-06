const NotificationSubscribers = require('../models/NotificationSubscribers');

const getAllSubscribers = async () => {
  try {
    const allSubs = await NotificationSubscribers.find({});
    return allSubs;
  } catch (error) {
    console.log(error);
  }
};

const setASubscriber = async (req, res, next) => {
  const newSub = req.body;
  try {
    console.log(req.body);
    const existingSub = await NotificationSubscribers.findOne({
      userID: newSub.userID,
    });
    if (existingSub) {
      existingSub.subscriptionObject = newSub.subscriptionObject;
      await existingSub.save();
    } else {
      await NotificationSubscribers.create(newSub);
    }
    res.status(201).send({ msg: 'Stored' });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
  getAllSubscribers,
  setASubscriber,
};
