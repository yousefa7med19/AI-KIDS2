const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true
    },

    plan: {
      type: String,
      enum: [
        'basic',
        'premium',
        'family'
      ],
      required: true
    },

    billing: {
      type: String,
      enum: [
        'monthly',
        'yearly'
      ],
      required: true
    },

    status: {
      type: String,
      enum: [
        'active',
        'expired',
        'cancelled'
      ],
      default: 'active'
    },

    startDate: {
      type: Date,
      default: Date.now
    },

    expiryDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'Subscription',
  subscriptionSchema
);