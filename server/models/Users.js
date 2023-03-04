const { PORT } = require('../configs');
const mongoose = require('../db');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
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
        default: 0,
      },
    },
    mealPlan: {
      saturday: {
        breakfast: [{ mealId: String, quantity: Number }],
        lunch: [{ mealId: String, quantity: Number }],
        snacks: [{ mealId: String, quantity: Number }],
        dinner: [{ mealId: String, quantity: Number }],
      },
      sunday: {
        breakfast: [{ mealId: String, quantity: Number }],
        lunch: [{ mealId: String, quantity: Number }],
        snacks: [{ mealId: String, quantity: Number }],
        dinner: [{ mealId: String, quantity: Number }],
      },
      monday: {
        breakfast: [{ mealId: String, quantity: Number }],
        lunch: [{ mealId: String, quantity: Number }],
        snacks: [{ mealId: String, quantity: Number }],
        dinner: [{ mealId: String, quantity: Number }],
      },
      tuesday: {
        breakfast: [{ mealId: String, quantity: Number }],
        lunch: [{ mealId: String, quantity: Number }],
        snacks: [{ mealId: String, quantity: Number }],
        dinner: [{ mealId: String, quantity: Number }],
      },
      wednesday: {
        breakfast: [{ mealId: String, quantity: Number }],
        lunch: [{ mealId: String, quantity: Number }],
        snacks: [{ mealId: String, quantity: Number }],
        dinner: [{ mealId: String, quantity: Number }],
      },
      thursday: {
        breakfast: [{ mealId: String, quantity: Number }],
        lunch: [{ mealId: String, quantity: Number }],
        snacks: [{ mealId: String, quantity: Number }],
        dinner: [{ mealId: String, quantity: Number }],
      },
      friday: {
        breakfast: [{ mealId: String, quantity: Number }],
        lunch: [{ mealId: String, quantity: Number }],
        snacks: [{ mealId: String, quantity: Number }],
        dinner: [{ mealId: String, quantity: Number }],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
