const mongoose = require('mongoose');

const childSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true,
      min: 7,
      max: 10
    },

    avatar: {
      type: String,
      default: 'avatar-1'
    },

    xp: {
      type: Number,
      default: 0
    },

    coins: {
      type: Number,
      default: 0
    },
    level: {
  type: Number,
  default: 1,
  min: 1
},

    currentStreak: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Child', childSchema);