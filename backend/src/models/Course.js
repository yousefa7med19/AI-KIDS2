const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
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
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },

    category: {
      type: String,
      enum: [
        'ai-basics',
        'creativity',
        'logic',
        'coding',
        'quizzes'
      ],
      required: true
    },

    image: {
      type: String,
      default: ''
    },

    lessonsCount: {
      type: Number,
      default: 0,
      min: 0
    },

    xpReward: {
      type: Number,
      default: 100,
      min: 0
    },

    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);