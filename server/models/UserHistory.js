const mongoose = require('../db');

const historySchema = mongoose.Schema({
  recordDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  mealsData: {
    breakfast: [
      {
        mealId: String,
        quantity: Number,
      },
    ],
    lunch: [
      {
        mealId: String,
        quantity: Number,
      },
    ],
    snacks: [
      {
        mealId: String,
        quantity: Number,
      },
    ],
    dinner: [
      {
        mealId: String,
        quantity: Number,
      },
    ],
  },
});

module.exports = mongoose.model('UserHistory', historySchema);
