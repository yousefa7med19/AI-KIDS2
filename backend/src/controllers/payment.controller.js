const Payment = require('../models/Payment');
const {
  createSubscriptionFromPayment
} = require('../services/subscription.service');

const PLANS = {
  basic: {
    monthly: 199,
    yearly: 1910
  },

  premium: {
    monthly: 299,
    yearly: 2870
  },

  family: {
    monthly: 499,
    yearly: 4790
  }
};

function getPlanAmount(plan, billing) {
  const selectedPlan = PLANS[plan];

  if (!selectedPlan) {
    return null;
  }

  return selectedPlan[billing] ?? null;
}

async function createPayment(req, res, next) {
  try {
    const {
      plan,
      billing,
      method,
      bankTransferReference,
      notes
    } = req.body;

    if (!['basic', 'premium', 'family'].includes(plan)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subscription plan'
      });
    }

    if (!['monthly', 'yearly'].includes(billing)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid billing period'
      });
    }

    if (!['fawry', 'bank-transfer'].includes(method)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method'
      });
    }

    const amount = getPlanAmount(plan, billing);

    if (amount === null) {
      return res.status(400).json({
        success: false,
        message: 'Unable to calculate plan price'
      });
    }

    const paymentData = {
      user: req.user._id,
      plan,
      billing,
      amount,
      currency: 'EGP',
      method,
      notes: notes?.trim() || ''
    };

    if (method === 'bank-transfer') {
      if (!bankTransferReference?.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Bank transfer reference is required'
        });
      }

      paymentData.bankTransferReference =
        bankTransferReference.trim();

      paymentData.status = 'pending-review';
    }

    if (method === 'fawry') {
      paymentData.status = 'pending';
    }

    const payment = await Payment.create(paymentData);

    return res.status(201).json({
      success: true,
      message:
        method === 'bank-transfer'
          ? 'Bank transfer submitted for review'
          : 'Fawry payment request created',
      payment
    });
  } catch (error) {
    next(error);
  }
}

async function getMyPayments(req, res, next) {
  try {
    const payments = await Payment.find({
      user: req.user._id
    }).sort({
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    next(error);
  }
}
async function approvePayment(req, res, next) {
  try {
    const payment = await Payment.findById(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Payment is already approved'
      });
    }

    payment.status = 'paid';
    payment.paidAt = new Date();
    payment.reviewedAt = new Date();

    await payment.save();

    const subscription =
      await createSubscriptionFromPayment(payment);

    return res.status(200).json({
      success: true,
      message:
        'Payment approved and subscription activated',
      payment,
      subscription
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createPayment,
  getMyPayments,
  approvePayment
};