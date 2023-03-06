const webpush = require('web-push');
const { VAPID_PUBLIC, VAPID_PRIVATE } = require('../configs');
const { getAllSubscribers } = require('../controllers/Notifications');
webpush.setVapidDetails(
  'mailto:ssirajis5271@gmail.com',
  VAPID_PUBLIC,
  VAPID_PRIVATE
);

exports.breakfastNotification = async () => {
  await notificationSender('Time for your breakfast!');
};
exports.lunchNotification = async () => {
  await notificationSender('Time for your lunch!');
};
exports.snacksNotification = async () => {
  await notificationSender('Time for your snacks!');
};
exports.dinnerNotification = async () => {
  await notificationSender('Time for your dinner!');
};

const notificationSender = async (msg) => {
  const allSubs = await getAllSubscribers();
  const notificationPayload = {
    notification: {
      title: msg,
      body: 'Check what you are supposed to eat',
      // icon: 'assets/main-page-logo-small-hat.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
        onActionClick: {
          default: {
            operation: 'navigateLastFocusedOrOpen',
            url: '/mealplan/today',
          },
        },
      },
      actions: [],
    },
  };
  Promise.all(
    allSubs.map((sub) =>
      webpush.sendNotification(
        sub.subscriptionObject,
        JSON.stringify(notificationPayload)
      )
    )
  )
    .then(() => console.log('Notification sent'))
    .catch((err) => console.log(err));
};
