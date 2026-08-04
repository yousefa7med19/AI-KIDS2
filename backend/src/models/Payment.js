const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    plan: {
      type: String,
      enum: ['basic', 'premium', 'family'],
      required: true
    },

    billing: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    currency: {
      type: String,
      enum: ['EGP'],
      default: 'EGP'
    },

    method: {
      type: String,
      enum: ['fawry', 'bank-transfer'],
      required: true
    },

    status: {
      type: String,
      enum: [
        'pending',
        'pending-review',
        'paid',
        'failed',
        'cancelled',
        'expired'
      ],
      default: 'pending'
    },

    fawryReference: {
      type: String,
      default: null
    },

    bankTransferReference: {
      type: String,
      trim: true,
      default: null
    },

    receiptImage: {
      type: String,
      default: null
    },

    paidAt: {
      type: Date,
      default: null
    },

    reviewedAt: {
      type: Date,
      default: null
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

paymentSchema.index({
  user: 1,
  createdAt: -1
});

paymentSchema.index({
  status: 1,
  method: 1
});

module.exports = mongoose.model('Payment', paymentSchema);