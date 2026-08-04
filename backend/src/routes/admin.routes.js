const express = require('express');

const {
  getDashboard
} = require('../controllers/admin.controller');

const {
  protect,
  authorizeRoles
} = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/dashboard', getDashboard);

module.exports = router;