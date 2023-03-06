const mongoose = require('../db');

const notiSubsModel = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  subscriptionObject: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('NotificationSubscriber', notiSubsModel);
