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
        default: 2000,
      },
    },
    mealPlan: {
      saturday: {
        breakfast: [String],
        lunch: [String],
        snacks: [String],
        dinner: [String],
      },
      sunday: {
        breakfast: [String],
        lunch: [String],
        snacks: [String],
        dinner: [String],
      },
      monday: {
        breakfast: [String],
        lunch: [String],
        snacks: [String],
        dinner: [String],
      },
      tuesday: {
        breakfast: [String],
        lunch: [String],
        snacks: [String],
        dinner: [String],
      },
      wednesday: {
        breakfast: [String],
        lunch: [String],
        snacks: [String],
        dinner: [String],
      },
      thursday: {
        breakfast: [String],
        lunch: [String],
        snacks: [String],
        dinner: [String],
      },
      friday: {
        breakfast: [String],
        lunch: [String],
        snacks: [String],
        dinner: [String],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
