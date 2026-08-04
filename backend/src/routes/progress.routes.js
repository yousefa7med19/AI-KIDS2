const express = require('express');

const {
  getProgress,
  updateProgress
} = require('../controllers/progress.controller');

const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get(
  '/:childId/:courseId',
  getProgress
);

router.put(
  '/:childId/:courseId',
  updateProgress
);

module.exports = router;