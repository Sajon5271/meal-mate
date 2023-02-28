const { PORT } = require('../configs');
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
    oAuthUser: {
      type: Boolean,
      required: true,
      default: false,
    },
    picturePath: {
      type: String,
      required: true,
      default: `http://localhost:${PORT}/images/user/profile.jpg`,
    },
    dataAlreadyGiven: {
      type: Boolean,
      default: false,
    },
    userData: {
      currentWeight: {
        type: Number,
      },
      currentHeight: {
        type: Number,
      },
      sex: {
        type: String,
      },
      age: {
        type: Number,
      },
      activityLevel: {
        type: String,
        default: 'sedentary',
      },
      weightGoal: {
        type: String,
        default: 'mildWeightLoss',
      },
      calculatedDailyCalorie: {
        type: Number,
        default: 2000,
      },
    },
    mealPlan: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
