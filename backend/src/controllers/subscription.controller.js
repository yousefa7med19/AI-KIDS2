const Subscription = require('../models/Subscription');

async function getMySubscription(req, res, next) {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active'
    })
      .populate('payment')
      .sort({
        createdAt: -1
      });

    return res.status(200).json({
      success: true,
      subscription
    });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMySubscription
};