const User = require('../models/User');
const Child = require('../models/Child');
const Course = require('../models/Course');
const Game = require('../models/Game');
const Payment = require('../models/Payment');
const Subscription = require('../models/Subscription');

async function getDashboard(req, res, next) {
  try {

    const [
      users,
      children,
      courses,
      games,
      pendingPayments,
      activeSubscriptions
    ] = await Promise.all([

      User.countDocuments(),

      Child.countDocuments(),

      Course.countDocuments(),

      Game.countDocuments(),

      Payment.countDocuments({
        status: {
          $in: [
            'pending',
            'pending-review'
          ]
        }
      }),

      Subscription.countDocuments({
        status: 'active'
      })

    ]);

    return res.status(200).json({

      success: true,

      stats: {

        users,

        children,

        courses,

        games,

        pendingPayments,

        activeSubscriptions

      }

    });

  } catch (error) {

    next(error);

  }
}

module.exports = {
  getDashboard
};