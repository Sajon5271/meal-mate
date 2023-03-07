const schedule = require('node-schedule');
const NotificationJobs = require('./notificationSender');

const breakfastScheduleRule = new schedule.RecurrenceRule();
const lunchScheduleRule = new schedule.RecurrenceRule();
const snacksScheduleRule = new schedule.RecurrenceRule();
const dinnerScheduleRule = new schedule.RecurrenceRule();
breakfastScheduleRule.hour = 7;
breakfastScheduleRule.minute = 30;
breakfastScheduleRule.tz = 'Asia/Dhaka';
lunchScheduleRule.hour = 13;
lunchScheduleRule.minute = 00;
lunchScheduleRule.tz = 'Asia/Dhaka';
snacksScheduleRule.hour = 17;
snacksScheduleRule.minute = 00;
snacksScheduleRule.tz = 'Asia/Dhaka';
dinnerScheduleRule.hour = 20;
dinnerScheduleRule.minute = 30;
dinnerScheduleRule.tz = 'Asia/Dhaka';

exports.scheduleAllTasks = () => {
  schedule.scheduleJob(
    breakfastScheduleRule,
    NotificationJobs.breakfastNotification
  );
  schedule.scheduleJob(lunchScheduleRule, NotificationJobs.lunchNotification);
  schedule.scheduleJob(snacksScheduleRule, NotificationJobs.snacksNotification);
  schedule.scheduleJob(dinnerScheduleRule, NotificationJobs.dinnerNotification);
};
