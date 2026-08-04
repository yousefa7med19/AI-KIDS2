const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getUsersCount
} = require('../controllers/auth.controller');
const {
  protect,
  authorizeRoles
} = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get(
  '/admin/users-count',
  protect,
  authorizeRoles('admin'),
  getUsersCount
);

module.exports = router;