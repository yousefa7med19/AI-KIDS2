const Subscription = require('../models/Subscription');

function calculateExpiryDate(billing, startDate = new Date()) {
  const expiryDate = new Date(startDate);

  if (billing === 'yearly') {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  } else {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  }

  return expiryDate;
}

async function createSubscriptionFromPayment(payment) {
  const startDate = new Date();
  const expiryDate = calculateExpiryDate(
    payment.billing,
    startDate
  );

  // إلغاء أي اشتراك نشط قديم لنفس المستخدم
  await Subscription.updateMany(
    {
      user: payment.user,
      status: 'active'
    },
    {
      status: 'cancelled'
    }
  );

  const subscription = await Subscription.create({
    user: payment.user,
    payment: payment._id,
    plan: payment.plan,
    billing: payment.billing,
    status: 'active',
    startDate,
    expiryDate
  });

  return subscription;
}

async function getActiveSubscription(userId) {
  const subscription = await Subscription.findOne({
    user: userId,
    status: 'active',
    expiryDate: {
      $gt: new Date()
    }
  })
    .populate('payment')
    .sort({
      createdAt: -1
    });

  return subscription;
}

module.exports = {
  calculateExpiryDate,
  createSubscriptionFromPayment,
  getActiveSubscription
};