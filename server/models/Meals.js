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
  baseQuantity: {
    type: Number,
    required: true,
    default: 1,
  },
  measurementUnit: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Meal', mealSchema);
