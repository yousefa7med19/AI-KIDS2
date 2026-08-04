const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: [
        'AI Basics',
        'Creativity',
        'Logic & Thinking',
        'Coding',
        'Quizzes'
      ],
      required: true
    },

    ageGroup: {
      type: [Number],
      required: true,
      validate: {
        validator(ages) {
          return ages.every((age) => age >= 7 && age <= 10);
        },
        message: 'Age group must contain ages from 7 to 10'
      }
    },

    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy'
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    image: {
      type: String,
      default: ''
    },

    xpReward: {
      type: Number,
      default: 30,
      min: 0
    },

    coinReward: {
      type: Number,
      default: 10,
      min: 0
    },

    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Game', gameSchema);