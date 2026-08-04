const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
      required: true
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },

    completedLessons: [
      {
        type: Number
      }
    ],

    completedQuizzes: [
      {
        type: Number
      }
    ],

    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    completed: {
      type: Boolean,
      default: false
    },

    lastOpenedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// يمنع إنشاء أكثر من سجل لنفس الطفل ونفس الكورس
progressSchema.index(
  {
    child: 1,
    course: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model(
  'Progress',
  progressSchema
);