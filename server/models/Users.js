const mongoose = require('../db');
const { mealSchema } = require('./Meals');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: string,
    },
    email: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
    },
    picturePath: {
      type: String,
      required: true,
      default: 'profile.jpg',
    },
    currentWeight: {
      type: Number,
      required: true,
    },
    currentHeight: {
      type: Number,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    activityLevel: {
      type: String,
      required: true,
      default: 'sedentary',
    },
    weightGoal: {
      type: String,
      required: true,
      default: 'mildWeightLoss',
    },
    mealPlan: {
      type: {
        saturday: {
          breakfast: [mealSchema],
          lunch: [mealSchema],
          snacks: [mealSchema],
          dinner: [mealSchema],
        },
        sunday: {
          breakfast: [mealSchema],
          lunch: [mealSchema],
          snacks: [mealSchema],
          dinner: [mealSchema],
        },
        monday: {
          breakfast: [mealSchema],
          lunch: [mealSchema],
          snacks: [mealSchema],
          dinner: [mealSchema],
        },
        tuesday: {
          breakfast: [mealSchema],
          lunch: [mealSchema],
          snacks: [mealSchema],
          dinner: [mealSchema],
        },
        wednesday: {
          breakfast: [mealSchema],
          lunch: [mealSchema],
          snacks: [mealSchema],
          dinner: [mealSchema],
        },
        thursday: {
          breakfast: [mealSchema],
          lunch: [mealSchema],
          snacks: [mealSchema],
          dinner: [mealSchema],
        },
        friday: {
          breakfast: [mealSchema],
          lunch: [mealSchema],
          snacks: [mealSchema],
          dinner: [mealSchema],
        },
      },
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
