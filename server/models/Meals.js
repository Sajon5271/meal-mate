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
  // Label is like : breakfast, lunch, snack, dinner
  mealLabel: {
    type: [String],
    required: true,
    default: ['breakfast', 'lunch', 'snack', 'dinner'],
  },
  baseQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
  measurementUnit: {
    type: String,
    required: true,
    default: 'gm',
  },
});

const mealModel = mongoose.model('Meal', mealSchema);

module.exports = { mealModel, mealSchema };
