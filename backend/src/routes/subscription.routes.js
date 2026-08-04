const express = require('express');

const {
  getMySubscription
} = require('../controllers/subscription.controller');

const {
  protect
} = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get(
  '/me',
  getMySubscription
);

module.exports = router;