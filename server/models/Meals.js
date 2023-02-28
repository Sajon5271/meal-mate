const mongoose = require('../db');

const mealSchema = mongoose.Schema({
  mealName: {
    type: String,
    required: true,
  },
  mealCalorie: {
    type: Number,
    required: true,
  },
  mealPicture: {
    type: String,
    required: true,
    default: 'no-picture.jpg',
  },
  // Label is like : breakfast, lunch, snack, dinner, any
  mealLabel: {
    type: String,
    required: true,
    default: 'any',
  },
  servingMeasureInGm: {
    type: String,
  },
});

const mealModel = mongoose.model('Meal', mealSchema);

module.exports = { mealModel, mealSchema };
